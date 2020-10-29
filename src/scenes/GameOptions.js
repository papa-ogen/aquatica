import Phaser from 'phaser';

class GameOptions extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOptions' });
  }

  init() {
    this.gameScene = this.scene.get('BelowSurface');
  }

  create() {
    this.setupUIElements();

    this.add.tween({
      targets: [this.levelText, this.bgGraphics],
      ease: 'Sine.easeInOut',
      duration: 500,
      delay: 0,
      alpha: {
        getStart: () => 0,
        getEnd: () => 1,
      },
    });

    this.input.keyboard.addKey('P')
      .on('down', () => this.resumeGame());
  }

  setupUIElements() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.bgGraphics = this.add.graphics({
      fillStyle: {
        color: 0x000000, alpha: 0.5,
      },
    });
    this.bg = new Phaser.Geom.Rectangle(0, 0, width, height);
    this.bgGraphics.fillRectShape(this.bg);

    this.levelText = this.add.text(0, 0, 'Game Paused', {
      fontSize: '40px', fill: '#fff',
    });

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, height / 2, width, height),
    );
  }

  resumeGame() {
    this.scene.resume('BelowSurface');
    this.scene.resume('BelowSurfaceHUD');
    this.scene.stop();

    this.add.tween({
      targets: [this.levelText, this.bgGraphics],
      ease: 'Sine.easeInOut',
      duration: 500,
      delay: 0,
      alpha: {
        getStart: () => 1,
        getEnd: () => 0,
      },
    });
  }
}

export default GameOptions;
