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

const defaultAddress = 'ws://localhost:8090';
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
  window.controlsRegistry = new ControlsRegistry(utils.uuid());
  const uuid = utils.uuid();
  const player = new Player({body: {uuid: uuid}});
  const width = windowWidth - 20;
  const height = windowHeight - 20;
  const transparent = true;

  const ready = () => {};

  const world = new World(
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

  window.uuid = utils.uuid();


  const app = new PIXI.Application({width, height, transparent});

// The application will create a canvas element for you that you
// can then insert into the DOM.
  document.body.appendChild(app.view);
  const loader = PIXI.loader;
  // loader.add('gun', BodyTexture);
  // loader.add('wall', WallTexture);

// load the texture we need
  loader.load((loader, resources) => {

    const body = new Body({id: 1, x: 200, y: 300, angle: 0, texture: resources.body.texture});
    const wall = new Wall({id: 2, x: 60, y: 60, width: 200, height: 50, texture: resources.wall.texture});

    const updater = message => {
      const { data } = message;
      const parsedData = JSON.parse(data);
      //TODO replace taking first to matching uuid
      const newBody = parsedData.bodies[0];
      if (newBody) {
        body.update({x: newBody.x, y: newBody.y, angle: newBody.angle});
        const x = windowWidth / 2 - newBody.x;
        const y = windowHeight / 2 - newBody.y;
        Object.assign(app.stage.position, {x, y});
        app.render();
      }
    };

    window.socketControl = new SocketControl({address: defaultAddress, uuid: window.uuid, updater: updater});

    const controlsUpdater = () => {
      const {up, down, left, right} = window.controlsRegistry.flush();
      const message = {
        angle: 0,
        up,
        down,
        left,
        right
      };
      const messageToSend = {
        type: 'controls',
        message
      };
      if (window.socketControl.started) {
          console.log(messageToSend);
        window.socketControl.push(messageToSend);
      }
      setTimeout(controlsUpdater, 100)
    };
      app.stage.addChild(body.sprite);
      app.stage.addChild(wall.sprite);
    window.socketControl.start();
    setTimeout(controlsUpdater, 1000);
  });
}
function onDocumentMouseMove({clientX, clientY}) {
    const dx = clientX - centerX;
    const dy = centerY - clientY;
    const l = Math.sqrt( dx * dx + dy * dy);
    const alp = dy > 0 ? Math.acos( dx / l ) : 2 * Math.PI - Math.acos( dx / l );
    console.log(dx);
    console.log(dy);
    window.controlsRegistry.setAngle(alp);
}
//
function onClick(){
  window.controlsRegistry.onClick();
}
//
function onKeyDown({ keyCode }){
  window.controlsRegistry.onKeyDown(keyCode)
}

function onKeyUp({ keyCode }){
  window.controlsRegistry.onKeyUp(keyCode)
}

window.onkeydown = onKeyDown;
window.onkeyup = onKeyUp;
window.onclick = onClick;
