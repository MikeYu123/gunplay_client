/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, Sprite} from 'pixi.js'
import {dropSpriteDefaults} from '../configs/application';

export default class Drop {
  constructor({x, y, angle, texture }) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.sprite = new Sprite(texture);
    Object.assign(this.sprite, dropSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = angle + Math.PI / 2;
  }
}
