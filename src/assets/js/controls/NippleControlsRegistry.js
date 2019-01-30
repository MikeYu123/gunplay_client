/**
 * Created by mihailurcenkov on 18.07.17.
 */

import {debounce} from '../utils/debounce'
import {nippleControlsSettings} from '../configs/application';
import Hammer from 'hammerjs'
const {timeout} = nippleControlsSettings;


//TODO resolve name confusion(keyUp & onKeyUp)
export default class NippleControlsRegistry {
    constructor({directionManager, angleManager, angleAndShotManager, dropWeaponButton}) {
        this.directionManager = directionManager;
        this.angleManager = angleManager;
        this.angleAndShotManager = angleAndShotManager;
        this.dropWeaponButton = dropWeaponButton;
        this.up = this.down = this.right = this.left = this.space = this.click = false;
        this.angle = 0;

        this.setDirection = degree => {
            this.right = 60 > degree && degree >= 0 || 360 > degree && degree >= 300;
            this.up = 150 > degree && degree >= 30;
            this.down = 210 < degree && degree <= 330;
            this.left = 120 < degree && degree <= 240;
        };

        this.dropWeaponButton.on('doubletap', (e) => {
            // console.log(e)
            this.space = true;
        });

        this.resetDirection = () => {
            this.up = this.down = this.left = this.right = false
        };
        this.directionManager.on('move', debounce((_, eventData) => {
            this.setDirection(eventData.angle.degree)
        }, timeout));
        this.directionManager.on('end', debounce(this.resetDirection, timeout));

        this.angleManager.on('move', debounce((_, eventData) => {
            this.angle = -eventData.angle.radian;
        }, timeout));

        this.angleAndShotManager.on('move', debounce((_, eventData) => {
            this.click = true;
            this.angle = -eventData.angle.radian;
        }, timeout));

        this.angleAndShotManager.on('end', debounce(() => {
            this.click = false;
        }, timeout));

        this.flush = () => {
            const state =  {
                up: this.up,
                down: this.down,
                left: this.left,
                right: this.right,
                click: this.click,
                angle: this.angle,
                space: this.space
            };
            this.space = false;
            return state
        }
    }
}