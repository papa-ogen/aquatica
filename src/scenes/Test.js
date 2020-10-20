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
    };
  }

  init(config) {
    const { ship } = config;
    this.sceneSettings.ship = ship;

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.cameras.main.setBackgroundColor(0xeedf6a);
    this.sceneSettings.diver = new Diver(this, 250, 250);
  }
}
