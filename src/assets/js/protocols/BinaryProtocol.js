import uuid from 'uuid-js';

export default class BinaryProtocol {
    constructor() {
        const objectSize = 40;
        const playerSize = 49;
        const dropSize = 17;
        const uuidSize = 16;
        const intSize = 4;
        const doubleSize = 8;
        const byteSize = 1;
        const decoder = new TextDecoder('utf-8');
        const encoder = new TextEncoder('utf-8');

        const parseWeapon = (weaponByte) => {
            switch(weaponByte) {
                case 0:
                    return 'unarmed';
                case 1:
                    return 'pistol';
                case 2:
                    return 'shotgun';
                case 3:
                    return 'riffle';
            }
        }

        const parseObject = (view, offset) => {
            const x = view.getFloat64(offset);
            const y = view.getFloat64(offset + doubleSize);
            const angle = view.getFloat64(offset + doubleSize * 2);
            const width = view.getFloat64(offset + doubleSize * 3);
            const height = view.getFloat64(offset + doubleSize * 4);
            return {x, y, angle, width, height};

        };

        const parseDrop = (view, offset) => {
            const x = view.getFloat64(offset);
            const y = view.getFloat64(offset + doubleSize);
            const weapon = parseWeapon(view.getUint8(offset + doubleSize * 4));
            return {x, y, weapon};

        };

        const parsePlayer = (view, offset) => {
            const x = view.getFloat64(offset);
            const y = view.getFloat64(offset + doubleSize);
            const angle = view.getFloat64(offset + doubleSize * 2);
            const width = view.getFloat64(offset + doubleSize * 3);
            const height = view.getFloat64(offset + doubleSize * 4);
            const weapon = parseWeapon(view.getUint8(offset + doubleSize * 5));
            const ammo = view.getFloat64(offset + doubleSize * 5 + byteSize);
            return {x, y, angle, width, height, weapon, ammo};

        };

        const parseLeaderboardEntry = (view, offset) => {
            const {buffer} = view;
            const id = uuid.fromBytes(new Uint8Array(buffer.slice(offset, offset + uuidSize))).hex;
            const nameSize = view.getInt32(offset + uuidSize);
            const name = decoder.decode(
                new Uint8Array(
                    buffer.slice(offset + uuidSize + intSize, offset + uuidSize + intSize + nameSize)));
            const kills = view.getInt32(offset + uuidSize + intSize + nameSize)
            const deaths = view.getInt32(offset + uuidSize + intSize * 2 + nameSize)
            const newOffset = offset + uuidSize + intSize * 3 + nameSize
            const entry = {id, name, kills, deaths}
            return {newOffset, entry}
        }

        const parseRegistered = view => {
            const type = 'registered';
            const id = uuid.fromBytes(new Uint8Array(view.buffer.slice(1))).hex;
            return {type, id};
        };

        const parseUpdates = view => {
            const type = 'updates';
            const bodiesLength = view.getInt32(byteSize);
            const bodies = Array(bodiesLength).fill(0).map((_, i) => {
                const offset = byteSize + intSize + i * playerSize;
                return parsePlayer(view, offset);
            });
            const offsetAfterBodies = byteSize + intSize + bodiesLength * playerSize;

            const bulletsLength = view.getInt32(offsetAfterBodies);
            const bullets = Array(bulletsLength).fill(0).map((_, i) => {
                const offset = offsetAfterBodies + intSize + i * objectSize;
                return parseObject(view, offset)
            });
            const offsetAfterBullets = offsetAfterBodies + intSize + bulletsLength * objectSize;

            const doorsLength = view.getInt32(offsetAfterBullets);
            const doors = Array(doorsLength).fill(0).map((_, i) => {
                const offset = offsetAfterBullets + intSize + i * objectSize;
                return parseObject(view, offset);
            });
            const offsetAfterDoors = offsetAfterBullets + intSize + doorsLength * objectSize;

            const dropsLength = view.getInt32(offsetAfterDoors);
            const drops = Array(dropsLength).fill(0).map((_, i) => {
                const offset = offsetAfterDoors + intSize + i * dropSize
                return parseDrop(view, offset)
            });
            //TODO it drops with exception
            const offsetAfterDrops = offsetAfterDoors + intSize + dropsLength * dropSize;

            const playerLength = view.getInt32(offsetAfterDrops);
            const player = Array(playerLength).fill(0).map((_, i) => {
                const offset = offsetAfterDrops + intSize + i * playerSize
                return parsePlayer(view, offset)
            })[0];
            return {type, doors, bullets, player, bodies, drops};
        };

        const encodeRegister = message => {
            const nameBytes = message.name ? encoder.encode(message.name) : new Uint8Array();
            const buffer = new ArrayBuffer(5 + nameBytes.length);
            const view = new DataView(buffer);
            //Set type id
            view.setUint8(0, 1);
            view.setInt32(byteSize, nameBytes.length);
            nameBytes.forEach((val, i) => view.setUint8(byteSize + intSize + i, val));
            return {data: buffer, isBinary: true};
        };

        const encodeControls = message => {
            const buffer = new ArrayBuffer(10);
            const view = new DataView(buffer);
            const controlByte =
                (message.up ? 1 : 0) +
                (message.down ? 2 : 0) +
                (message.right ? 4 : 0) +
                (message.left ? 8 : 0) +
                (message.click ? 16 : 0);
            //Set type id
            view.setUint8(0, 2);
            //Set controls
            view.setUint8(byteSize, controlByte);
            view.setFloat64(byteSize * 2, message.angle);
            return {data: buffer, isBinary: true};
        };

        const parseLeaderboard = view => {
            const type = 'leaderboard';
            const length = view.getInt32(byteSize);
            const {leaderboard} = Array(length).fill(0).reduce(({offset, leaderboard}) => {
                const {entry, newOffset} = parseLeaderboardEntry(view, offset)
                return {offset: newOffset, leaderboard: [...leaderboard, entry]}
            }, {offset: byteSize + intSize, leaderboard: []});
            return {type, leaderboard}
        }

        this.encode = (message) => {
            switch(message.type) {
                case 'controls':
                    return encodeControls(message)
                case 'register':
                    return encodeRegister(message)

            }
        };
        this.decode = (data) => {
            const view = new DataView(data);
            switch(view.getUint8()) {
                case 1:
                    return parseRegistered(view);
                case 2:
                    return parseUpdates(view);
                case 3:
                    return parseLeaderboard(view)
            }
        }
    }
}