/**
 * Created by mihailurcenkov on 19.07.17.
 */
import Door from './door'
import Wall from './wall'
import Bullet from './bullet'
import Body from './body'


export default class World {
  constructor({appSettings, textures, ready}) {
    this.objects = new Map();
    this.bodies = new Map();
    this.walls = new Map();
    this.bullets = new Map();
    this.doors = new Map();
    this.initApp(appSettings);
    this.initLoader(textures, ready);
    this.width = appSettings.width;
    this.height = appSettings.height;
  }

  centerX(){
    //TODO: stage size is tricky, maybe there is a problem with sizes
    return this.width / 2
  }

  centerY(){
    return this.height / 2
  }

  flushBullets() {
    this.bullets.forEach(bullet => {
      this.app.stage.removeChild(bullet.sprite)
    });
    this.bullets.clear();
  }

  flushBodies() {
    this.bodies.forEach(body => {
        this.app.stage.removeChild(body.sprite)
    });
    this.bodies.clear();
  }

  flushDoors() {
      this.doors.forEach(door => {
          this.app.stage.removeChild(door.sprite)
      });
      this.doors.clear();
  }

  flush() {
      this.flushBullets();
      this.flushBodies();
      this.flushDoors();
  }

  resetCenter({x, y}) {
    this.app.stage.position.x = this.centerX() - x;
    this.app.stage.position.y = this.centerY() - y;
  }

  addObject(object) {
    this.objects.set(object.uuid, object)
  }

  initApp({width, height, transparent}) {
    this.app = new PIXI.Application({width, height, transparent});
    //FIXME: experimental stuff
    Object.assign(this.app.stage, {width, height});
    this.app.renderer.resize(width, height);
  }

  refresh() {
      this.app.render();
  }

  initLoader({body, wall, bullet, door}, ready) {
    this.loader = PIXI.loader;
    this.loader.add('body', body);
    this.loader.add('wall', wall);
    this.loader.add('bullet', bullet);
    this.loader.add('door', door);
    this.loader.load((loader, resources) => {
      this.addBody = ({uuid, x, y, angle}, isPlayer) => {
        const {texture} = resources.body;
        const body = new Body({texture, uuid, x, y, angle});
        if (isPlayer) {
          body.setPlayer()
        }
        this.objects.set(uuid, body);
        this.bodies.set(uuid, body);
        this.app.stage.addChild(body.sprite);
        return body;
      };
      this.addBullet = ({uuid, x, y, angle}) => {
        const {texture} = resources.bullet;
        const bullet = new Bullet({uuid, x, y, angle, texture});
        this.objects.set(uuid, bullet);
        this.bullets.set(uuid, bullet);
        this.app.stage.addChild(bullet.sprite);
        return bullet;
      };
      this.addWall = ({uuid, x, y, angle, width, height}) => {
        const {texture} = resources.wall;
        const wall = new Wall({uuid, x, y, angle, width, height, texture});
        this.objects.set(uuid, wall);
        this.walls.set(uuid, wall);
        this.app.stage.addChild(wall.sprite);
        return wall;
      };
      this.addDoor = ({uuid, x, y, width, height, angle}) => {
        const {texture} = resources.door;
        const door = new Door({uuid, x, y, angle, width, height, texture});
        this.objects.set(uuid, door);
        this.doors.set(uuid, door);
        this.app.stage.addChild(door.sprite);
        return door;
      };
      ready(this);
    })
  }
}
