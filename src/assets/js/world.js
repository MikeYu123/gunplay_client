/**
 * Created by mihailurcenkov on 19.07.17.
 */
import Door from './door'
import Wall from './wall'
import Bullet from './bullet'
import Body from './body'


export class World {
  constructor({appSettings, textures}) {
    this.objects = new Map();
    this.initApp(appSettings);
    this.initLoader(textures);
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
    loader.add('body', body);
    loader.add('wall', wall);
    loader.add('bullet', bullet);
    loader.add('door', door);
    this.loader.load((loader, resources) => {
      this.addBody = (params) => {
        const body = new Body({...params, texture: resources.body.texture});
        this.objects.set(params.uuid, body);
        this.app.stage.addChild(body.sprite);
      };
      this.addBullet = (params) => {
        const bullet = new Bullet({...params, texture: resources.bullet.texture});
        this.objects.set(params.uuid, bullet);
        this.app.stage.addChild(bullet.sprite);
      };
      this.addWall = (params) => {
        const wall = new Wall({...params, texture: resources.wall.texture});
        this.objects.set(params.uuid, wall);
        this.app.stage.addChild(wall.sprite);
      };
      this.addDoor = (params) => {
        const door = new Door({...params, texture: resources.door.texture});
        this.objects.set(params.uuid, door);
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
