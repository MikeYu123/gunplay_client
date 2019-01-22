/**
 * Created by mihailurcenkov on 18.07.17.
 */

export default class SocketControl {
  constructor({ address, updater, name, protocol }) {
    this.address = address;
    this.updater = updater;
    this.name = name;
    this.protocol = protocol

    this.start = () => {
        this.socket = new WebSocket(this.address);
        this.socket.binaryType = 'arraybuffer';
        return new Promise((resolve, reject) => {
            this.socket.onopen = () => {
                this.initPlayer();
                resolve()
            };
            this.socket.onclose = () => {
                console.log('Closed Socket')
            };
            this.socket.onmessage = message => {
                this.updater.update(this.protocol.decode(message.data))
            };
        })
    }

    this.push = (message) => {
        const {data, isBinary} = this.protocol.encode(message);
        this.socket.send(data, {isBinary});
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