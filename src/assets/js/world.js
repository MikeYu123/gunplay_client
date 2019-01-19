/**
 * Created by mihailurcenkov on 19.07.17.
 */
import Door from './door'
import Wall from './wall'
import Bullet from './bullet'
import Body from './body'


export default class World {
  constructor({appSettings, textures, ready}) {
    this.bodies = [];
    this.walls = [];
    this.bullets = [];
    this.doors = [];
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
    this.bullets = [];
  }

  flushBodies() {
    this.bodies.forEach(body => {
        this.app.stage.removeChild(body.sprite)
    });
    this.bodies = [];
  }

  flushDoors() {
      this.doors.forEach(door => {
          this.app.stage.removeChild(door.sprite)
      });
      this.doors = [];
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
      this.addBody = ({x, y, angle}, isPlayer) => {
        const {texture} = resources.body;
        const body = new Body({texture, x, y, angle});
        if (isPlayer) {
          body.setPlayer()
        }
        this.bodies.push(body);
        this.app.stage.addChild(body.sprite);
        return body;
      };
      this.addBullet = ({x, y, angle}) => {
        const {texture} = resources.bullet;
        const bullet = new Bullet({x, y, angle, texture});
        this.bullets.push(bullet);
        this.app.stage.addChild(bullet.sprite);
        return bullet;
      };
      this.addWall = ({ x, y, angle, width, height}) => {
        const {texture} = resources.wall;
        const wall = new Wall({x, y, angle, width, height, texture});
        this.walls.push(wall);
        this.app.stage.addChild(wall.sprite);
        return wall;
      };
      this.addDoor = ({x, y, width, height, angle}) => {
        const {texture} = resources.door;
        const door = new Door({x, y, angle, width, height, texture});
        this.doors.push(door);
        this.app.stage.addChild(door.sprite);
        return door;
      };
      ready(this);
    })
  }
}
