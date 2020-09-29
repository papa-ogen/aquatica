import Phaser from 'phaser';
import throttle from 'lodash.throttle';
// import Player from '../objects/Player';

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.Scene {
  constructor() {
    super();
  }

  init(config) {
    const { shipData } = config;
    this.ship = shipData;
  }

  create() {
    this.scene.start('BelowSurface', {
      ship: this.ship,
    }).start('BelowSurfaceHUD').stop();
  }
}
