import LeaderBoard from '../views/Leaderboard'
import {debounce} from '../utils/debounce'
import {leaderboardDefaults} from '../configs/application';

const LeadBoard = new LeaderBoard( {host: window.document.documentElement});
export default class WorldUpdater {
    constructor({ world, player }) {
        this.world = world;
        this.player = player;
        this.update = (message) =>
            {
                const {type} = message;
                switch (type) {
                    case 'updates':
                        const {bodies, bullets, doors, player} = message;
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
                        if (player) {
                            this.world.addBody(player, true);
                            this.world.resetCenter(player);

                        }
                        this.world.refresh();
                        break;
                    case 'leaderboard':
                        debounce(LeadBoard.update(message.leaderboard), leaderboardDefaults.debounce.timeout)
                        break;
                    case 'registered':
                        this.player.uuid = message.id;

                }
            }
    }

}