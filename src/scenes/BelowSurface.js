import * as CONSTANTS from '../utils/constants';
import Scene from '../prefabs/Scene';
import Background from '../Background';
import { Text } from '../ui-kit';

class BelowSurface extends Scene {
  constructor({
    name, game, uiElements = [],
    ship,
  }) {
    super({ name, game, uiElements });

    this.ctx = game.ctx;
    this.bg = new Background(game);
    this.ship = ship;
    this.sceneName = new Text({
      ctx: this.ctx,
      text: this.name,
      align: CONSTANTS.TEXT_ALIGN_CENTER,
      x: CONSTANTS.CANVAS_WIDTH / 2,
      y: 35,
      size: 24,
    });
  }

  draw(time) {
    this.bg.draw(time);
    this.sceneName.draw();
    this.ship.draw();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

export default BelowSurface;
