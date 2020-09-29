import Phaser from 'phaser';

export default class BelowSurfaceHUD extends Phaser.Scene {
  constructor() {
    super('BelowSurfaceHUD');
  }

  init() {
    this.gameScene = this.scene.get('BelowSurface');
  }

  create() {
  }

  display() {
    this.add.text(150, 150, 'Heads up display', {
      fontFamily: 'roboto', fontSize: '40px', fill: '#fff',
    });
  }
}
