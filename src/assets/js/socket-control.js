/**
 * Created by mihailurcenkov on 18.07.17.
 */

export default class SocketControl {
  constructor({address}) {
    this.socket = new WebSocket(address);
    // this.socket.onopen = function() {
    // };
//     socket.onclose = function() { document.title += '-c'; };
//     socket.onmessage = levelFromYaml;
  }
}