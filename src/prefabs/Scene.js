import * as CONSTANTS from '../utils/constants';
import { Text } from '../ui-kit';

class Scene {
  constructor({
    name, game, uiElements = [], gameAssets = [],
  }) {
    this.name = name;
    this.game = game;
    this.ctx = game.canvas.ctx;
    this.uiElements = [...uiElements, new Text({
      ctx: this.ctx,
      text: this.name,
      align: CONSTANTS.TEXT_ALIGN_CENTER,
      x: CONSTANTS.CANVAS_HORIZONTAL_CENTER,
      y: CONSTANTS.GRID_SIZE * 1.2,
      size: 24,
    })];
    this.gameAssets = gameAssets;
  }

  draw() {
    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

module.exports = Scene;
