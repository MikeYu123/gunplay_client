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
    this.initApp(appSettings);
    this.initLoader(textures, ready);
  }

  centerX(){
    return this.app.stage.width / 2
  }

  centerY(){
    return this.app.stage.height / 2
  }

  resetCenter({x, y}) {
    this.app.stage.position.x = this.centerX() - x;
    this.app.stage.position.y = this.centerY() - y;
  }

  addObject(object) {
    this.objects.set(object.uuid, object)
  }

  addObjects(objects) {
    objects.forEach(this.addObject)
  }

  initApp({width, height, transparent}) {
    this.app = new PIXI.Application({width, height, transparent})
  }

  initLoader({body, wall, bullet, door}, ready) {
    this.loader = PIXI.loader;
    this.loader.add('body', body);
    this.loader.add('wall', wall);
    this.loader.add('bullet', bullet);
    this.loader.add('door', door);
    this.loader.load((loader, resources) => {
      this.addBody = ({uuid, x, y, angle}) => {
        const {texture} = resources.body;
        const body = new Body({texture, uuid, x, y, angle});
        this.objects.set(uuid, body);
        this.app.stage.addChild(body.sprite);
      };
      this.addBullet = ({uuid, x, y, angle}) => {
        const {texture} = resources.bullet;
        const bullet = new Bullet({uuid, x, y, angle, texture});
        this.objects.set(uuid, bullet);
        this.app.stage.addChild(bullet.sprite);
      };
      this.addWall = ({uuid, x, y, angle, width, height}) => {
        const {texture} = resources.wall;
        const wall = new Wall({uuid, x, y, angle, width, height, texture});
        this.objects.set(uuid, wall);
        this.app.stage.addChild(wall.sprite);
      };
      this.addDoor = ({uuid, x, y, width, height, angle}) => {
        const {texture} = resources.door;
        const door = new Door({uuid, x, y, angle, width, height, texture});
        this.objects.set(uuid, door);
        this.app.stage.addChild(door.sprite);
      };
      ready();
    })
  }

  updateObject({uuid, x, y, angle}) {
    const obj = this.objects.get(uuid);
    obj.update({x, y, angle});
  }

  refresh() {
    this.app.render();
  }
}
