/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, Sprite} from 'pixi.js'

const bulletSpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .06, y: .06} };

export default class Bullet {
  presetSprite({x, y, angle, texture}) {
    this.sprite = new Sprite(texture);
    Object.assign(this.sprite, bulletSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = angle + Math.PI / 2;
  }

  constructor({x, y, angle, texture }) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.texture = texture;
    this.presetSprite({x, y, angle, texture})
  }
}
