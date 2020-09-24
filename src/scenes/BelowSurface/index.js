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
    this.prevTime = Date.getTime();
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
      capacity: {
        oxygen, food, coffee, water, fuel, waste,
      },
      credits,
      engineHeat, crew, speed: { currentSpeed }, position: { depth },
    } = this.game.player;
    const {
      capacityLimit: {
        oxygen: oxygenLimit, food: foodLimit, water: waterLimit, fuel: fuelLimit, waste: wasteLimit,
      },
    } = this.game.ship;
    let hudItems = [
      `Credits: ${credits}`,
      `Oxygen: ${oxygen}/${oxygenLimit} bar`,
      `Food: ${food}/${foodLimit}kg`,
      `Coffee: ${coffee}L`,
      `Water: ${water}/${waterLimit}L`,
      `Fuel: ${fuel}/${fuelLimit}L`,
      `Food: ${food}/${foodLimit}kg`,
      `Waste: ${waste}/${wasteLimit}kg`,
      `Engine Heat: ${engineHeat}°`,
      `Crew: ${crew}`,
      `Current depth: ${depth}m`,
      `Speed: ${currentSpeed} km/h`,
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

  update() {
    const currentTime = Date.getTime();
    const delta = currentTime - this.prevTime;
    const v1 = this.game.player.speed.currentSpeed;
    const v2 = this.game.player.speed.targetSpeed;
    const time = v2 - v1 / this.game.player.speed.acceleration;
    const timePerFrame = time / 60;
    // https://stackoverflow.com/questions/27854973/how-to-calculate-velocity-for-a-set-distance-and-target-velocity
    console.log('target speed ', c);

    this.game.player.speed.currentSpeed += timePerFrame;

    this.prevTime = currentTime;
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
