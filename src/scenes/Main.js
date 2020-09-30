import Phaser from 'phaser';

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  init(config) {
    const { shipData } = config;
    this.ship = shipData;
  }

  create() {
    this.scene
      .start('BelowSurface', {
        ship: this.ship,
      })
      .start('BelowSurfaceHUD').stop();
  }
}
