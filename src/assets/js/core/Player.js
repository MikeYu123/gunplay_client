/**
 * Created by mihailurcenkov on 19.07.17.
 */

export default class Player {
  constructor({body = {}} = {}) {
    this.uuid = body.uuid;
    this.body = body;
  }
}
