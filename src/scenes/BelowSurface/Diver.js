import Phaser from 'phaser';
import StatusBar from './StatusBar';

export default class Diver extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.cursors = scene.cursors;
    this.props = {
      controlsActive: true,
    };

    scene.add.existing(this);

    this.diver = scene.add.sprite(0, 0, 'diver');

    this.add(this.diver);

    this.hp = new StatusBar(scene, -20, 10);
    this.oxygen = new StatusBar(scene, -20, 20, 0x11ACFA);

    this.add(this.hp);
    this.add(this.oxygen);

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

    this.timer = scene.time.addEvent({
      delay: 1000,
      callback: () => this.decreaseOxygen(0.5),
      callbackScope: this,
      loop: true,
    });
  }

  decreaseOxygen(amount) {
    if (this.oxygen.decrease(amount)) {
      this.alive = false;

      // this.play(`${this.color}Dead`);
    }
  }

  damage(amount) {
    if (this.hp.decrease(amount)) {
      this.alive = false;
    }
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

  preUpdate() {
    if (this.props.controlsActive) {
      this.updateControls();
    }
  }
}
