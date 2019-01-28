/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {extras} from 'pixi.js'
const {TilingSprite} = extras

const wallSpriteDefaults = { anchor: { x: .5, y: .5 }, tileScale: {x: .5, y: .5}};


export default class Wall {
  presetSprite({x, y, width, height, texture}) {
    this.sprite = new TilingSprite(texture, width, height);
    Object.assign(this.sprite, wallSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
  }

  constructor({ x, y, angle, width, height, texture}) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.texture = texture;
    this.width = width;
    this.height = height;
    this.presetSprite({x, y, width, height, texture})
  }
}