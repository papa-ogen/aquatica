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

    this.positionText = this.createHudItem(`lat ${this.game.player.position.lat}, lon ${this.game.player.position.lon}`, CONSTANTS.GRID_SIZE, CONSTANTS.CANVAS_HEIGHT - (CONSTANTS.GRID_SIZE / 2), CONSTANTS.TEXT_ALIGN_LEFT);
  }

  createHudItem(text, x, y, align = CONSTANTS.TEXT_ALIGN_RIGHT) {
    return new Text({
      ctx: this.ctx,
      text,
      x,
      y,
      align,
    });
  }

  hud() {
    const {
      credits, oxygen, food, coffee, water, fuel, waste, engineHeat, crew,
    } = this.game.player;
    let hudItems = [
      `Credits: ${credits}`,
      `Oxygen: ${oxygen}`,
      `Food: ${food}`,
      `Coffee: ${coffee}`,
      `Water: ${water}`,
      `Fuel: ${fuel}`,
      `Food: ${food}`,
      `Waste: ${waste}`,
      `Engine Heat: ${engineHeat}`,
      `Crew: ${crew}`,
    ];

    hudItems = hudItems.map((item, i) => (
      this.createHudItem(item,
        CONSTANTS.CANVAS_WIDTH - CONSTANTS.GRID_SIZE,
        CONSTANTS.GRID_SIZE * (i + 1))
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
    this.positionText.draw();

    this.hud();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

export default BelowSurface;
