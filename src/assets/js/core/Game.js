import World from '../views/World'
import {textures, backend, controlsUpdaterSettings, defaultName, protocol, viewSettings} from '../configs/application';
import Player from './Player'
import ControlsRegistry from '../controls/KeyControlsRegistry'
import NippleControlsRegistry from '../controls/NippleControlsRegistry'
import SocketControl from './SocketControl'
import ControlsUpdater from './ControlsUpdater';
import WorldUpdater from './WorldUpdater';
import nipplejs from 'nipplejs';

export default class Game {
    constructor(name = defaultName, mobile = false, level = 0){
        //FIXME maybe move DOM interacting code somewhere
        this.control = (world) => {
            if (mobile) {
                const div1 = document.createElement('div');
                div1.id = 'directionManager';
                div1.className = 'nippleContainer';
                const div2 = document.createElement('div');
                div2.id = 'angleManager';
                div2.className = 'nippleContainer';
                const div3 = document.createElement('div');
                div3.id = 'angleAndShotManager';
                div3.className = 'nippleContainer';
                document.body.appendChild(div1)
                document.body.appendChild(div3)
                document.body.appendChild(div2)
                const directionManager = nipplejs.create({size: 150,color: 'black', zone: div1, mode: 'static', position: {top: '60%', left: '20%'}});
                const angleManager = nipplejs.create({size: 150, color: 'black', zone: div2, mode: 'static', position: {top: '50%', right: '20%'}});
                const angleAndShotManager = nipplejs.create({size: 150, color: 'black', zone: div3, mode: 'static', position: {bottom: '50%', right: '20%'}});
                return new NippleControlsRegistry({directionManager, angleManager, angleAndShotManager});
            }
            else {
                const controlsRegistry = new ControlsRegistry({centerX: world.centerX, centerY: world.centerY});
                window.onkeydown = controlsRegistry.onKeyDown;
                window.onkeyup = controlsRegistry.onKeyUp;
                window.onmousedown = controlsRegistry.onMouseDown;
                window.onmouseup = controlsRegistry.onMouseUp;
                window.onmousemove = controlsRegistry.onDocumentMouseMove;
                return controlsRegistry;
            }
        };

        this.fetchWorld = () => fetch(`${backend.api}/levels/${level}`).then(r => r.json());

        this.start = () => {
            this.fetchWorld().then(data => {
                const world = new World(
                    {
                        viewSettings,
                        textures
                    });

                    world.initLoader().then(() => {
                    const {walls} = data;
                    walls.forEach(wall => world.addWall(wall));

                    const player = new Player({});

                    const controlsRegistry = this.control(world);

                    const worldUpdater = new WorldUpdater({player, world, protocol});

                    const socketControl = new SocketControl({address: backend.ws, updater: worldUpdater, name, protocol });

                    const controlsUpdater = new ControlsUpdater({controlsRegistry, socketControl, timeout: controlsUpdaterSettings.timeout});

                    socketControl.start().then(controlsUpdater.setup);

                    window.onresize = () =>
                      world.resize({
                            width: window.innerWidth - 20,
                            height: window.innerHeight - 20});

                    document.body.appendChild(world.app.view);
                })
            });
        };
    }

}
