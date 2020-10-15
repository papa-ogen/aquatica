import Phaser from 'phaser';

export default class Diver extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'diver');

    scene.physics.world.enable(this);
    scene.add.existing(this);

    const particles = this.scene.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 1,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
    });

    emitter.startFollow(this);
  }
}
