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

    const userShip = ships[0];

    this.player = new Player({
      credits: 10000,
      capacity: {
        ...userShip.capacity, 
        coffee: 100
      },
      speed: userShip.speed,
      crew: 10,
    });

    this.assets = assets.map((asset) => ({
      name: asset.name,
      src: asset.src,
      loaded: false,
      img: undefined,
    }));
    this.amountOfAssetsLoaded = 0;
    this.MouseEvents = MouseEvents;

    // creating user ship
    this.ship = new Ship({
      game: this,
      ctx: this.canvas.ctx,
      name: 'Maria',
      onClick: () => console.log('click'),
      ...userShip,
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
        this.amountOfAssetsLoaded += 1;
        console.log(`${this.amountOfAssetsLoaded} of ${this.assets.length} loaded`); // eslint-disable-line
      };
    });
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

  assetsHasLoaded() {
    return this.amountOfAssetsLoaded === this.assets.length;
  }

  init() {
    this.loadAssets();

    if (this.MouseEvents) this.addEvents();
  }

  update(time) {
    this.currentScene.update();

    this.currentScene.gameAssets.forEach((asset) => {
      asset.update(time);
    });
  }

  draw() {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.uiCanvas.ctx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);

    if (this.assetsHasLoaded()) {
      // console.log('loading complete');
      this.currentScene.init();
      this.currentScene.draw();
    }

    if (this.debug) {
      this.debugger();
    }
  }
}

export default Game;
