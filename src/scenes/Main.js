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
    this.shadow = null;
    this.offset = new Phaser.Geom.Point(10, 8);
    this.playerSpeed = 0;
    this.playerMaxSpeed = 50;
    this.cursors = null;
  }

  create() {
    this.cameras.main.setBackgroundColor(0xeedf6a);

    this.createMap();

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.levelText = this.add.text(0, 0, 'Below Surface', {
      fontFamily: 'roboto', fontSize: '26px', fill: '#fff',
    });

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, 30, width, height),
    );

    const particles = this.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
    });

    this.shadow = this.physics.add.sprite(90, 440, 'sub-shadow')
      .setOrigin(0.5);
    this.shadow.alpha = 0.3;

    this.player = this.physics.add.sprite(100, 450, 'sub')
      // .setScale(0.5)
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

    this.setCollisions();

    emitter.startFollow(this.player);

    this.createCameraControls();
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    this.scale.setGameSize(width, height);
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'level1' });
    this.tiles = this.map.addTilesetImage('desert-tiles');
    // this.backgroundLayer = this.map.createDynamicLayer('background', this.tiles, 0, 0);
    this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);
    this.detailsLayer = this.map.createStaticLayer('details', this.tiles, 0, 0);
    // this.obstaclesLayer.setCollisionBetween(50, 200);

    // this.startArea1 = this.map.findObject('objects', (obj) => obj.name === 'Start Area 1');
    // this.startArea2 = this.map.findObject('objects', (obj) => obj.name === 'Start Area 2');
  }

  setCollisions() {
    this.physics.add.collider(this.player, this.obstaclesLayer);
  }

  createCameraControls() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.cameras.main.startFollow(this.player);

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: this.camera,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      speed: 0.5,
    });
  }

  update() {
    if (this.playerSpeed > 0) {
      this.player.anims.play('move');
    }

    if (this.cursors.up.isDown) {
      if (this.playerMaxSpeed >= this.playerSpeed) {
        this.playerSpeed += 1;
      } else {
        this.playerSpeed = this.playerMaxSpeed;
      }
    }

    if (this.cursors.down.isDown) {
      if (this.playerSpeed <= 0) {
        this.playerSpeed = 0;
        this.player.anims.play('stop');
      } else {
        this.playerSpeed -= 1;
      }
    }

    if (this.cursors.left.isDown && this.playerSpeed > 0) {
      this.player.angle -= 1;
      this.shadow.angle -= 1;
    }

    if (this.cursors.right.isDown && this.playerSpeed > 0) {
      this.player.angle += 1;
      this.shadow.angle += 1;
    }

    this.physics.velocityFromAngle(this.player.angle, this.playerSpeed, this.player.body.velocity);
    this.physics.velocityFromAngle(this.shadow.angle, this.playerSpeed, this.shadow.body.velocity);
  }
}
