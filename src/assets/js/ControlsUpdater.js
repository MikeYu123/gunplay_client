
export default class ControlsUpdater {
    constructor({ controlsRegistry, socketControl, timeout }) {
        this.controlsRegistry = controlsRegistry;
        this.socketControl = socketControl;
        this.timeout = timeout;
    }

    update() {
        const {up, down, left, right, click, angle} = this.controlsRegistry.flush();
        const message = {
            angle,
            up,
            down,
            left,
            right,
            click,
        };
        const messageToSend = {
            type: 'controls',
            message
        };
        if (this.socketControl.started) {
            this.socketControl.push(messageToSend);
        }
    }

    updateContinuosly() {
        this.update();
        setTimeout(this.updateContinuosly.bind(this), this.timeout)
    }

    setup() {
      setTimeout(this.updateContinuosly.bind(this), this.timeout)
    }
}