import Scene from '../prefabs/Scene';
import Background from '../prefabs/Background';
import { Circle } from '../ui-kit';

class BelowSurface extends Scene {
  constructor({
    name, game, uiElements = [],
  }) {
    super({
      name,
      game,
      uiElements: [...uiElements, new Circle({
        ctx: game.uiCanvas.ctx,
        text: 'Surface',
        callback: () => {
          const [, surface] = game.scenes;
          game.currentScene = surface;
          game.currentScene.init();
        },
      })],
    });

    const asset = this.game.assets.find((a) => a.name === 'sea-bottom');

    this.bg = new Background({ game, asset });
    this.ship = this.game.ship;
  }

  init() {
    this.bg.draw();
  }

  draw() {
    super.draw();

    this.ship.draw();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

export default BelowSurface;
