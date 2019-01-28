import PistolDropTexture from '../../images/pistol.png'
import ShotgunDropTexture from '../../images/shotgun.png'
import RiffleDropTexture from '../../images/riffle.png'
import PistolBodyTexture from '../../images/pistolPlayer.png'
import UnarmedBodyTexture from '../../images/unarmedPlayer.png'
import ShotgunBodyTexture from '../../images/shotgunPlayer.png'
import RiffleBodyTexture from '../../images/rifflePlayer.png'
import BulletTexture from '../../images/bullet.png'
import DoorTexture from '../../images/door_wood.png'
import WallTexture from '../../images/brick_wall.png'
import JsonProtocol from '../protocols/JsonProtocol';
import BinaryProtocol from '../protocols/BinaryProtocol';

const wallSpriteDefaults = { anchor: { x: .5, y: .5 }, tileScale: {x: .5, y: .5}};
const doorSpriteDefaults = { anchor: { x: .5, y: 0.5 }};
const bodySpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .12, y: .12} };
const bulletSpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .05, y: .05} };
const dropSpriteDefaults = { anchor: { x: .5, y: .5 },  scale: {x: .1, y: .1} };
const playerBodyGlowSettings = {distance: 10, outerStrength: 1, innerStrength: 1, color: 0x999900, quality: .5};
const leaderboardDefaults = {debounce: {timeout: 300}};
const textures = {
    pistolBody: PistolBodyTexture,
    shotgunBody: ShotgunBodyTexture,
    unarmedBody: UnarmedBodyTexture,
    riffleBody: RiffleBodyTexture,
    pistolDrop: PistolDropTexture,
    shotgunDrop: ShotgunDropTexture,
    riffleDrop: RiffleDropTexture,
    bullet: BulletTexture,
    door: DoorTexture,
    wall: WallTexture
};
// const backend = {
//     ws: 'ws://192.168.46.145:8090',
//     api: 'http://192.168.46.145:8090'
// };
const backend = {
    ws: 'ws://localhost:8090',
    api: 'http://localhost:8090'
};
const controlsUpdaterSettings = {
    timeout: 70
};
const nippleControlsSettings = {
    timeout: 5
};
//FIXME: Is it ok to use window object here?
const viewSettings  = {
    width: window.innerWidth - 20,
    height: window.innerHeight - 20,
    transparent: true
}
const protocol = new BinaryProtocol();
// const protocol = new JsonProtocol();
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
