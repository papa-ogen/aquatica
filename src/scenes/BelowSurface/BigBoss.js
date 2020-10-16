import Phaser from 'phaser';

export default class Diver extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'manta');

    this.props = null;

    scene.physics.world.enable(this);
    scene.add.existing(this);

    const particles = this.scene.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 0.01,
      scale: { start: 0.2, end: 0 },
      blendMode: 'ADD',
    });

    emitter.startFollow(this);
  }

  // preUpdate(time, delta) {
  //   super.preUpdate(time, delta);
  // }
}
