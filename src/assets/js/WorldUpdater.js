import {GlowFilter} from "pixi-filters";

export default class WorldUpdater {
    constructor({ world, player }) {
        this.world = world;
        this.player = player;
    }

    update(message) {
        const { data } = message;
        const {registered, bodies, bullets, doors, id} = JSON.parse(data);
        if (!registered) {
            //TODO: analyze for efficiency and extension points
            this.world.flush();
            bodies.forEach(body => {
                const isPlayer = body.uuid === this.player.uuid;
                this.world.addBody(body, isPlayer);
                if (isPlayer) {
                    this.world.resetCenter(body);
                }
            });
            bullets.forEach(bullet => {
                this.world.addBullet(bullet);
            });
            doors.forEach(door => {
                this.world.addDoor(door);
            });
            // const playerBody = bodies.find(body => body.uuid === this.player.uuid);
            // if (playerBody) {
            //     console.log(playerBody.update);
            // }
            this.world.refresh();
        }
        else {
            this.player.uuid = id
        }
    }
}