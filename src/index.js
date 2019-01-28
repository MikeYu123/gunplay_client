import './assets/styles/styles.scss';
import MobileDetect from 'mobile-detect';
import Game from './assets/js/core/Game';

const device = new MobileDetect(window.navigator.userAgent);


require('html-loader!./templates/index.html');

const name = prompt('Enter your name');
const game = new Game(name, !!device.mobile(), 0);
game.start();