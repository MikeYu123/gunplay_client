
export default class ControlsUpdater {
    constructor({ controlsRegistry, socketControl, timeout }) {
        this.controlsRegistry = controlsRegistry;
        this.socketControl = socketControl;
        this.timeout = timeout;

        this.update = () => {
            const {up, down, left, right, click, angle} = this.controlsRegistry.flush();

            const messageToSend = {
                type: 'controls',
                angle,
                up,
                down,
                left,
                right,
                click
            };
            this.socketControl.push(messageToSend);
        }

        this.updateContinuosly = () =>  {
            this.update();
            setTimeout(this.updateContinuosly, this.timeout)
        }

        this.setup = () => {
            this.updateContinuosly()
        }
    }
}