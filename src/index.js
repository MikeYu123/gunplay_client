import './assets/styles/styles.scss';
import MobileDetect from 'mobile-detect';
const device = new MobileDetect(window.navigator.userAgent);

import Game from './assets/js/core/Game';

require('html-loader!./templates/index.html');

const name = prompt('Enter your name');
const game = new Game(name, !!device.mobile(), 0);
game.start();