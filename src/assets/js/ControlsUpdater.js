
export default class ControlsUpdater {
    constructor({ controlsRegistry, socketControl }) {
        this.controlsRegistry = controlsRegistry;
        this.socketControl = socketControl;
    }

    update() {
        const {up, down, left, right} = this.controlsRegistry.flush();
        const message = {
            angle: 0,
            up,
            down,
            left,
            right
        };
        const messageToSend = {
            type: 'controls',
            message
        };
        if (window.socketControl.started) {
            this.socketControl.push(messageToSend);
        }
    }
}