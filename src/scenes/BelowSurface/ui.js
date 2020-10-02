import Phaser from 'phaser';

export default class BelowSurfaceHUD extends Phaser.Scene {
  constructor() {
    super('BelowSurfaceHUD');

    this.currentSpeed = null;
    this.targetSpeed = null;
  }

  init() {
    this.gameScene = this.scene.get('BelowSurface');
  }

  create() {
    // this.setupEvents();

    this.currentSpeed = this.add.text(10, 120, 'Current Speed: 0', {
      fontFamily: 'roboto', fontSize: '16px', fill: '#fff',
    });

    this.targetSpeed = this.add.text(10, 150, 'Target Speed: 0', {
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
    this.gameScene.events.on('updateCurrentSpeed', (currentSpeed) => {
      this.currentSpeed = currentSpeed;
    });

    this.gameScene.events.on('updateTargetSpeed', (targetSpeed) => {
      this.targetSpeed = targetSpeed;
    });
  }

  update() {
    this.gameScene.events.once('updateCurrentSpeed', (currentSpeed) => {
      this.currentSpeed.setText(`Current Speed: ${Math.round(currentSpeed)}`);
    });

    this.gameScene.events.on('updateTargetSpeed', (targetSpeed) => {
      this.targetSpeed.setText(`Target Speed: ${targetSpeed}`);
    });
  }
}
