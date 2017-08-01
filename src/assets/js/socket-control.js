/**
 * Created by mihailurcenkov on 18.07.17.
 */

export default class SocketControl {
  constructor({ address, uuid }) {
    this.uuid = uuid;
    this.socket = new WebSocket(address);
    this.socket.onopen = () => { this.initPlayer };
    this.socket.onclose = () => { console.log('Closed Socket') };
    this.socket.onmessage = message => { console.log(message) };
  }

  push(message) {
    const messageToSend = JSON.stringify(message);
    this.socket.send(messageToSend);
  }

  initPlayer() {
    console.log(this);
    const message = {
      type: 'register',
      uuid: this.uuid
    };
    this.push(message)
  }
}