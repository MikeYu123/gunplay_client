/**
 * Created by mihailurcenkov on 18.07.17.
 */

export default class SocketControl {
  constructor({ address, updater }) {
    this.address = address;
    this.updater = updater;
    this.started = false
  }


  start() {
    this.socket = new WebSocket(this.address);
    this.socket.onopen = () => { this.initPlayer(); this.started = true };
    this.socket.onclose = () => { console.log('Closed Socket') };
    this.socket.onmessage = message => { this.updater.update(message) };
  }

  push(message) {
    const messageToSend = JSON.stringify(message);
    this.socket.send(messageToSend);
  }

  initPlayer() {
    const message = {
      type: 'register'
    };
    this.push(message)
  }
}