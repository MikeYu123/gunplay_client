/**
 * Created by mihailurcenkov on 19.07.17.
 */
import Door from '../objects/Door'
import Wall from '../objects/Wall'
import Bullet from '../objects/Bullet'
import Body from '../objects/Body'
import Drop from '../objects/Drop'


export default class World {
  constructor({viewSettings, textures}) {
    this.bodies = [];
    this.drops = [];
    this.walls = [];
    this.bullets = [];
    this.doors = [];
    this.width = viewSettings.width;
    this.height = viewSettings.height;

    this.flushBullets = () => {
      this.bullets.forEach(bullet => {
          this.app.stage.removeChild(bullet.sprite)
      });
      this.bullets = [];
    };

    this.flushBodies = () => {
      this.bodies.forEach(body => {
          this.app.stage.removeChild(body.sprite)
      });
      this.bodies = [];
    };

    this.flushDrops = () => {
      this.drops.forEach(drop => {
        this.app.stage.removeChild(drop.sprite)
      });
      this.drops = [];
    };

      this.flushDoors = () => {
          this.doors.forEach(door => {
              this.app.stage.removeChild(door.sprite)
          });
          this.doors = [];
      }

      this.flush = () => {
          this.flushBullets();
          this.flushBodies();
          this.flushDoors();
          this.flushDrops();
      }

      this.resetCenter = ({x, y}) => {
          this.app.stage.position.x = this.centerX - x;
          this.app.stage.position.y = this.centerY - y;
      }

      this.refresh = () => {
          this.app.render();
      }

      this.app = new PIXI.Application(viewSettings);
      //FIXME: experimental stuff
      Object.assign(this.app.stage, viewSettings);

      this.resize = ({width, height}) => {
        this.width = width;
        this.height = height;
        this.app.renderer.resize(width, height);
      }

      this.resize(viewSettings);

      const bodyTextureForWeapon = weapon => {
          switch (weapon) {
              case 'shotgun':
                  return this.resources.shotgunBody;
              case 'pistol':
                  return this.resources.pistolBody;
              case 'riffle':
                  return this.resources.riffleBody;
              default:
                  return this.resources.unarmedBody;
          }
      }

      const dropTextureForWeapon = weapon => {
          switch (weapon) {
              case 'shotgun':
                  return this.resources.shotgunDrop;
              case 'pistol':
                  return this.resources.pistolDrop;
              case 'riffle':
                  return this.resources.riffleDrop;
          }
      }

      this.addBody = ({x, y, angle, weapon}, isPlayer) => {
          const {texture} = bodyTextureForWeapon(weapon);
          const body = new Body({texture, x, y, angle});
          if (isPlayer) {
              body.setPlayer()
          }
          this.bodies.push(body);
          this.app.stage.addChild(body.sprite);
          return body;
      };
      this.addBullet = ({x, y, angle}) => {
          const {texture} = this.resources.bullet;
          const bullet = new Bullet({x, y, angle, texture});
          this.bullets.push(bullet);
          this.app.stage.addChild(bullet.sprite);
          return bullet;
      };
      this.addDrop = ({x, y, angle, weapon}) => {
          console.log(weapon);
          console.log(dropTextureForWeapon(weapon));
          const {texture} = dropTextureForWeapon(weapon);
          const drop = new Drop({x, y, angle, texture});
          this.drops.push(drop);
          this.app.stage.addChild(drop.sprite);
          return drop;
      };
      this.addWall = ({ x, y, angle, width, height}) => {
          const {texture} = this.resources.wall;
          const wall = new Wall({x, y, angle, width, height, texture});
          this.walls.push(wall);
          this.app.stage.addChild(wall.sprite);
          return wall;
      };
      this.addDoor = ({x, y, width, height, angle}) => {
          const {texture} = this.resources.door;
          const door = new Door({x, y, angle, width, height, texture});
          this.doors.push(door);
          this.app.stage.addChild(door.sprite);
          return door;
      };

      this.initLoader = () => {
          this.loader = PIXI.loader;
          const {pistolBody, shotgunBody, riffleBody, unarmedBody, wall, bullet, door, pistolDrop, shotgunDrop, riffleDrop} = textures;
          this.loader.add('pistolBody', pistolBody);
          this.loader.add('shotgunBody', shotgunBody);
          this.loader.add('riffleBody', riffleBody);
          this.loader.add('unarmedBody', unarmedBody);
          this.loader.add('riffleDrop', riffleDrop);
          this.loader.add('shotgunDrop', shotgunDrop);
          this.loader.add('pistolDrop', pistolDrop);
          this.loader.add('wall', wall);
          this.loader.add('bullet', bullet);
          this.loader.add('door', door);
          return new Promise(resolve => this.loader.load((loader, resources) => {
              this.resources = resources;
              return resolve(this);
          }))
      };
  }

  get centerX() {
    return this.width / 2
  }

  get centerY() {
      return this.height / 2
  }
}
