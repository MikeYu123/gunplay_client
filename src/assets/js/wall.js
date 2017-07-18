/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, TilingSprite} from 'pixi'

const wallTexture = Texture.fromImage('assets/images/sprites/brick_wall.png');
const wallSpriteDefaults = { anchor: { x: .5, y: .5 }};


export default class Wall {
  presetSprite({x, y, width, height}) {
    this.sprite = new TilingSprite(wallTexture, width, height);
    Object.assign(this.sprite, wallSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
  }

  constructor({ id, x, y, angle, width, height}) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.presetSprite({x, y, width, height})
  }
}