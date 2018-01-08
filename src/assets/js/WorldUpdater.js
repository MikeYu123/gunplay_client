
export default class WorldUpdater {
    constructor({ world, player }) {
        this.world = world;
        this.player = player;
    }

    update(message) {
        const { data } = message;
        const { bodies, bullets } = JSON.parse(data);
        // //TODO replace taking first to matching uuid
        bodies.forEach(body => {
            this.world.updateObject(body);
        });
        bullets.forEach(bullet => {
            this.world.updateObject(bullet);
        });
        const playerBody = bodies.find(body => body.uuid === player.uuid);
        this.world.resetCenter(playerBody);
        this.world.refresh();
        // const newBody = parsedData.bodies[0];
        // if (newBody) {
        //     body.update({x: newBody.x, y: newBody.y, angle: newBody.angle});
        //     const x = windowWidth / 2 - newBody.x;
        //     const y = windowHeight / 2 - newBody.y;
        //     Object.assign(app.stage.position, {x, y});
        //     app.render();
        // }
    }
}