import Phaser from 'phaser';
import Submarine from './Submarine';
import Fish from './Fish';
import Fish2 from './Fish2';

export default class BelowSurface extends Phaser.Scene {
  constructor() {
    super('BelowSurface');
    this.player = null;
    this.fish = null;
    this.ship = null;
    this.cursors = null;
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
    this.createKeyboardEvents();
    this.createCameraControls();

    this.fish = new Fish(this, 250, 250);
    this.fish2 = new Fish2(this, 0, 0);
    this.player = new Submarine(this, 50, 50, this.cursors, this.ship, this.cameras);

    this.setCollisions();

    this.add.existing(this.fish);
    this.add.existing(this.fish2);
    this.add.existing(this.player);
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

  createKeyboardEvents() {
    const EscKey = this.input.keyboard.addKey('Esc');
    EscKey.on('down', () => {
      // stop boat
    });

    const SpaceKey = this.input.keyboard.addKey('Space');
    SpaceKey.on('down', () => {
      this.scene.pause();
    });
  }

  update() {
    this.player.update();
  }
}
