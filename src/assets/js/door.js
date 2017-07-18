/**
 * Created by mihailurcenkov on 18.07.17.
 */
import {Texture, TilingSprite} from 'pixi'

//TODO: these consts are bullshit as there is no class constants
//but ne vyebyvaemsya, rabotaem s tem chto est'
//TODO: transform update to custom setter methods
//TODO: DRY refactoring through inheritance
const doorTexture = Texture.fromImage('assets/images/sprites/door_wood.png');
const doorSpriteDefaults = { anchor: { x: .5, y: .5 }};

export default class Door {
  presetSprite({x, y, angle, width, height}) {
    this.sprite = new TilingSprite(doorTexture, width, height);
    Object.assign(this.sprite, doorSpriteDefaults);
    Object.assign(this.sprite.position, {x, y});
    this.sprite.rotation = angle;
  }

  update({x, y, angle}) {
    Object.assign(this.sprite, {position: { x, y }, rotation: angle});
  }

  constructor({ id, x, y, angle, width, height }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.presetSprite({x, y, angle, width, height})
  }
}