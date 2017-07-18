/**
 * Created by mihailurcenkov on 18.07.17.
 */

const keyW = 87;
const keyA = 65;
const keyS = 83;
const keyD = 70;
const keyUp = 38;
const keyLeft = 37;
const keyDown = 40;
const keyRight = 39;

//TODO resolve name confusion(keyUp & onKeyUp)
export default class ControlsRegisgtry {
  constructor(){
    this.up = this.down = this.right = this.left = this.click = false
  }

  click() {
    this.click = true;
  }

  onKeyUp(keyCode) {
    switch (keyCode) {
      case keyW:
      case keyUp:
        this.up = false;
        break;
      case keyS:
      case keyDown:
        this.down = false;
        break;
      case keyA:
      case keyLeft:
        this.left = false;
        break;
      case keyD:
      case keyRight:
        this.right = false;
        break;
    }
  }

  onKeyDown(keyCode) {
    switch (keyCode) {
      case keyW:
      case keyUp:
        this.up = true;
        break;
      case keyS:
      case keyDown:
        this.down = true;
        break;
      case keyA:
      case keyLeft:
        this.left = true;
        break;
      case keyD:
      case keyRight:
        this.right = true;
        break;
    }
  }
}