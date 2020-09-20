import * as CONSTANTS from '../utils/constants';
import Scene from '../prefabs/Scene';

class Surface extends Scene {
  constructor({
    name, game, uiElements = [],
  }) {
    super({ name, game, uiElements });
  }

  draw() {
    this.game.canvas.ctx.fillStyle = 'blue';
    this.game.canvas.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

    super.draw();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

module.exports = Surface;
