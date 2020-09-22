import Game from './Game';
import * as MouseEvents from './utils/mouseEvents';

// refactor to json file?

const assets = [{
  name: 'sea-bottom',
  src: require('./assets/bg-under-surface.png'), // eslint-disable-line
},
{
  name: 'surface-bg',
  src: require('./assets/shark-bg.jpg'), // eslint-disable-line
},
{
  name: 'layout-square',
  src: require('./assets/layout-square.png'), // eslint-disable-line
},
{
  name: 'layout-square-hovered',
  src: require('./assets/layout-square-hovered.png'), // eslint-disable-line
},
{
  name: 'cockpit',
  src: require('./assets/cockpit.png'), // eslint-disable-line
},
{
  name: 'cockpit-hover',
  src: require('./assets/cockpit-hover.png'), // eslint-disable-line
},
{
  name: 'main',
  src: require('./assets/main.png'), // eslint-disable-line
},
{
  name: 'main-hover',
  src: require('./assets/main-hover.png'), // eslint-disable-line
},
];

const game = new Game({
  assets,
  MouseEvents,
  debug: false,
});

// prep game
game.init();

let secondsPassed = 0;
let oldTimeStamp = 0;

function draw(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  game.update(secondsPassed);
  game.draw();

  window.requestAnimationFrame(draw);
}

draw();
