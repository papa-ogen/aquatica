import Phaser from 'phaser';

export default class BelowSurfaceHUD extends Phaser.Scene {
  constructor() {
    super('BelowSurfaceHUD');

    this.playerText = null;
  }

  init() {
    this.gameScene = this.scene.get('BelowSurface');
  }

  create() {
    // this.setupEvents();

    this.playerText = this.add.text(10, 150, 'Speed: 0', {
      fontFamily: 'roboto', fontSize: '16px', fill: '#fff',
    });

    this.levelText = this.add.text(0, 0, 'Below Surface', {
      fontFamily: 'roboto', fontSize: '26px', fill: '#fff',
    });

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, 30, width, height),
    );
  }

  setupEvents() {
    this.gameScene.events.on('updateSpeed', (speed) => {
      this.playerText = speed;
    });
  }

  update() {
    this.gameScene.events.once('updateSpeed', (speed) => {
      this.playerText.setText(`Speed: ${speed}`);
    });
  }
}
