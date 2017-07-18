import pixi from 'pixi'
import Door from './door'
import ControlsRegistry from './controls-registry'
import { uuid } from './utils'

const defaultAddress = 'ws://0.0.0.0:8000/sock';

export default class HelloWorld {
    constructor (greetings) {
        this.greetings = greetings;
    }

    sayHello() {
        window.a = new ControlsRegistry();
        console.log(new Door({id: 1, x: 10, y: 20}));
        return this.greetings;
    }
}

// var socket, socket_control, socket_update;
//
// var renderer;
// var stage;
// var body_map = new Map();
//
// var windowWidth = window.innerWidth;
// var windowHeight = window.innerHeight;
// var centerX = windowWidth / 2;
// var centerY = windowHeight / 2;
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
// window.addEventListener( 'mousemove', onDocumentMouseMove, false );
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
// function init() {
//     stage = new PIXI.Container();
//     renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight, { transparent: true });
//     document.body.appendChild(renderer.view);
//
//     var ground = PIXI.Texture.fromImage("__assets/__sprites/floor.jpg");
//     var g = new PIXI.Sprite(ground);
//     g.position.x = -256;
//     g.position.y = -256;
//
//     stage.addChild(g);
//
//     window.onbeforeunload = function (evt) {
//         socket.send('~' + id);
//         // socket.onclose
//         socket.close();
//         return;
//     }
// }
//
//
// function onDocumentMouseMove( event ) {
//     var x = event.clientX - centerX;
//     var y = centerY - event.clientY;
//     var l = Math.sqrt( x * x + y * y);
//     var alp = Math.acos( x / l );
//     alp = y > 0 ? alp : 2 * Math.PI - alp;
//     angle = alp;
//     return alp
// }
//
function onClick(){
  window.a.onClick();
}
//
function onKeyDown({ keyCode }){
  window.a.onKeyDown(keyCode)
}

function onKeyUp({ keyCode }){
  window.a.onKeyUp(keyCode)
}
//
// function onKeyUp(event){
//     var keyCode = event.keyCode;
//     switch (keyCode) {
//         case 87: //w
//             keyW = false;
//             break;
//         case 83: //s
//             keyS = false;
//             break;
//         case 65: //a
//             keyA = false;
//             break;
//         case 68: //d
//             keyD = false;
//             break;
//     }
// }
//
// function animate() {
//     requestAnimationFrame( animate );
//     socketControl();
//     renderer.render(stage);
// }