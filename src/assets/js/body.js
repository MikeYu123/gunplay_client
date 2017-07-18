/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, Sprite} from 'pixi'

const bodyTexture = Texture.fromImage('assets/images/sprites/gun1.png');
const bodySpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .2, y: .2} };

export default class Body {
  presetSprite({x, y, angle}) {
    this.sprite = new Sprite(bodyTexture);
    Object.assign(this.sprite, bodySpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    //NOTE: -a??? Ask @bubiga
    this.sprite.rotation = -angle;
  }

  update({x, y, angle}) {
    Object.assign(this.sprite, {position: { x, y }, rotation: angle});
  }

  constructor({ id, x, y, angle }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.presetSprite({x, y, angle})
  }
}