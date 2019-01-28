/**
 * Created by mihailurcenkov on 19.07.17.
 */
import Door from '../objects/Door'
import Wall from '../objects/Wall'
import Bullet from '../objects/Bullet'
import Body from '../objects/Body'


export default class World {
  constructor({viewSettings, textures}) {
    this.bodies = [];
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
      this.app.renderer.resize(viewSettings.width, viewSettings.height);

      this.addBody = ({x, y, angle}, isPlayer) => {
          const {texture} = this.resources.body;
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

      this.initLoader = ({body, wall, bullet, door}) => {
          this.loader = PIXI.loader;
          this.loader.add('body', body);
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
