/**
 * Created by mihailurcenkov on 18.07.17.
 */
import  {Texture, extras} from 'pixi.js'
const {TilingSprite} = extras;
import {doorSpriteDefaults} from '../configs/application';

//but ne vyebyvaemsya, rabotaem s tem chto est'
//TODO: transform update to custom setter methods
//TODO: DRY refactoring through inheritance
//TODO rework textures on construction

export default class Door {
  presetSprite({x, y, angle, width, height, texture}) {
    this.sprite = new TilingSprite(texture, width, height);
    Object.assign(this.sprite, doorSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = angle;
  }

  constructor({ x, y, angle, width, height, texture }) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.texture = texture;
    this.width = width;
    this.height = height;
    this.presetSprite({x, y, angle, width, height, texture})
  }
}