import './assets/styles/styles.scss';
import MobileDetect from 'mobile-detect';
const device = new MobileDetect(window.navigator.userAgent);

import Game from './assets/js/hello-world';

require('html-loader!./templates/index.html');

const name = prompt('Enter your name');
const game = new Game(name, !!device.mobile());
game.start();