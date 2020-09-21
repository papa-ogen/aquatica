import * as CONSTANTS from '../utils/constants';
import Scene from '../prefabs/Scene';
import Background from '../prefabs/Background';
import { Circle, Text } from '../ui-kit';
import Sonar from '../prefabs/Sonar';

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
    this.sonar = new Sonar({ ctx: this.game.canvas.ctx });
    this.name = 'Didde drake';
  }

  createHudItem(name, value, x, y) {
    return new Text({
      ctx: this.ctx,
      text: `${name}: ${value}`,
      x,
      y,
      align: CONSTANTS.TEXT_ALIGN_RIGHT,
    });
  }

  hud() {
    const {
      credits, oxygen, food, coffee, water, fuel, waste,
    } = this.game.player;
    let hudItems = [
      {
        name: 'Credits',
        value: credits,
      },
      {
        name: 'Oxygen',
        value: oxygen,
      },
      {
        name: 'Food',
        value: food,
      },
      {
        name: 'Coffee',
        value: coffee,
      },
      {
        name: 'Water',
        value: water,
      },
      {
        name: 'Fuel',
        value: fuel,
      },
      {
        name: 'Waste',
        value: waste,
      },
    ];

    hudItems = hudItems.map((item, i) => (
      this.createHudItem(item.name, item.value, CONSTANTS.CANVAS_WIDTH - CONSTANTS.GRID_SIZE, CONSTANTS.GRID_SIZE * (i + 1))
    ));

    hudItems.forEach((hudItem) => {
      hudItem.draw();
    });
  }

  init() {
    this.bg.draw();
  }

  draw() {
    super.draw();

    this.ship.draw();
    this.sonar.draw();

    this.hud();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

export default BelowSurface;
