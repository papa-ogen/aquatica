import Phaser from 'phaser';
import Submarine from './Submarine';
import Fish from './Fish';

export default class BelowSurface extends Phaser.Scene {
  constructor() {
    super('BelowSurface');
    this.fishes = null;
    this.cursors = null;
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

    this.hudScene = this.scene.get('BelowSurfaceHUD');
  }

  create() {
    this.cameras.main.setBackgroundColor(0xeedf6a);

    this.createMap();
    this.createCursor();
    this.createKeyboardEvents();
    this.createCameraControls();
    this.createAnimations();
    this.createFishes();

    this.fishes.getChildren().forEach((fish) => {
      this.add.existing(fish);
    });

    this.sceneSettings.player = new Submarine(this, 150, 150);

    this.add.existing(this.sceneSettings.player);

    // this.setCollisions();
  }

  createFishes() {
    this.fishes = this.add.group();

    for (let i = 0; i < 100; i += 1) {
      const fish = new Fish(this, this.game.config.width / 2, this.game.config.height / 2, 'fish');
      this.fishes.add(fish);
    }
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
    this.physics.add.collider(this.sceneSettings.player, this.obstaclesLayer);
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
      this.scene.launch('GameOptions');
    });

    const GKey = this.input.keyboard.addKey('g');
    GKey.on('down', () => {
      const fish = new Fish(this, this.sceneSettings.player.x, this.sceneSettings.player.y, 'fish');
      this.add.existing(fish);
      this.fishes.add(fish);
    });
  }

  update(time) {
    const {
      maxDepth, defaultDepthSet, player, startingPlayerDepth,
    } = this.sceneSettings;

    if (maxDepth && !defaultDepthSet) {
      this.events.emit('updateMaxDepth', maxDepth);
      this.events.emit('updateCurrentDepth', startingPlayerDepth);
      this.sceneSettings.defaultDepthSet = true;
    }

    this.fishes.getChildren().forEach((fish) => {
      fish.update();
    });

    player.update(time);
  }
}
