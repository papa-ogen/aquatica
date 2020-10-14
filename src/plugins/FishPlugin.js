import Phaser from 'phaser';
import Fish from '../prefabs/Fish';

export default class FishPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
    this.fishes = null;
  }

  createFishes(amount = 10) {
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
      this.scene.anims.create({
        key: `move-fish-${i}`,
        frames: this.scene.anims.generateFrameNumbers('fish', { start, end }),
        frameRate: 10,
        repeat: -1,
      });
    });

    this.fishes = this.scene.add.group();

    const centerX = this.scene.game.config.width / 2;
    const centerY = this.scene.game.config.height / 2;
    for (let i = 0; i < amount; i += 1) {
      const fish = new Fish(this.scene, centerX, centerY, 'fish');
      this.fishes.add(fish);
      this.scene.add.existing(fish);
    }
  }
}
