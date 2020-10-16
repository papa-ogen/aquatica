import Phaser from 'phaser';

export default class Diver extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'diver');

    this.cursors = scene.cursors;
    this.props = {
      controlsActive: true,
    };

    scene.physics.world.enable(this);
    scene.add.existing(this);

    const particles = this.scene.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 0.1,
      scale: { start: 0.1, end: 0 },
      // lifespan: { min: 1000, max: 1100 },
      // frequency: 110,
      // maxParticles: 10,
      blendMode: 'ADD',
    });

    emitter.startFollow(this);
  }

  updateControls() {
    if (this.cursors.up.isDown) {
      this.y -= 1;
    }

    if (this.cursors.down.isDown) {
      this.y += 1;
    }

    if (this.cursors.left.isDown) {
      this.x -= 1;
    }

    if (this.cursors.right.isDown) {
      this.x += 1;
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.props.controlsActive) {
      this.updateControls();
    }
  }
}
