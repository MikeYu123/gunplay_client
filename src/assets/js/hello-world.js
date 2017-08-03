import pixi from 'pixi'
import * as PIXI from 'pixi.js'
import Door from './door'
import Gun from '../images/gun1.png'
import Body from './body'
import ControlsRegistry from './controls-registry'
import { uuid } from './utils'
import SocketControl from './socket-control'

const defaultAddress = 'ws://localhost:8090';

export default class HelloWorld {
    constructor (greetings) {
        this.greetings = greetings;
    }

    sayHello() {
        init();
        return this.greetings;
    }
}
window.controlsRegistry = new ControlsRegistry(uuid());
// var socket, socket_control, socket_update;
//
// var renderer;
// var stage;
// var body_map = new Map();
//
//TODO: move to viewport-defined object
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const centerX = windowWidth / 2;
const centerY = windowHeight / 2;
//
// var keyW = false;
// var keyS = false;
// var keyA = false;
// var keyD = false;
// var angle = 0.0;
// var click = false;
// var controls_update = false;
//
// var player;
//
// var state = 0;
//
// var id;
//
// var qwerty;
//
// var fileReader;
// var arrayBuffer;
//
// initNetwork();
window.addEventListener( 'keydown', onKeyDown, false );
window.addEventListener( 'keyup', onKeyUp, false );
window.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener( 'click', onClick, false);
// init();
// // animate();
//
// function initNetwork() {

// }
//
// function levelFromYaml(evt) {
//     var message = evt.data;
//     var lv = YAML.parse(message);
//     var walls = lv.walls;
//     for(var i = 0; i < walls.length; i++){
//         var wall = walls[i];
//         new Wall(wall.id, wall.x, wall.y, 0.0, wall.w * 2, wall.h * 2);
//     }
//     var doors = lv.doors;
//     for(var i = 0; i < doors.length; i++){
//         var door = doors[i];
//         new Door(door.id, door.x, door.y, 0.0, door.w * 2, door.h * 2);
//     }
//     socket.send('ready');
//     console.log("yaml parsed");
//
//     animate();
//     fileReader = new FileReader();
//     fileReader.onload = function() {
//         arrayBuffer = this.result;
//     };
//     socket.onmessage = socketUpdate;
// }
//

//
// function socketUpdate(evt) {
//     var message = evt.data;
//     fileReader.readAsArrayBuffer(message);
//     var view = new Int16Array(arrayBuffer);
//     var ids = new Set();
//     for (var i = 0; i < view.length ; i += 4){
//         var id = view[i];
//         var typ = id >> 10;
//         var x = view[i + 1];
//         var y = view[i + 2];
//         var a = toRadians(view[i + 3]);
//         ids.add(id);
//         if (i == 0){
//             stage.position.x = centerX - x;
//             stage.position.y = centerY - y;
//         }
//         var body = body_map.get(id);
//         if (body){
//             body.update(x, y, a);
//         } else {
//             switch(typ){
//                 case 0:
//                     body = new Body(id, x, y, a);
//                     body_map.set(id, body);
//                     break;
//                 case 2:
//                     body = new Bullet(id, x, y, a);
//                     body_map.set(id, body);
//                     break;
//             }
//         }
//
//     }
//     for (var k of body_map.keys()){
//         if (!ids.has(k)){
//             var body = body_map.get(k);
//             body_map.delete(k);
//             body.delete();
//         }
//     }
//     return 0;
// }
//
// function socketControl() {
//     var m = "*";
//     m += keyW ? "t" :"f";
//     m += keyS ? "t" :"f";
//     m += keyA ? "t" :"f";
//     m += keyD ? "t" :"f";
//     m += click ? "t" : "f";
//     m += String(toDegrees(angle));
//     if (click)
//         click = false;
//     socket.send(m);
//     return m;
// }
//

//
function init() {
  //   const stage = new pixi.Stage();
  //   const renderer = new pixi.autoDetectRenderer(windowWidth, windowHeight, null, {transparent: true});
  //   console.log(renderer);
  //   document.body.appendChild(renderer.view);
  //
  // const g = new Body({id: 1, x: 400, y: 300, angle: 0});
  // const g1 = new Body({id: 1, x: 400, y: 500, angle: 0});
  // stage.addChild(g.sprite);
  // stage.addChild(g1.sprite);
  // renderer.render(stage);

  window.uuid = uuid();

  const width = windowWidth;
  const height = windowHeight;
  const transparent = true;

  const app = new PIXI.Application({width, height, transparent});

// The application will create a canvas element for you that you
// can then insert into the DOM.
  document.body.appendChild(app.view);
  const loader = PIXI.loader;
  loader.add('gun', Gun);

// load the texture we need
  loader.load((loader, resources) => {

    const body = new Body({id: 1, x: 200, y: 300, angle: 0, texture: resources.gun.texture});

    const updater = message => {
      const { data } = message;
      const parsedData = JSON.parse(data);
      //TODO replace taking first to matching uuid
      const newBody = parsedData.bodies[0];
      if (newBody) {
        body.update({x: newBody.x, y: newBody.y, angle: newBody.angle});
        app.render();
      }
    };

    window.socketControl = new SocketControl({address: defaultAddress, uuid: window.uuid, updater: updater})

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
        uuid: window.uuid,
        type: 'controls',
        message
      };
      if (window.socketControl.started) {
        window.socketControl.push(messageToSend);
      }
      setTimeout(controlsUpdater, 100)
    };
    window.socketControl.start();
    setTimeout(controlsUpdater, 1000);



    // This creates a texture from a 'bunny.png' image.

    // Add the bunny to the scene we are building.
    app.stage.addChild(body.sprite);
  });


  //
    // window.onbeforeunload = function (evt) {
    //     socket.send('~' + id);
    //     // socket.onclose
    //     socket.close();
    //     return;
    // }
}
//
//
function onDocumentMouseMove( event ) {
    const {clientX, clientY} = event;
    const dx = clientX - centerX;
    const dy = centerY - clientY;
    const l = Math.sqrt( dx * dx + dy * dy);
    const alp = dy > 0 ? Math.acos( dx / l ) : 2 * Math.PI - Math.acos( dx / l );
    //todo:  angle = alp;
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
//
// function animate() {
//     requestAnimationFrame( animate );
//     socketControl();
//     renderer.render(stage);
// }