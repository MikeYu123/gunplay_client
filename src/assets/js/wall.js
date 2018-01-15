/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {TilingSprite} from 'pixi.js'
import {Sprite} from 'pixi.js'

const wallSpriteDefaults = { anchor: { x: .5, y: .5 }, scale: {x: .75, y: .75}, tileScale: {x: .5, y: .5}};


export default class Wall {
  presetSprite({x, y, width, height, texture}) {
      // this.sprite = new TilingSprite(texture, width, height);
    this.sprite = new TilingSprite(texture, width, height);
    console.log(this.sprite);
    Object.assign(this.sprite, wallSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
  }

  constructor({ uuid, x, y, angle, width, height, texture}) {
    this.uuid = uuid;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.texture = texture;
    this.width = width;
    this.height = height;
    this.presetSprite({x, y, width, height, texture})
  }
}