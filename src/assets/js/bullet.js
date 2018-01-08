/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, Sprite} from 'pixi'

const bulletTexture = Texture.fromImage('assets/images/sprites/noj.png');
const bulletSpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .2, y: .2} };

export default class Bullet {
  presetSprite({x, y, angle, texture}) {
    this.sprite = new Sprite(texture);
    Object.assign(this.sprite, bulletSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = angle + Math.PI / 2;
  }

  update({x, y, angle}) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    Object.assign(this.sprite, {position: { x, y }, rotation: angle + Math.PI / 2});
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
