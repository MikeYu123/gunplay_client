/**
 * Created by mihailurcenkov on 18.07.17.
 */

export default class SocketControl {
  constructor({ address, updater, name }) {
    this.address = address;
    this.updater = updater;
    this.name = name;

    this.start = () => {
        this.socket = new WebSocket(this.address);
        return new Promise((resolve, reject) => {
            this.socket.onopen = () => {
                this.initPlayer();
                resolve()
            };
            this.socket.onclose = () => {
                console.log('Closed Socket')
            };
            this.socket.onmessage = message => {
                this.updater.update(message)
            };
        })
    }

    this.push = (message) => {
        const messageToSend = JSON.stringify(message);
        this.socket.send(messageToSend);
    }

    this.initPlayer = () => {
        const message = {
            type: 'register',
            name: this.name
        };
        this.push(message)
    }
  }


}