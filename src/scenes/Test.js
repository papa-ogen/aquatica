import Phaser from 'phaser';
import Submarine from './BelowSurface/Submarine';
import Fish from './BelowSurface/Fish';

export default class Test extends Phaser.Scene {
  constructor() {
    super('Test');
    this.player = null;
    this.fish = null;
    this.light = null;
    this.cursors = null;
    this.spotlight = null;

    this.sceneSettings = {
      player: null,
      ship: null,
      maxDepth: 100, // TODO: Should come from map meta data
      defaultDepthSet: false,
      startingPlayerDepth: 80,
    };
  }

  init(config) {
    const { ship } = config;
    this.sceneSettings.ship = ship;
  }

  create() {
    this.createAnimations();
    this.createCameraControls();

    const map = this.make.tilemap({ key: 'level1' });
    const tileset = map.addTilesetImage('desert-tiles');

    map.createDynamicLayer('background', tileset, 0, 0).setPipeline('Light2D');
    map.createDynamicLayer('obstacles', tileset, 0, 0).setPipeline('Light2D');
    map.createDynamicLayer('details', tileset, 0, 0).setPipeline('Light2D');

    const x = this.cameras.main.centerX;
    const y = this.cameras.main.centerY;

    // this.player = new Submarine(this, x - 300, y);
    this.player = this.add
      .sprite(360, 300, 'sub', 1)
      .setOrigin(0.5);

    // this.fish = new Fish(this, this.game.config.width / 2, this.game.config.height / 2, 'fish');
    // this.add.existing(this.fish);

    this.lights.enable();
    this.lights.setAmbientColor(0x808080);

    // this.light = this.lights.addLight(400, 300, 200).setColor(0x023c4f);
    this.light = this.lights.addLight(x, y, 360).setColor(0x023c4f).setIntensity(5);

    // this.input.on('pointermove', (pointer) => {
    //   light.x = pointer.x;
    //   light.y = pointer.y;
    // });
  }

  createAnimations() {
    const fishTypes = [
      [0, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [11, 13],
      [14, 15],
    ];

    fishTypes.forEach((fishType, i) => {
      const [start, end] = fishType;
      this.anims.create({
        key: `move-fish-${i}`,
        frames: this.anims.generateFrameNumbers('fish', { start, end }),
        frameRate: 10,
        repeat: -1,
      });
    });
  }

  createCameraControls() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera = this.cameras.main;
    // this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: this.camera,
      zoomIn: this.input.keyboard.addKey('q'),
      zoomOut: this.input.keyboard.addKey('e'),
    });
  }

  update() {
    // this.player.update();
    // this.light.x = this.player.x + 50;
    // this.light.y = this.player.y;
    // this.spotlight.x = this.player.x + 50;
    // this.spotlight.y = this.player.y;
  }
}
