import pixi from 'pixi'
import * as PIXI from 'pixi.js'
import World from './world'
import BodyTexture from '../images/gun1.png'
import BulletTexture from '../images/noj.png'
import DoorTexture from '../images/door_wood.png'
import WallTexture from '../images/brick_wall.png'
import Body from './body'
import Wall from './wall'
import Player from './player'
import ControlsRegistry from './controls-registry'
import * as utils from './utils'
import SocketControl from './socket-control'
import ControlsUpdater from './ControlsUpdater';
import WorldUpdater from './WorldUpdater';

const defaultAddress = 'ws://localhost:8090';
const apiAddress = 'http://localhost:8090';
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;


export default class HelloWorld {
    constructor (greetings) {
        this.greetings = greetings;
    }

    sayHello() {
        console.log(utils.uuid());
        init();
        return this.greetings;
    }
}
function init() {
    const width = windowWidth - 20;
    const height = windowHeight - 20;
    const transparent = true;

    const ready = world => {
        fetch(apiAddress + "/levels/0").then(response => response.json()).then(data => {
            const {walls, doors} = data;
            walls.forEach(wall => world.addWall(wall));
            doors.forEach(door => world.addDoor(door));
            const uuid = utils.uuid();
            const body = world.addBody({uuid, x: 0, y: 0, angle: 0});
            const player = new Player({body});
            world.addObject(body);
            console.log(world.width);
            const controlsRegistry = new ControlsRegistry({centerX: world.centerX(), centerY: world.centerY()});
            const worldUpdater = new WorldUpdater({player, world});
            const socketControl = new SocketControl({address: defaultAddress, uuid, updater: worldUpdater });
            socketControl.start();
            const controlsUpdater = new ControlsUpdater({controlsRegistry, socketControl, timeout: 30});
            //TODO rework to promise of socketControl.start
            setTimeout(() => controlsUpdater.setup(), 40);

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
}
//
// function onDocumentMouseMove({clientX, clientY}) {
//     const dx = clientX - centerX;
//     const dy = centerY - clientY;
//     const l = Math.sqrt( dx * dx + dy * dy);
//     const alp = dy > 0 ? Math.acos( dx / l ) : 2 * Math.PI - Math.acos( dx / l );
//     console.log(dx);
//     console.log(dy);
//     window.controlsRegistry.setAngle(alp);
// }
//
// function onClick(){
//   window.controlsRegistry.onClick();
// }
// //
// function onKeyDown({ keyCode }){
//   window.controlsRegistry.onKeyDown(keyCode)
// }
//
// function onKeyUp({ keyCode }){
//   window.controlsRegistry.onKeyUp(keyCode)
// }
//
// window.onkeydown = onKeyDown;
// window.onkeyup = onKeyUp;
// window.onclick = onClick;
