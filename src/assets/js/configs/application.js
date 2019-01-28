import BodyTexture from '../../images/player.png'
import BulletTexture from '../../images/bullet.png'
import DoorTexture from '../../images/door_wood.png'
import WallTexture from '../../images/brick_wall.png'
import JsonProtocol from '../protocols/JsonProtocol';
import BinaryProtocol from '../protocols/BinaryProtocol';

const wallSpriteDefaults = { anchor: { x: .5, y: .5 }, tileScale: {x: .5, y: .5}};
const doorSpriteDefaults = { anchor: { x: .5, y: 0.5 }};
const bodySpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .1, y: .1} };
const bulletSpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .05, y: .05} };
const playerBodyGlowSettings = {distance: 10, outerStrength: 1, innerStrength: 1, color: 0x999900, quality: .5};
const leaderboardDefaults = {debounce: {timeout: 300}};
const textures = {
    body: BodyTexture,
    bullet: BulletTexture,
    door: DoorTexture,
    wall: WallTexture
};
const backend = {
    ws: 'ws://192.168.46.145:8090',
    api: 'http://192.168.46.145:8090'
};
const controlsUpdaterSettings = {
    timeout: 70
};
const nippleControlsSettings = {
    timeout: 8
};
//FIXME: Is it ok to use window object here?
const viewSettings  = {
    width: window.innerWidth - 20,
    height: window.innerHeight - 20,
    transparent: true
}
const protocol = new BinaryProtocol();
const defaultName = 'huy';
export {
    wallSpriteDefaults,
    doorSpriteDefaults,
    bodySpriteDefaults,
    bulletSpriteDefaults,
    playerBodyGlowSettings,
    leaderboardDefaults,
    textures,
    backend,
    controlsUpdaterSettings,
    defaultName,
    protocol,
    viewSettings,
    nippleControlsSettings
};
