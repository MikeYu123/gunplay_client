/**
 * Created by mihailurcenkov on 19.07.17.
 */

export class World {
  constructor({appSettings, textures}) {
    this.objects = new Map();
    this.initApp(appSettings);
    this.initLoader(textures);
  }

  centerX(){
    return this.app.stage.width / 2
  }

  centerY(){
    return this.app.stage.height / 2
  }

  resetCenter({x, y}) {
    this.app.stage.position.x = this.centerX() - x;
    this.app.stage.position.y = this.centerY() - y;
    this.app.render();
  }

  addObject(object) {
    this.objects.set(object.uuid, object)
  }

  addObjects(objects) {
    objects.forEach(this.addObject)
  }

  initApp({width, height, transparent}) {
    this.app = new PIXI.Application({width, height, transparent})
  }

  initLoader({body, wall, bullet, door}) {
    this.loader = PIXI.loader;
    loader.add('body', body);
    loader.add('wall', wall);
    loader.add('bullet', bullet);
    loader.add('door', door);
    this.loader.load((loader, resources) => {
      this.addBody = ({}) => {

      };
      this.addBullet = ({}) => {

      };
      this.addWall = ({}) => {

      };
      this.addDoor = ({}) => {

      };
    })
  }
}

function init() {
  //   const stage = new pixi.Stage();
  //   const renderer = new pixi.autoDetectRenderer(windowWidth, windowHeight, null, {transparent: true});
  //   console.log(renderer);
  //   document.body.appendChild(renderer.view);
  //
  // const g = new Body({id: 1, x: 400, y: 300, angle: 0});
  // const g1 = new Body({id: 1, x: 400, y: 500, angle: 0});
  // stage.addChild(g.sprite);
  // stage.addChild(g1.sprite);
  // renderer.render(stage);

  window.uuid = uuid();

  const width = windowWidth - 20;
  const height = windowHeight - 20;
  const transparent = true;

  const app = new PIXI.Application({width, height, transparent});

// The application will create a canvas element for you that you
// can then insert into the DOM.
  document.body.appendChild(app.view);
// load the texture we need
  loader.load((loader, resources) => {

    const updater = message => {
      const { data } = message;
      const parsedData = JSON.parse(data);
      //TODO replace taking first to matching uuid
      const newBody = parsedData.bodies[0];
      if (newBody) {
        body.update({x: newBody.x, y: newBody.y, angle: newBody.angle});
        app.render();
      }
    };

    const controlsUpdater = () => {
      const {up, down, left, right} = window.controlsRegistry.flush();
      const message = {
        angle: 0,
        up,
        down,
        left,
        right
      };
      const messageToSend = {
        type: 'controls',
        message
      };
      if (window.socketControl.started) {
        window.socketControl.push(messageToSend);
      }
      setTimeout(controlsUpdater, 100)
    };
    window.socketControl.start();
    setTimeout(controlsUpdater, 1000);



    // This creates a texture from a 'bunny.png' image.

    // Add the bunny to the scene we are building.
    app.stage.addChild(body.sprite);
    app.stage.addChild(wall.sprite);
  });
}