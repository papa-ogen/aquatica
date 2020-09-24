import * as CONSTANTS from '../../utils/constants';
import Scene from '../../prefabs/Scene';
import Background from '../../prefabs/Background';
import { Text } from '../../ui-kit';
import Sonar from '../../prefabs/Sonar';
import { speedControls, changeScene } from './controls';

class BelowSurface extends Scene {
  constructor({
    name, game, uiElements = [],
  }) {
    super({
      name,
      game,
      uiElements: [
        ...uiElements,
        changeScene(game),
        ...speedControls(game.uiCanvas.ctx, game.player),
      ],
    });

    const asset = this.game.assets.find((a) => a.name === 'sea-bottom');

    this.bg = new Background({ game, asset });
    this.ship = this.game.ship;
    this.sonar = new Sonar({ ctx: this.game.canvas.ctx, player: this.game.player });
    this.name = 'Didde drake';

    this.positionText = this.createHudItem(`lat ${this.game.player.position.lat}, lon ${this.game.player.position.lon}`, CONSTANTS.GRID_SIZE, CONSTANTS.CANVAS_HEIGHT - (CONSTANTS.GRID_SIZE / 2), CONSTANTS.TEXT_ALIGN_LEFT);
    this.gameAssets = [this.ship, this.sonar, this.positionText];
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
      credits, oxygen, food, coffee, water, fuel, waste,
      engineHeat, crew, speed, position: { depth },
    } = this.game.player;
    let hudItems = [
      `Credits: ${credits}`,
      `Oxygen: ${oxygen} bar`,
      `Food: ${food}kg`,
      `Coffee: ${coffee}L`,
      `Water: ${water}L`,
      `Fuel: ${fuel}L`,
      `Food: ${food}kg`,
      `Waste: ${waste}kg`,
      `Engine Heat: ${engineHeat}°`,
      `Crew: ${crew}`,
      `Current depth: ${depth}m`,
      `Speed: ${speed} km/h`,
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

    this.gameAssets.forEach((asset) => {
      asset.draw();
    });

    this.hud();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

export default BelowSurface;
