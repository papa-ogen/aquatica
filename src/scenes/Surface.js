import Scene from '../prefabs/Scene';
import Background from '../prefabs/Background';
import { Circle } from '../ui-kit';

class Surface extends Scene {
  constructor({
    name, game, uiElements = [],
  }) {
    super({
      name,
      game,
      uiElements: [...uiElements, new Circle({
        ctx: game.uiCanvas.ctx,
        text: 'Dive',
        callback: () => {
          const [belowSurface] = game.scenes;
          game.currentScene = belowSurface;
          game.currentScene.init();
        },
      })],
    });

    const asset = this.game.assets.find((a) => a.name === 'surface-bg');

    this.bg = new Background({ game, asset });
  }

  init() {
    this.bg.draw();
  }

  draw() {
    super.draw();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

export default Surface;
