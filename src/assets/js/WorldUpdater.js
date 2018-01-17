
export default class WorldUpdater {
    constructor({ world, player }) {
        this.world = world;
        this.player = player;
    }

    update(message) {
        const { data } = message;
        const { bodies, bullets } = JSON.parse(data);
        bodies.forEach(body => {
            this.world.updateObject(body);
        });
        bullets.forEach(bullet => {
            this.world.updateObject(bullet);
        });
        const playerBody = bodies.find(body => body.uuid === this.player.uuid);
        this.world.resetCenter(playerBody);
        this.world.refresh();
    }
}