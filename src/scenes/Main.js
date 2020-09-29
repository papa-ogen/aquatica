import Phaser from 'phaser';
import throttle from 'lodash.throttle';
// import Player from '../objects/Player';

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.Scene {
  constructor() {
    super();
    this.player = null;
    this.cursors = null;
  }

  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);

    this.add.image(0, 0, 'background-under-surface').setOrigin(0);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.levelText = this.add.text(0, 0, 'Below Surface', {
      fontFamily: 'roboto', fontSize: '26px', fill: '#fff',
    });

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, 30, width, height),
    );

    this.player = this.physics.add.sprite(100, 450, 'sub')
      .setScale(0.5)
      .setOrigin(0.5, 0.5);

    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('sub', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'stop',
      frames: [{ key: 'sub', frame: 0 }],
      frameRate: 20,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);

    console.log(this.player.angle);
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    this.scale.setGameSize(width, height);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    if (this.cursors.left.isDown) {
      this.player.angle -= 1;
    }

    if (this.cursors.right.isDown) {
      this.player.angle += 1;
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromAngle(this.player.angle, 300, this.player.body.velocity);
      this.player.anims.play('move');
    } else if (this.cursors.down.isDown) {
      this.physics.velocityFromAngle(this.player.angle, 300, this.player.body.velocity);
      this.player.anims.play('move');
    } else {
      this.player.anims.play('stop');
      this.player.setVelocity(-1);
    }
  }
}
