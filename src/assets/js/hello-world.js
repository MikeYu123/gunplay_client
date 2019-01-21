import pixi from 'pixi'
import * as PIXI from 'pixi.js'
import World from './world'
// import BodyTexture from '../images/gun1.png'
import BodyTexture from '../images/player.png'
// import BulletTexture from '../images/noj.png'
import BulletTexture from '../images/bullet.png'
import DoorTexture from '../images/door_wood.png'
import WallTexture from '../images/brick_wall.png'
import Body from './body'
import Wall from './wall'
import Player from './player'
import ControlsRegistry from './controls-registry'
import NippleControlsRegistry from './NippleControlsRegistry'
import SocketControl from './socket-control'
import ControlsUpdater from './ControlsUpdater';
import WorldUpdater from './WorldUpdater';
import nipplejs from 'nipplejs';
// const defaultAddress = 'ws://localhost:8090';
const defaultName = 'huy';
import JsonProtocol from './JsonProtocol';
import BinaryProtocol from './BinaryProtocol';
// const apiAddress = 'http://localhost:8090';
const defaultAddress = 'ws://192.168.46.145:8090';
const apiAddress = 'http://192.168.46.145:8090';
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;


// const angleManager = {}

// if(device.mobile()) {
//     nipplejs.create({size: 150, maxNumberOfNipples: 2, multitouch: true, color: 'black'});
// }
export default class Game {
    constructor(name = defaultName, mobile = false, address = apiAddress + '/levels/0'){
        this.address = address;
        this.mobile = mobile;

        this.control = (world) => {
            if (this.mobile) {
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
                const controlsRegistry = new ControlsRegistry({centerX: world.centerX(), centerY: world.centerY()});
                window.onkeydown = controlsRegistry.onKeyDown;
                window.onkeyup = controlsRegistry.onKeyUp;
                window.onclick = controlsRegistry.onClick;
                window.onmousemove = controlsRegistry.onDocumentMouseMove;
                return controlsRegistry;
            }
        }
        this.fetchWorld = () => fetch(this.address).then(r => r.json());
        this.start = () => {
            const width = windowWidth - 20;
            const height = windowHeight - 20;
            const transparent = true;

            const ready = world => {
                this.fetchWorld().then(data => {
                    const {walls} = data;
                    walls.forEach(wall => world.addWall(wall));
                    const player = new Player({});
                    const controlsRegistry = this.control(world)
                    // const protocol = new JsonProtocol();
                    const protocol = new BinaryProtocol();
                    const worldUpdater = new WorldUpdater({player, world, protocol});
                    const socketControl = new SocketControl({address: defaultAddress, updater: worldUpdater, name, protocol });
                    const controlsUpdater = new ControlsUpdater({controlsRegistry, socketControl, timeout: 70});
                    socketControl.start().then(controlsUpdater.setup);

                    document.body.appendChild(world.app.view);
                });
            };

            new World(
                {
                    appSettings: {width, height, transparent},
                    textures: {
                        body: BodyTexture,
                        bullet: BulletTexture,
                        door: DoorTexture,
                        wall: WallTexture
                    },
                    ready
                });
        };
    }

}
