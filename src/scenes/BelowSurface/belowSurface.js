import Phaser from 'phaser';
import Submarine from './Submarine';

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
    this.player = new Submarine(this, 50, 50);

    this.cameras.main.setBackgroundColor(0xeedf6a);
    this.createMap();
    this.createCursor();
    this.createKeyboardEvents();
    this.createAnimations();
    this.createCameraControls();

    this.setCollisions();

    this.add.existing(this.player);

    this.addMask();

    this.cameras.main.startFollow(this.player);
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
    // this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: this.camera,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      speed: 0.5,
    });
  }

  addMask() {
    this.spotlight = this.make.sprite({
      x: 400,
      y: 300,
      key: 'mask',
      add: false,
    });

    const rt = this.add.renderTexture(0, 0, 2000, 2000); // TODO: Fix size to reflect camera or game
    rt.fill(0x023c4f, 0.9);

    const scaleX = this.cameras.main.width / rt.width;
    const scaleY = this.cameras.main.height / rt.height;
    const scale = Math.max(scaleX, scaleY);
    rt.setScale(scale).setScrollFactor(0);

    const mask = rt.createBitmapMask(this.spotlight);
    mask.invertAlpha = true;
    rt.setMask(mask);
  }

  createKeyboardEvents() {
    const EscKey = this.input.keyboard.addKey('Esc');
    EscKey.on('down', () => {
      // stop boat
    });

    const SpaceKey = this.input.keyboard.addKey('Space');
    SpaceKey.on('down', () => {
      this.scene.pause();
      // this.scene.launch(SCENES.GAME_OPTIONS)
      // this.gameState = GAME_STATE.PAUSED
    });
  }

  createAnimations() {
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
  }

  update() {
    if (this.cursors.up.isDown) {
      this.player.anims.play('move');
      this.events.emit('updateSpeed', this.playerSpeed);

      if (this.ship.speed.maxSpeed >= this.playerSpeed) {
        this.playerSpeed += this.ship.speed.acceleration;
      } else {
        this.playerSpeed = this.playerMaxSpeed;
      }
    }

    if (this.cursors.down.isDown) {
      this.events.emit('updateSpeed', this.playerSpeed);
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
