import Phaser from 'phaser';
import Diver from './BelowSurface/Diver';

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
    this.cameras.main.setBackgroundColor(0xeedf6a);

    this.createMap();

    this.sceneSettings.diver = new Diver(this, 450, 250);
    this.sceneSettings.diver.activate();

    this.player = this.add.image(560, 280, 'sub');
    this.physics.world.enable(this.player);

    this.setCollisions();
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'level1' });
    this.tiles = this.map.addTilesetImage('desert-tiles');
    this.backgroundLayer = this.map.createDynamicLayer('background', this.tiles, 0, 0);
    this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);
    this.detailsLayer = this.map.createStaticLayer('details', this.tiles, 0, 0);
    this.triviumLayer = this.map.createDynamicLayer('trivium', this.tiles, 0, 0);

    this.obstaclesLayer.setCollisionBetween(0, 200);
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
