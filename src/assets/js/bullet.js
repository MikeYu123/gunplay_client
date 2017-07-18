/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, Sprite} from 'pixi'

const bulletTexture = Texture.fromImage('assets/images/sprites/noj.png');
const bulletSpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .2, y: .2} };

export default class Bullet {
  presetSprite({x, y, angle}) {
    this.sprite = new Sprite(bulletTexture);
    Object.assign(this.sprite, bulletSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = angle + Math.PI / 2;
  }

  update({x, y, angle}) {
    Object.assign(this.sprite, {position: { x, y }, rotation: angle + Math.PI / 2});
  }

  constructor({ id, x, y, angle }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.presetSprite({x, y, angle})
  }
}
