import './assets/styles/styles.scss';
import Game from './assets/js/hello-world';

require('html-loader!./templates/index.html');

const game = new Game();
game.start();