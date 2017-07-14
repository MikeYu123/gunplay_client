import pixi from 'pixi'
import Map from 'pixi'
export default class HelloWorld {
    constructor (greetings) {
        this.greetings = greetings;
    }

    sayHello() {
        console.log(pixi);
        return this.greetings;
    }
}

class Body {
    static get texture() {
      return PIXI.Texture.fromImage("assets/images/sprites/gun1.png")
    }

    presetSprite({x, y, a}) {
      this.sprite = new PIXI.Sprite(texture);
      this.sprite.anchor.x = 0.5;
      this.sprite.anchor.y = 0.5;
      this.sprite.scale.x = 0.2;
      this.sprite.scale.y = 0.2;
      this.sprite.position.x = x;
      this.sprite.position.y = y;
      this.sprite.rotation = -a;
    }

    update({x, y, a}) {
      Object.assign(this.sprite.position, { x, y });
      this.sprite.rotation = a;
    }

    constructor({ id, x, y, a }) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.a = a;
      this.presetSprite({x, y, a})
    }
}
//     this.id = id;
//     var texture = PIXI.Texture.fromImage("__assets/__sprites/gun1.png");
//     this.sprite = new PIXI.Sprite(texture);
//     this.sprite.anchor.x = 0.5;
//     this.sprite.anchor.y = 0.5;
//     this.sprite.scale.x = 0.2;
//     this.sprite.scale.y = 0.2;
//     this.sprite.position.x = x;
//     this.sprite.position.y = y;
//     this.sprite.rotation = -a;
//     this.update = function(x, y, a) {
//         this.sprite.position.x = x;
//         this.sprite.position.y = y;
//         this.sprite.rotation = a;
//     }
//     this.delete = function() {
//         stage.removeChild(this.sprite);
//     }
//     stage.addChild(this.sprite);
// }


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
// window.addEventListener( 'keydown', onKeyDown, false );
// window.addEventListener( 'keyup', onKeyUp, false );
// window.addEventListener( 'mousemove', onDocumentMouseMove, false );
// window.addEventListener( 'click', onClick, false);
// init();
// // animate();
//
// function initNetwork() {
//     socket = new WebSocket("ws://0.0.0.0:8000/sock");
//     socket.onopen = function() {
//         // document.title += '+c';
//         id = Date.now();
//         socket.send("#" + id);
//         console.log("id sent");
//         // animate();
//     };
//     socket.onclose = function() { document.title += '-c'; };
//     socket.onmessage = levelFromYaml;
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
// function Body(id, x, y, a) {
//     this.id = id;
//     var texture = PIXI.Texture.fromImage("__assets/__sprites/gun1.png");
//     this.sprite = new PIXI.Sprite(texture);
//     this.sprite.anchor.x = 0.5;
//     this.sprite.anchor.y = 0.5;
//     this.sprite.scale.x = 0.2;
//     this.sprite.scale.y = 0.2;
//     this.sprite.position.x = x;
//     this.sprite.position.y = y;
//     this.sprite.rotation = -a;
//     this.update = function(x, y, a) {
//         this.sprite.position.x = x;
//         this.sprite.position.y = y;
//         this.sprite.rotation = a;
//     }
//     this.delete = function() {
//         stage.removeChild(this.sprite);
//     }
//     stage.addChild(this.sprite);
// }
//
// function Bullet(id, x, y, a) {
//     this.id = id;
//     var texture = PIXI.Texture.fromImage("__assets/__sprites/noj.png");
//     this.sprite = new PIXI.Sprite(texture);
//     this.sprite.anchor.x = 0.5;
//     this.sprite.anchor.y = 0.5;
//     this.sprite.scale.x = 0.2;
//     this.sprite.scale.y = 0.2;
//     this.sprite.position.x = x;
//     this.sprite.position.y = y;
//     this.sprite.rotation = a + Math.PI / 2;
//     this.update = function(x, y, a) {
//         this.sprite.position.x = x;
//         this.sprite.position.y = y;
//         this.sprite.rotation = a + Math.PI / 2;
//     }
//     this.delete = function() {
//         stage.removeChild(this.sprite);
//     }
//     stage.addChild(this.sprite);
// }
//
// function Door(id, x, y, a, w, h) {
//     this.id = id;
//     var texture = PIXI.Texture.fromImage("__assets/__sprites/door_wood.png");
//     this.sprite = new PIXI.extras.TilingSprite(texture, w, h);
//     this.sprite.anchor.x = 0.5;
//     this.sprite.anchor.y = 0.5;
//     this.sprite.position.x = x;
//     this.sprite.position.y = y;
//     this.update = function(x, y, a) {
//         this.sprite.position.x = x;
//         this.sprite.position.y = y;
//         this.sprite.rotation = a;
//     }
//     this.delete = function() {
//         stage.removeChild(this.sprite);
//     }
//     body_map.set(id, this);
//     stage.addChild(this.sprite);
// }
//
// function Wall(id, x, y, a, w, h) {
//     this.id = id;
//     var texture = PIXI.Texture.fromImage("__assets/__sprites/brick_wall.png");
//     this.sprite = new PIXI.extras.TilingSprite(texture, w, h);
//     this.sprite.anchor.x = 0.5;
//     this.sprite.anchor.y = 0.5;
//     this.sprite.position.x = x;
//     this.sprite.position.y = y;
//     this.update = function(x, y, a) {
//         this.sprite.position.x = x;
//         this.sprite.position.y = y;
//         this.sprite.rotation = a + Math.PI / 2;
//     }
//     this.delete = function() {
//         stage.removeChild(this.sprite);
//     }
//     stage.addChild(this.sprite);
// }
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
// function toDegrees (angle) {
//     if (angle < 0)
//         angle = Math.PI - angle;
//     return angle * (180 / Math.PI);
// }
//
// function toRadians (angle) {
//     return angle * (Math.PI / 180);
// }
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
// function onClick( event ){
//     click = true;
// }
//
// function onKeyDown(event){
//     var keyCode = event.keyCode;
//     switch (keyCode) {
//         case 87: //w
//             keyW = true;
//             break;
//         case 83: //s
//             keyS = true;
//             break;
//         case 65: //a
//             keyA = true;
//             break;
//         case 68: //d
//             keyD = true;
//             break;
//     }
// }
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