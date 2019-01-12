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
import SocketControl from './socket-control'
import ControlsUpdater from './ControlsUpdater';
import WorldUpdater from './WorldUpdater';

const defaultAddress = 'ws://localhost:8090';
const apiAddress = 'http://localhost:8090';
// const defaultAddress = 'ws://192.168.46.145:8090';
// const apiAddress = 'http://192.168.46.145:8090';
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;


export default class Game {
    constructor(address = apiAddress + '/levels/0'){
        this.address = address

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
                    const controlsRegistry = new ControlsRegistry({centerX: world.centerX(), centerY: world.centerY()});
                    const worldUpdater = new WorldUpdater({player, world});
                    const socketControl = new SocketControl({address: defaultAddress, updater: worldUpdater });
                    const controlsUpdater = new ControlsUpdater({controlsRegistry, socketControl, timeout: 30});
                    socketControl.start().then(controlsUpdater.setup);

                    function onClick(){
                        controlsRegistry.onClick();
                    }
                    //
                    function onKeyDown({ keyCode }){
                        controlsRegistry.onKeyDown(keyCode)
                    }

                    function onKeyUp({ keyCode }){
                        controlsRegistry.onKeyUp(keyCode)
                    }

                    function onDocumentMouseMove(e){
                        controlsRegistry.onDocumentMouseMove(e)
                    }

                    window.onkeydown = onKeyDown;
                    window.onkeyup = onKeyUp;
                    window.onclick = onClick;
                    window.onmousemove = onDocumentMouseMove;
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
