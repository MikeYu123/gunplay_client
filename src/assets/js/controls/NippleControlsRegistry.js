/**
 * Created by mihailurcenkov on 18.07.17.
 */

//TODO resolve name confusion(keyUp & onKeyUp)
export default class NippleControlsRegistry {
    constructor({directionManager, angleManager, angleAndShotManager}) {
        this.directionManager = directionManager;
        this.angleManager = angleManager;
        this.angleAndShotManager = angleAndShotManager;
        this.up = this.down = this.right = this.left = this.click = false;
        this.angle = 0;
        this.setDirection = degree => {
            this.right = 60 > degree && degree >= 0 || 360 > degree && degree >= 300;
            this.up = 150 > degree && degree >= 30;
            this.down = 210 < degree && degree <= 330;
            this.left = 120 < degree && degree <= 240;
        };
        this.resetDirection = () => {
            this.up = this.down = this.left = this.right = false
        };
        this.directionManager.on('move', (_, eventData) => {
            this.setDirection(eventData.angle.degree)
        });
        this.directionManager.on('end', this.resetDirection);

        this.angleManager.on('move', (_, eventData) => {
            this.angle = -eventData.angle.radian;
        });

        this.angleAndShotManager.on('move', (_, eventData) => {
            this.click = true
            this.angle = -eventData.angle.radian;
        });
        this.angleAndShotManager.on('end', (_, eventData) => {
            this.click = false
        });

        this.flush = () => {
            return {
                up: this.up,
                down: this.down,
                left: this.left,
                right: this.right,
                click: this.click,
                angle: this.angle
            };
        }
    }
}