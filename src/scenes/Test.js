import Phaser from 'phaser';
import Diver from './BelowSurface/Diver';
import Submarine from './BelowSurface/Submarine';

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
      diver: null,
    };
  }

  init(config) {
    const { ship } = config;
    this.sceneSettings.ship = ship;

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.createCursor();
    this.cameras.main.setBackgroundColor(0xeedf6a);

    this.createMap();

    this.player = new Submarine(this, 400, 400);
    console.log(this.player.x);
    // this.cameras.main.startFollow(this.player);
    // this.player.activate();
    // //  A Container has a default size of 0x0, so we need to give it a size before enabling a physics
    // //  body or it'll be given the default body size of 64x64.
    // this.player.setSize(32, 32);

    // this.physics.world.enable(this.player);

    // this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.triviumLayer, () => {
      console.log('bump');
    });

    this.physics.world.on('collide', () => {
      console.log('collide');
    });
    this.physics.world.on('overlap', () => {
      console.log('overlap');
    });

    this.physics.world.on('worldbounds', () => {
      console.log('worldbounds');
    });
  }

  createCursor() {
    // this.cursor = this.add.image(32, 32, 'cursor');
    // this.cursor.setScale(0.5);
    // this.cursor.setOrigin(0);
    // this.cursor.alpha = 0;
    this.input.setDefaultCursor('url(src/assets/images/cursor.png), pointer');
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'level1' });
    this.tiles = this.map.addTilesetImage('desert-tiles');
    this.backgroundLayer = this.map.createDynamicLayer('background', this.tiles, 0, 0);
    this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);
    this.detailsLayer = this.map.createStaticLayer('details', this.tiles, 0, 0);
    this.triviumLayer = this.map.createDynamicLayer('trivium', this.tiles, 0, 0);

    this.obstaclesLayer.setCollisionBetween(0, 200);
    this.triviumLayer.setCollisionBetween(0, 200);
  }

  setCollisions() {
    this.physics.add.collider(this.sceneSettings.diver, this.obstaclesLayer, () => {
      console.log('bump');
    });
    this.physics.add.collider(this.sceneSettings.diver, this.triviumLayer, () => {
      console.log('gör nåt');
    });

    this.physics.world.on('collide', () => {
      console.log('collide');
    });
    this.physics.world.on('overlap', () => {
      console.log('overlap');
    });

    this.physics.world.on('worldbounds', () => {
      console.log('worldbounds');
    });
  }
}
