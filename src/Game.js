import * as CONSTANTS from './utils/constants';
import { BelowSurface, Surface } from './scenes';
import { Circle, Text } from './ui-kit';
import { CANVAS_HEIGHT } from './utils/constants';
import Ship from './prefabs/Ship';
import ships from './data/ships';

class Game {
  constructor({
    assets = [], MouseEvents,
    debug = false,
  }) {
    this.canvas = document.getElementById('aquatic');
    this.canvas.width = CONSTANTS.CANVAS_WIDTH;
    this.canvas.height = CONSTANTS.CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext('2d');
    this.BB = this.canvas.getBoundingClientRect();
    this.debug = debug;
    this.offsetX = this.BB.left;
    this.offsetY = this.BB.top;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    // creating user ship
    this.ship = new Ship({
      ctx: this.ctx,
      name: 'Maria',
      onClick: () => console.log('click'),
      ...ships[0],
    });
    this.scenes = [
      new BelowSurface({
        name: 'Below Surface',
        game: this,
        ship: this.ship,
        uiElements: [new Circle({
          ctx: this.ctx,
          text: 'Surface',
          callback: () => {
            const [, surface] = this.scenes;
            this.currentScene = surface;
          },
        })],
      }),
      new Surface({
        name: 'Surface',
        game: this,
        uiElements: [new Circle({
          ctx: this.ctx,
          text: 'Dive',
          color: 'purple',
          callback: () => {
            const [ship] = this.scenes;
            this.currentScene = ship;
          },
        })],
      }),
    ];

    const [ship] = this.scenes;
    this.currentScene = ship;

    this.assets = assets.map((asset) => ({
      name: asset.name,
      src: asset.src,
      loaded: false,
      img: undefined,
    }));
    this.assetsHasLoaded = false;
    this.MouseEvents = MouseEvents;
  }

  addEvents() {
    this.canvas.onmousedown = (e) => this.MouseEvents.onMouseDown(e, this);
    this.canvas.onmouseup = (e) => this.MouseEvents.onMouseUp(e, this);
    this.canvas.onmousemove = (e) => this.MouseEvents.onMouseMove(e, this);
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

    this.assetsHasLoaded = true;
  }

  init() {
    this.loadAssets();
    if (this.MouseEvents) this.addEvents();
  }

  debugger() {
    const text = new Text({
      ctx: this.ctx,
      x: 10,
      y: CANVAS_HEIGHT - 16,
      text: 'debug mode',
    });

    text.draw();
  }

  draw(time) {
    this.currentScene.draw(time);

    if (this.debug) {
      this.debugger();
    }
  }
}

export default Game;
