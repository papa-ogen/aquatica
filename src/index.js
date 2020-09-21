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
},
{
  name: 'cockpit',
  src: require('./assets/cockpit.gif'),
},
{
  name: 'cockpit-hover',
  src: require('./assets/cockpit-hover.png'),
},
{
  name: 'main',
  src: require('./assets/main.png'),
},
{
  name: 'main-hover',
  src: require('./assets/main-hover.png'),
},
];

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
