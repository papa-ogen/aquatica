import Phaser from 'phaser';
import StatusBar from './StatusBar';

const DIRECTIONS = {
  TOP: 0, RIGHT: 90, DOWN: 180, LEFT: -90,
};

export default class Diver extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;
    this.velocity = 50;
    this.cursors = scene.cursors;
    this.props = {
      controlsActive: false,
    };

    this.setSize(32, 32);

    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);

    this.sprite = scene.add.image(0, 0, 'diver');

    this.add(this.sprite);

    this.setActive(false).setVisible(false);

    this.hp = new StatusBar(scene, -20, 10);
    this.oxygen = new StatusBar(scene, -20, 20, 0x11ACFA);

    this.add(this.hp);
    this.add(this.oxygen);

    const particles = this.scene.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 0.1,
      scale: { start: 0.1, end: 0 },
      blendMode: 'ADD',
    });

    emitter.startFollow(this);

    this.props = { direction: DIRECTIONS.TOP };
  }

  activate(x = undefined, y = undefined) {
    if (x && y) {
      this.x = x;
      this.y = y;
    }

    this.setActive(true).setVisible(true);
    this.props.controlsActive = true;
    this.oxygen.reset();

    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => this.decreaseOxygen(0.5),
      callbackScope: this,
      loop: true,
    });
  }

  deActivate() {
    this.setActive(false).setVisible(false);
    this.props.controlsActive = false;
  }

  decreaseOxygen(amount) {
    if (this.oxygen.decrease(amount)) {
      this.alive = false;
    }
  }

  damage(amount) {
    if (this.hp.decrease(amount)) {
      this.alive = false;
    }
  }

  updateControls() {
    const {
      TOP, RIGHT, DOWN, LEFT,
    } = DIRECTIONS;
    const prevDirection = this.props.direction;

    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
      this.body.setVelocityX(0);
      this.props.direction = TOP;
    }

    if (this.cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
      this.body.setVelocityX(0);
      this.props.direction = DOWN;
    }

    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
      this.body.setVelocityY(0);
      this.props.direction = LEFT;
    }

    if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
      this.body.setVelocityY(0);
      this.props.direction = RIGHT;
    }

    if (this.cursors.up.isUp
      && this.cursors.down.isUp
      && this.cursors.left.isUp
      && this.cursors.right.isUp) {
      this.body.setVelocity(0);
    }

    if (prevDirection !== this.props.direction) {
      this.scene.add.tween({
        targets: this.sprite,
        duration: 500,
        angle: { value: this.props.direction, duration: 500, ease: 'Power1' },
      });
    }
  }

  preUpdate() {
    if (this.props.controlsActive) {
      this.updateControls();
    }
  }
}
