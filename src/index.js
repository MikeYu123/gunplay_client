import './assets/styles/styles.scss';
import Game from './assets/js/hello-world';

require('html-loader!./templates/index.html');

const name = prompt('Enter your name');
const game = new Game(name);
game.start();