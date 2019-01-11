/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Sprite} from 'pixi.js'
const bodySpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .1, y: .1} };

export default class Body {
  presetSprite({x, y, angle, texture}) {
    // console.log(texture);
    this.sprite = new Sprite(texture);
    Object.assign(this.sprite, bodySpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    //NOTE: -a??? Ask @bubiga
    this.sprite.rotation = angle;
  }

  update({x, y, angle}) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    Object.assign(this.sprite, {position: { x, y }, rotation: angle});
  }

  constructor({ uuid, x, y, angle, texture }) {
    this.uuid = uuid;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.texture = texture;
    this.presetSprite({x, y, angle, texture})
  }
}