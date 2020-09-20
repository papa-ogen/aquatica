import * as CONSTANTS from './utils/constants';
import { BelowSurface, Surface } from './scenes';
import { Text } from './ui-kit';
import { CANVAS_HEIGHT } from './utils/constants';
import Ship from './prefabs/Ship';
import Player from './prefabs/Player';
import ships from './data/ships';
import Canvas from './prefabs/Canvas';

class Game {
  constructor({
    assets = [], MouseEvents,
    debug = false,
  }) {
    this.canvas = new Canvas({ id: 'game', width: CONSTANTS.CANVAS_WIDTH, height: CONSTANTS.CANVAS_HEIGHT });
    this.bgCanvas = new Canvas({ id: 'background', width: CONSTANTS.CANVAS_WIDTH, height: CONSTANTS.CANVAS_HEIGHT });
    this.uiCanvas = new Canvas({ id: 'ui', width: CONSTANTS.CANVAS_WIDTH, height: CONSTANTS.CANVAS_HEIGHT });
    this.debug = debug;

    this.player = new Player({ money: 10000, oxygen: 100 });

    this.assets = assets.map((asset) => ({
      name: asset.name,
      src: asset.src,
      loaded: false,
      img: undefined,
    }));
    this.assetsHasLoaded = false;
    this.MouseEvents = MouseEvents;

    // creating user ship
    this.ship = new Ship({
      game: this,
      ctx: this.canvas.ctx,
      name: 'Maria',
      onClick: () => console.log('click'),
      ...ships[0],
    });
    // create game scenes
    this.scenes = [
      new BelowSurface({
        name: 'Below Surface',
        game: this,
      }),
      new Surface({
        name: 'Surface',
        game: this,
      }),
    ];

    const [start] = this.scenes;
    this.currentScene = start;
  }

  addEvents() {
    this.uiCanvas.canvas.onmousedown = (e) => this.MouseEvents.onMouseDown(e, this);
    this.uiCanvas.canvas.onmouseup = (e) => this.MouseEvents.onMouseUp(e, this);
    this.uiCanvas.canvas.onmousemove = (e) => this.MouseEvents.onMouseMove(e, this);
  }

  loadAssets() {
    this.assets.forEach((asset) => {
      const img = new Image();
      img.src = asset.src;
      img.onload = () => {
        asset.loaded = true; // eslint-disable-line
        asset.img = img;// eslint-disable-line
        console.log('asset loaded ', asset.name); // eslint-disable-line
      };
    });
  }

  init() {
    this.loadAssets();

    if (this.MouseEvents) this.addEvents();
  }

  debugger() {
    const text = new Text({
      ctx: this.canvas.ctx,
      x: 10,
      y: CANVAS_HEIGHT - 16,
      text: 'debug mode',
    });

    text.draw();
  }

  findAssetByName(name) {
    return this.assets.find((a) => a.name === name);
  }

  draw(time) {
    this.canvas.ctx.clearRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    this.uiCanvas.ctx.clearRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

    this.assetsHasLoaded = !this.assets.some((asset) => !asset.loaded);

    if (this.assetsHasLoaded) {
      console.log('loading complete');
      this.currentScene.init();
      this.currentScene.draw(time);
    } else {
      const loadedAssets = this.assets.reduce((total, asset) => (asset.loaded ? total += 1 : total), 0);
      console.log(`loading ${loadedAssets} of ${this.assets.length}`);
    }

    if (this.debug) {
      this.debugger();
    }
  }
}

export default Game;
