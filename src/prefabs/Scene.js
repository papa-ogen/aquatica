import * as CONSTANTS from '../utils/constants';
import { Text } from '../ui-kit';

class Scene {
  constructor({ name, game, uiElements = [] }) {
    this.name = name;
    this.game = game;
    this.ctx = game.ctx
    this.uiElements = uiElements;
    this.sceneName = new Text({
      ctx: this.ctx,
      text: this.name,
      align: CONSTANTS.TEXT_ALIGN_CENTER,
      x: CONSTANTS.CANVAS_WIDTH / 2,
      y: CONSTANTS.GRID_SIZE * 1.2,
      size: 24,
    });
  }

  draw() {
    this.sceneName.draw()
  }
}

module.exports = Scene;
