/**
 * Created by mihailurcenkov on 19.07.17.
 */

export class World {
  constructor({objects}) {
    this.objects = new Map();
    objects.forEach(object => {
      objects.set(object.id, object)
    })
  }
}