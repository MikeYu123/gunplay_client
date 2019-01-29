import LeaderBoard from '../views/Leaderboard'
import Weapon from '../views/Weapon'
import {debounce} from '../utils/debounce'
import {leaderboardDefaults} from '../configs/application';

const leadBoard = new LeaderBoard( {host: window.document.documentElement});
const weapon = new Weapon( {host: window.document.documentElement});
export default class WorldUpdater {
    constructor({ world, player }) {
        this.world = world;
        this.player = player;
        this.update = (message) =>
            {
                const {type} = message;
                switch (type) {
                    case 'updates':
                        const {bodies, bullets, doors, player, drops} = message;
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
                        drops.forEach(drop => {
                            this.world.addDrop(drop);
                        });
                        if (player) {
                            this.world.addBody(player, true);
                            this.world.resetCenter(player);
                        }
                        weapon.update(player);
                        this.world.refresh();
                        break;
                    case 'leaderboard':
                        debounce(leadBoard.update(message.leaderboard), leaderboardDefaults.debounce.timeout);
                        break;
                    case 'registered':
                        this.player.uuid = message.id;

                }
            }
    }

}