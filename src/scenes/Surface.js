import * as CONSTANTS from '../utils/constants';
import Scene from '../prefabs/Scene';

class Surface extends Scene {
  constructor({
    name, game, rooms = [], uiElements = [],
  }) {
    super({ name, game, uiElements });
    this.rooms = rooms;
  }

  draw() {
    this.game.ctx.fillStyle = 'blue';
    this.game.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

    this.rooms.forEach((room) => {
      room.draw();
    });

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

module.exports = Surface;
