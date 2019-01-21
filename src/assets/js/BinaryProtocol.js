import uuid from 'uuid-js';

export default class BinaryProtocol {
    constructor() {
        const objectSize = 40;
        const uuidSize = 16;
        const intSize = 4;
        const doubleSize = 8;
        const decoder = new TextDecoder("utf-8");
        const encoder = new TextEncoder('utf-8')

        this.parseObject = (view, offset) => {
            const x = view.getFloat64(offset);
            const y = view.getFloat64(offset + doubleSize);
            const angle = view.getFloat64(offset + doubleSize * 2);
            const width = view.getFloat64(offset + doubleSize * 3);
            const height = view.getFloat64(offset + doubleSize * 4);
            return {x, y, angle, width, height}

        };

        this.parseLeaderboardEntry = (view, offset) => {
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

        this.parseRegistered = view => {
            const type = 'registered';
            const id = uuid.fromBytes(new Uint8Array(view.buffer.slice(1))).hex;
            return {type, id};
        };

        this.parseUpdates = view => {
            const type = 'updates';
            const bodiesSize = view.getInt32(1);
            const bodies = Array(bodiesSize).fill(1).map((_, i) =>
                this.parseObject(view, 5 + i * objectSize)
            )
            const bulletsSize = view.getInt32(5 + bodiesSize * objectSize);
            const bullets = Array(bulletsSize).fill(1).map((_, i) =>
                this.parseObject(view, 9 + (bodiesSize + i) * objectSize)
            )
            const doorsSize = view.getInt32(9 + (bodiesSize + bulletsSize) * objectSize);
            const doors = Array(doorsSize).fill(1).map((_, i) =>
                this.parseObject(view, 13 + (bodiesSize + bulletsSize + i) * objectSize)
            )
            const playerSize = view.getInt32(13 + (bodiesSize + bulletsSize + doorsSize) * objectSize);
            const player = Array(playerSize).fill(1).map((_, i) =>
                this.parseObject(view, 17 + (bodiesSize + doorsSize + bulletsSize + i) * objectSize)
            )[0];
            return {type, doors, bullets, player, bodies};
        };

        this.encodeRegister = message => {
            const nameBytes = message.name ? encoder.encode(message.name) : new Uint8Array();
            const buffer = new ArrayBuffer(5 + nameBytes.length);
            const view = new DataView(buffer);
            //Set type id
            view.setUint8(0, 1);
            view.setInt32(1, nameBytes.length);
            nameBytes.forEach((val, i) => view.setUint8(5 + i, val));
            return {data: buffer, isBinary: true};
        }

        this.encodeControls = message => {
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
            view.setUint8(1, controlByte);
            view.setFloat64(2, message.angle);
            return {data: buffer, isBinary: true};
        }

        this.parseLeaderboard = view => {
            const type = 'leaderboard';
            const length = view.getInt32(1);
            const {leaderboard} = Array(length).fill(1).reduce(({offset, leaderboard}) => {
                const {entry, newOffset} = this.parseLeaderboardEntry(view, offset)
                return {offset: newOffset, leaderboard: [...leaderboard, entry]}
            }, {offset: 5, leaderboard: []});
            return {type, leaderboard}
        }

        this.encode = (message) => {
            switch(message.type) {
                case 'controls':
                    return this.encodeControls(message)
                case 'register':
                    return this.encodeRegister(message)

            }
        };
        this.decode = (data) => {
            const view = new DataView(data);
            switch(view.getUint8()) {
                case 1:
                    return this.parseRegistered(view);
                case 2:
                    return this.parseUpdates(view);
                case 3:
                    return this.parseLeaderboard(view)
            }
        }
    }
}