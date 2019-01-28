/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, Sprite} from 'pixi.js'
import {dropSpriteDefaults} from '../configs/application';

export default class Drop {
  constructor({x, y, texture }) {
    this.x = x;
    this.y = y;
    this.sprite = new Sprite(texture);
    Object.assign(this.sprite, dropSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = Math.PI / 2;
  }
}
