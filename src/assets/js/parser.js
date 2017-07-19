/**
 * Created by mihailurcenkov on 19.07.17.
 */
import Wall from 'wall.js'
import Bullet from 'bullet.js'
import Body from 'body.js'
import Door from 'door.js'

export const parseBodies = bodies => {
  return bodies.map(body => {
    switch(body.type) {
      case 'Bullet':
        return new Bullet(body);
      case 'Body':
        return new Body(body);
      case 'Door':
        return new Door(body);
      case 'Wall':
        return new Wall(body);
    }
  })
};

export const parseLevel = level => {
  const {doors, walls} = level;
  return {
    doors: doors.map(door => {
      const {id, x, y, w, h} = door;
      return new Door({
        id,
        x,
        y,
        angle: 0.0,
        w: w*2,
        h: h*2
      })
    }),
    walls: walls.map(wall => {
      const {id, x, y, w, h} = wall;
      return new Wall({
        id,
        x,
        y,
        //TODO: check if really 0.0
        angle: 0.0,
        w: w*2,
        h: h*2
      })
    })
  };
};