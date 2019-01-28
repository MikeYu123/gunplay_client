/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Sprite} from 'pixi.js'
import {GlowFilter} from 'pixi-filters'
import {bodySpriteDefaults, playerBodyGlowSettings} from '../configs/application'

export default class Body {
  get glowFilters() {
    const {distance, outerStrength, innerStrength, color, quality} = playerBodyGlowSettings;
    return [new GlowFilter(distance, outerStrength, innerStrength, color, quality)];
  }

  constructor({ x, y, angle, texture }) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.sprite = new Sprite(texture);
    Object.assign(this.sprite, bodySpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = angle;
    this.setPlayer = () => {
      this.sprite.filters = this.glowFilters;
    }
  }
}