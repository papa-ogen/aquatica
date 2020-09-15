import * as CONSTANTS from './utils/constants';
import { Ship, Surface } from './scenes/index';
import { Circle } from './ui-kit/index';
import Room from './prefabs/Room';

class Game {
  constructor(assets = [], MouseEvents) {
    this.canvas = document.getElementById('aquatic');
    this.canvas.width = CONSTANTS.CANVAS_WIDTH;
    this.canvas.height = CONSTANTS.CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext('2d');
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = this.BB.left;
    this.offsetY = this.BB.top;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.scenes = [
      new Ship('Ship', this, [
        new Room(this.ctx, CONSTANTS.GRID_SIZE * 10, CONSTANTS.GRID_SIZE * 3, 'Main'),
        new Room(this.ctx, CONSTANTS.GRID_SIZE * 16, CONSTANTS.GRID_SIZE * 3, 'Research'),
      ],
      [new Circle({
        ctx: this.ctx,
        text: 'Surface',
        callback: () => {
          const [, surface] = this.scenes;
          this.currentScene = surface;
        },
      })]),
      new Surface('Surface', this, [], [new Circle({
        ctx: this.ctx,
        text: 'Ship',
        color: 'purple',
        callback: () => {
          const [ship] = this.scenes;
          this.currentScene = ship;
        },
      })]),
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
      img.onload = function () {
        asset.loaded = true; // eslint-disable-line
        asset.img = this;// eslint-disable-line
        console.log('asset loaded ', asset.name); // eslint-disable-line
      };
    });

    this.assetsHasLoaded = true;
  }

  init() {
    this.loadAssets();
    if (this.MouseEvents) this.addEvents();
  }

  draw(time) {
    this.currentScene.draw(time);
  }
}

module.exports = Game;
