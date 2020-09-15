import Game from './Game';
import * as MouseEvents from './utils/mouseEvents';
import * as CONSTANTS from './utils/constants';

const assets = [{
  name: 'sea-bottom',
  src: 'https://media.gettyimages.com/photos/top-view-of-a-sand-sea-bottom-picture-id825179646?s=2048x2048',
}];

const game = new Game({
  assets,
  MouseEvents,
  debug: true,
});

// prep game
game.init();

function draw(time) {
  game.ctx.clearRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

  if (game.assetsHasLoaded) {
    game.draw(time);
  }

  window.requestAnimationFrame(draw);
}

draw();
