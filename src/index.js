import Game from './Game';
import * as MouseEvents from './utils/mouseEvents';

const assets = [{
  name: 'sea-bottom',
  src: 'https://media.gettyimages.com/photos/top-view-of-a-sand-sea-bottom-picture-id825179646?s=2048x2048',
}];

const game = new Game({
  assets,
  MouseEvents,
  debug: false,
});

// prep game
game.init();

function draw(time) {
  game.draw(time);

  window.requestAnimationFrame(draw);
}

draw();
