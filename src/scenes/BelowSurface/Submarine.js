import Phaser from 'phaser';

class Submarine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'sub');

    const { maxSpeed, acceleration, deceleration } = scene.sceneSettings.ship.speed;
    this.cursors = scene.cursors;
    this.cameras = scene.cameras;
    this.currentSpeed = 0;
    this.throttle = 30;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.depth = 1;

    this.targetCourse = this.angle;
    this.currentCourse = this.angle;

    this.currentDepth = scene.sceneSettings.startingPlayerDepth;

    this.offset = new Phaser.Geom.Point(10, 8);

    scene.physics.world.enable(this);
    scene.add.existing(this);

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

    this.createRt();
    this.addMask();

    this.createAnimations();
    // this.setCollideWorldBounds(true); // TODO: fix

    this.play('move');

    this.verre = 0;

    this.depthKeys();
  }

  depthKeys() {
    // Accend
    this.scene.input.keyboard.addKey('w')
      .on('down', () => {
        this.currentDepth -= 1;
        this.scene.events.emit('updateCurrentDepth', this.currentDepth);

        const scale = (this.currentDepth - this.scene.sceneSettings.startingPlayerDepth) / 100;
        this.setScale(this.scale - scale);
      });

    // Dive
    this.scene.input.keyboard.addKey('s')
      .on('down', () => {
        this.currentDepth += 1;

        if (this.currentDepth <= this.scene.sceneSettings.maxDepth) {
          this.scene.events.emit('updateCurrentDepth', this.currentDepth);

          const scale = (this.currentDepth - this.scene.sceneSettings.startingPlayerDepth) / 100;
          this.setScale(this.scale + scale);
        }
      });
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

  createRt(opacity = 0.9) {
    const { width, height } = this.cameras.main;
    this.rt = this.scene.add.renderTexture(0, 0, width, height)
      .fill(0x023c4f, opacity)
      .setDepth(1);
  }

  addMask() {
    this.spotlight = this.scene.make.sprite({
      x: 400,
      y: 300,
      key: 'mask',
      add: false,
    })
      .setScale(2)
      .setAlpha(0.6)
      .setDepth(1);

    const scaleX = this.cameras.main.width / this.rt.width;
    const scaleY = this.cameras.main.height / this.rt.height;
    const scale = Math.max(scaleX, scaleY);

    this.rt.setScale(scale).setScrollFactor(0);

    const mask = this.rt.createBitmapMask(this.spotlight);

    mask.invertAlpha = true;

    this.rt.setMask(mask);
  }

  duskTillDawn(time) {
    if (this.verre === 12) {
      const opacity = (Math.sin(time / 100000) + 1) / 2;
      this.rt.destroy();

      this.createRt(opacity);
      this.addMask();

      this.verre = 0;
    }
    this.verre += 1;
  }

  update() {
    // if (this.currentSpeed > 0) {
    //   this.anims.play('move');
    // } else {
    //   this.anims.play('stop');
    // }

    if (this.cursors.up.isDown) {
      this.throttle += 1;

      if (this.throttle >= this.maxSpeed) {
        this.throttle = this.maxSpeed;
      }

      this.scene.events.emit('updateThrottle', this.throttle);
    }

    if (this.cursors.down.isDown) {
      this.throttle -= 1;

      if (this.throttle <= 0) {
        this.throttle = 0;
      }

      this.scene.events.emit('updateThrottle', this.throttle);
    }

    if (this.cursors.left.isDown && this.currentSpeed > 0) {
      // const angle = this.currentSpeed / 100;
      this.targetCourse -= 1;
      this.scene.events.emit('updateTargetCourse', this.targetCourse);
      // this.shadow.angle -= 0.5;
    }

    if (this.cursors.right.isDown && this.currentSpeed > 0) {
      // const angle = this.currentSpeed / 100;
      this.targetCourse += 1;
      this.scene.events.emit('updateTargetCourse', this.targetCourse);
      // this.shadow.angle += 0.5;
    }

    // Set speed
    if (this.currentSpeed < 0) {
      this.currentSpeed = 0;
    } else if (this.currentSpeed > this.throttle) {
      this.currentSpeed -= this.deceleration;
      this.scene.events.emit('updateCurrentSpeed', this.currentSpeed);
    } else if (this.currentSpeed < this.throttle) {
      this.currentSpeed += this.acceleration;
      this.scene.events.emit('updateCurrentSpeed', this.currentSpeed);
    }

    // Set Course
    if (this.currentCourse !== this.targetCourse) {
      if (this.currentCourse <= this.targetCourse) {
        this.angle += 0.1;
        this.currentCourse = this.angle;
        this.scene.events.emit('updateCurrentCourse', this.currentCourse);
      } else if (this.currentCourse >= this.targetCourse) {
        this.angle -= 0.1;
        this.currentCourse = this.angle;
        this.scene.events.emit('updateCurrentCourse', this.currentCourse);
      }
    }

    this.scene.physics.velocityFromAngle(this.angle, this.currentSpeed, this.body.velocity);
    // this.physics.velocityFromAngle(this.shadow.angle,
    // this.playerSpeed, this.shadow.body.velocity);

    this.spotlight.x = this.x;
    this.spotlight.y = this.y;

    if (this.currentDepth >= this.scene.sceneSettings.maxDepth) {
      console.error('Boom you dead!');
      this.currentSpeed = 0;
      this.scene.pause();
    }
  }
}

export default Submarine;
