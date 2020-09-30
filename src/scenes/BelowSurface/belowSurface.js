import Phaser from 'phaser';

export default class BelowSurface extends Phaser.Scene {
  constructor() {
    super('BelowSurface');
    this.player = null;
    this.ship = null;
    this.shadow = null;
    this.offset = new Phaser.Geom.Point(10, 8);
    this.playerSpeed = 0;
    this.playerMaxSpeed = 50;
    this.cursors = null;
    this.spotlight = null;
  }

  init(config) {
    const { ship } = config;
    this.ship = ship;

    this.hudScene = this.scene.get('BelowSurfaceHUD');
  }

  create() {
    this.cameras.main.setBackgroundColor(0xeedf6a);
    this.createMap();
    this.createCursor();

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

    // this.shadow = this.physics.add.sprite(90, 440, 'sub-shadow')
    //   .setOrigin(0.5);
    // this.shadow.alpha = 0.3;

    const pic = this.add.image(this.cameras.main.width, this.cameras.main.height, 'shark-bg');

    this.player = this.physics.add.sprite(100, 450, 'sub')
      .setScale(0.5)
      .setOrigin(0.5, 0.5)
      .setBounce(1, 1)
      .setCollideWorldBounds(true);

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

    this.setCollisions();

    emitter.startFollow(this.player);

    this.createCameraControls();

    this.hudScene.display();

    this.spotlight = this.make.sprite({
      x: 400,
      y: 300,
      key: 'mask',
      add: false,
    });

    pic.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'level1' });
    this.tiles = this.map.addTilesetImage('desert-tiles');
    // this.backgroundLayer = this.map.createDynamicLayer('background', this.tiles, 0, 0);
    this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);
    this.detailsLayer = this.map.createStaticLayer('details', this.tiles, 0, 0);
    this.obstaclesLayer.setCollisionBetween(0, 200);

    // this.startArea1 = this.map.findObject('objects', (obj) => obj.name === 'Start Area 1');
    // this.startArea2 = this.map.findObject('objects', (obj) => obj.name === 'Start Area 2');
  }

  createCursor() {
    this.cursor = this.add.image(32, 32, 'cursor');
    this.cursor.setScale(0.5);
    this.cursor.setOrigin(0);
    this.cursor.alpha = 0;
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
    if (this.cursors.up.isDown) {
      this.player.anims.play('move');
      if (this.ship.speed.maxSpeed >= this.playerSpeed) {
        this.playerSpeed += this.ship.speed.acceleration;
      } else {
        this.playerSpeed = this.playerMaxSpeed;
      }
    }

    if (this.cursors.down.isDown) {
      if (this.playerSpeed <= 0) {
        this.playerSpeed = 0;
        this.player.anims.play('stop');
      } else {
        this.playerSpeed -= this.ship.speed.deceleration;
      }
    }

    if (this.cursors.left.isDown && this.playerSpeed > 0) {
      this.player.angle -= 0.5;
      // this.shadow.angle -= 0.5;
    }

    if (this.cursors.right.isDown && this.playerSpeed > 0) {
      this.player.angle += 0.5;
      // this.shadow.angle += 0.5;
    }

    this.physics.velocityFromAngle(this.player.angle, this.playerSpeed, this.player.body.velocity);
    // this.physics.velocityFromAngle(this.shadow.angle, this.playerSpeed, this.shadow.body.velocity);

    this.spotlight.x = this.player.x;
    this.spotlight.y = this.player.y;
  }
}
