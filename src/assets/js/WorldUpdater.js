import {GlowFilter} from "pixi-filters";
import LeaderBoard from './Leaderboard'
import {debounce} from './utils'

const LeadBoard = new LeaderBoard( {host: window.document.documentElement});
export default class WorldUpdater {
    constructor({ world, player }) {
        this.world = world;
        this.player = player;
    }

    update(message) {
        const { data } = message;
        const parsedData = JSON.parse(data);
        const { type } = parsedData;
        switch (type) {
            case "updates":
                const {bodies, bullets, doors, player} = JSON.parse(data);
                this.world.flush();
                bodies.forEach(body => {
                    this.world.addBody(body, false);
                });
                bullets.forEach(bullet => {
                    this.world.addBullet(bullet);
                });
                doors.forEach(door => {
                    this.world.addDoor(door);
                });
                if(player) {
                    this.world.addBody(player, true);
                    this.world.resetCenter(player);

                }
                // const playerBody = bodies.find(body => body.uuid === this.player.uuid);
                // if (playerBody) {
                //     console.log(playerBody.update);
                // }
                this.world.refresh();
                break;
            case "leaderboard":
                debounce(LeadBoard.update( parsedData.leaderboard ), 300)
                break;
            case "registered":
                this.player.uuid = parsedData.id;

        }
    }
}