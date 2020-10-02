import Phaser from 'phaser';

class Submarine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, cursors, ship, cameras) {
    super(scene, x, y, 'sub');

    this.cursors = cursors;
    this.ship = ship;
    this.currentSpeed = 0;
    this.targetSpeed = 0;
    this.maxSpeed = this.ship.speed.maxSpeed;
    this.cameras = cameras;
    this.offset = new Phaser.Geom.Point(10, 8);

    scene.physics.world.enable(this);

    this.setScale(0.5);
    this.setBounce(1, 1);

    const particles = this.scene.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 25,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
    });

    // TODO: offset by Submarine (this) angle (this, x, y)
    emitter.startFollow(this);

    this.cameras.main.startFollow(this);

    // this.shadow = this.physics.add.sprite(90, 440, 'sub-shadow')
    //   .setOrigin(0.5);
    // this.shadow.alpha = 0.3;

    this.addMask();

    this.createAnimations();
    // this.setCollideWorldBounds(true); // TODO: fix

    this.play('move');
  }

  createAnimations() {
    this.scene.anims.create({
      key: 'move',
      frames: this.scene.anims.generateFrameNumbers('sub', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'stop',
      frames: [{ key: 'sub', frame: 0 }],
      frameRate: 10,
    });
  }

  addMask() {
    this.spotlight = this.scene.make.sprite({
      x: 400,
      y: 300,
      key: 'mask',
      add: false,
    })
      .setScale(2);

    // TODO: Fix size to reflect camera or game
    const rt = this.scene.add.renderTexture(0, 0, 2000, 2000);
    rt.fill(0x023c4f, 0.9);

    const scaleX = this.cameras.main.width / rt.width;
    const scaleY = this.cameras.main.height / rt.height;
    const scale = Math.max(scaleX, scaleY);

    rt.setScale(scale).setScrollFactor(0);

    const mask = rt.createBitmapMask(this.spotlight);

    mask.invertAlpha = true;

    rt.setMask(mask);
  }

  update() {
    // if (this.currentSpeed > 0) {
    //   this.anims.play('move');
    // } else {
    //   this.anims.play('stop');
    // }

    if (this.cursors.up.isDown) {
      this.targetSpeed += 1;

      if (this.targetSpeed >= this.ship.speed.maxSpeed) {
        this.targetSpeed = this.ship.speed.maxSpeed;
      }

      this.scene.events.emit('updateTargetSpeed', this.targetSpeed);
    }

    if (this.cursors.down.isDown) {
      this.targetSpeed -= 1;

      if (this.targetSpeed <= 0) {
        this.targetSpeed = 0;
      }

      this.scene.events.emit('updateTargetSpeed', this.targetSpeed);
    }

    if (this.currentSpeed < 0) {
      this.currentSpeed = 0;
    } else if (this.currentSpeed > this.targetSpeed) {
      this.currentSpeed -= this.ship.speed.deceleration;
      this.scene.events.emit('updateCurrentSpeed', this.currentSpeed);
    } else if (this.currentSpeed < this.targetSpeed) {
      this.currentSpeed += this.ship.speed.acceleration;
      this.scene.events.emit('updateCurrentSpeed', this.currentSpeed);
    }

    if (this.cursors.left.isDown && this.currentSpeed > 0) {
      const angle = this.currentSpeed / 100;
      this.angle -= angle;
      // this.shadow.angle -= 0.5;
    }

    if (this.cursors.right.isDown && this.currentSpeed > 0) {
      const angle = this.currentSpeed / 100;
      this.angle += angle;
      // this.shadow.angle += 0.5;
    }

    this.scene.physics.velocityFromAngle(this.angle, this.currentSpeed, this.body.velocity);
    // this.physics.velocityFromAngle(this.shadow.angle,
    // this.playerSpeed, this.shadow.body.velocity);

    this.spotlight.x = this.x;
    this.spotlight.y = this.y;
  }
}

export default Submarine;
