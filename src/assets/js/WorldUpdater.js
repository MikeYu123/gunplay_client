
export default class WorldUpdater {
    constructor({ world, player }) {
        this.world = world;
        this.player = player;
    }

    update(message) {
        const { data } = message;
        const { bodies, bullets } = JSON.parse(data);
        //TODO: analyze for efficiency and extension points
        bodies.forEach(body => {
            if (!this.world.updateObject(body)) {
                this.world.addBody(body);
            }
        });
        bullets.forEach(bullet => {
            if (!this.world.updateObject(bullet)) {
                this.world.addBullet(bullet);
            }
        });
        const playerBody = bodies.find(body => body.uuid === this.player.uuid);
        this.world.resetCenter(playerBody);
        this.world.refresh();
    }
}