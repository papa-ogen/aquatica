import Game from './Game';
import * as MouseEvents from './utils/mouseEvents';

const assets = [{
  name: 'sea-bottom',
  src: require('./assets/bg-under-surface.png'),
},
{
  name: 'layout-square',
  src: require('./assets/layout-square.png'),
},
{
  name: 'layout-square-hovered',
  src: require('./assets/layout-square-hovered.png'),
}];

const game = new Game({
  assets,
  MouseEvents,
  debug: true,
});

// prep game
game.init();

function draw(time) {
  game.draw(time);

  window.requestAnimationFrame(draw);
}

draw();
