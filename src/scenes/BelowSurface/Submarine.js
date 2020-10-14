import Phaser from 'phaser';
import { isClosestDirectionLeft, convertSpriteAngle } from '../../utils';
import { SHIP_STATE } from './constants';

class Submarine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'sub-2');

    const { maxSpeed, acceleration, deceleration } = scene.sceneSettings.ship.speed;
    const course = scene.sceneSettings.startingPlayerCourse;
    this.scene = scene;
    this.cursors = scene.cursors;
    this.cameras = scene.cameras;
    this.sceneSettings = scene.sceneSettings;
    this.currentSpeed = 0;
    this.throttle = 0;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.depth = 1;
    this.angle = course - 90;

    this.targetCourse = course;
    this.currentCourse = course;

    this.currentDepth = scene.sceneSettings.startingPlayerDepth;
    this.targetDepth = scene.sceneSettings.startingPlayerDepth;

    this.props = {
      state: SHIP_STATE.MOVING,
    };

    this.offset = new Phaser.Geom.Point(this.x + 10, this.y + 8);

    scene.physics.world.enable(this);
    scene.add.existing(this);

    // this.setScale(0.5);
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

    this.shadow = this.scene.physics.add.sprite(this.offset.x, this.offset.y, 'sub-2-shadow')
      .setOrigin(0.5);
    this.shadow.alpha = 0.3;
    this.shadow.angle = course - 90;

    this.createAnimations();
    // this.setCollideWorldBounds(true); // TODO: fix

    // this.play('move');

    this.verre = 0;

    this.depthKeys();

    // set velocity on current
    // console.log(scene.sceneSettings.waterCurrentAngle,
    //   scene.sceneSettings.waterCurrentVelocity, this.angle);
  }

  depthKeys() {
    // Accend
    this.scene.input.keyboard.addKey('w')
      .on('down', () => {
        this.targetDepth -= 1;

        if (this.targetDepth <= (this.sceneSettings.startingPlayerDepth - 20)) {
          this.targetDepth = this.sceneSettings.startingPlayerDepth - 20;
        }

        this.scene.events.emit('updateTargetDepth', this.targetDepth);

        // const scale = (this.currentDepth - this.scene.sceneSettings.startingPlayerDepth) / 100;
        // this.setScale(this.scale - scale);
      });

    // Dive
    this.scene.input.keyboard.addKey('s')
      .on('down', () => {
        this.targetDepth += 1;
        if (this.targetDepth >= this.scene.sceneSettings.maxDepth) {
          this.targetDepth = this.scene.sceneSettings.maxDepth;

          // const scale = (this.currentDepth - this.scene.sceneSettings.startingPlayerDepth) / 100;
          // this.setScale(this.scale + scale);
        }
        this.scene.events.emit('updateTargetDepth', this.targetDepth);
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

  // createRt(opacity = 0.9) {
  //   const { width, height } = this.cameras.main;
  //   this.rt = this.scene.add.renderTexture(0, 0, width, height)
  //     .fill(0x023c4f, opacity)
  //     .setDepth(1);
  // }

  // addMask() {
  //   this.spotlight = this.scene.make.sprite({
  //     x: 400,
  //     y: 300,
  //     key: 'mask',
  //     add: false,
  //   })
  //     .setScale(2)
  //     .setAlpha(0.6)
  //     .setDepth(1);

  //   const scaleX = this.cameras.main.width / this.rt.width;
  //   const scaleY = this.cameras.main.height / this.rt.height;
  //   const scale = Math.max(scaleX, scaleY);

  //   this.rt.setScale(scale).setScrollFactor(0);

  //   const mask = this.rt.createBitmapMask(this.spotlight);

  //   mask.invertAlpha = true;

  //   this.rt.setMask(mask);
  // }

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
    if (this.cursors.up.isDown) {
      this.throttle += 1;

      if (this.throttle >= this.maxSpeed) {
        this.throttle = this.maxSpeed;
      }
    }

    if (this.cursors.down.isDown) {
      this.throttle -= 1;

      if (this.throttle <= 0) {
        this.throttle = 0;
      }
    }

    // Set Course
    if (this.cursors.left.isDown && this.currentSpeed > 0) {
      this.targetCourse -= 1;
      if (this.targetCourse < 0) {
        this.targetCourse += 360;
      }
    }

    if (this.cursors.right.isDown && this.currentSpeed > 0) {
      this.targetCourse += 1;

      if (this.targetCourse > 360) {
        this.targetCourse -= 360;
      }
    }

    if (this.currentSpeed > 0) {
      if (this.currentCourse !== this.targetCourse) {
        if (isClosestDirectionLeft(this.targetCourse, this.currentCourse)) {
          this.angle -= 0.1;
          this.currentCourse = convertSpriteAngle(this.angle);
          this.shadow.angle = this.angle;
        } else {
          this.angle += 0.1;
          this.currentCourse = convertSpriteAngle(this.angle);
          this.shadow.angle = this.angle;
        }
      }
    }

    // Set speed
    if (this.currentSpeed < 0) {
      this.currentSpeed = 0;
    } else if (this.currentSpeed > this.throttle) {
      this.currentSpeed -= this.deceleration;
    } else if (this.currentSpeed < this.throttle) {
      this.currentSpeed += this.acceleration;
    }

    // Set Depth
    if (this.targetDepth < this.currentDepth) {
      this.currentDepth -= 0.01;
      this.scene.events.emit('updateCurrentDepth', this.currentDepth);
      const scale = this.shadow.scale - 0.01 / 100;
      this.shadow.setScale(scale);
    } else if (this.targetDepth > this.currentDepth) {
      this.currentDepth += 0.01;
      this.scene.events.emit('updateCurrentDepth', this.currentDepth);
      const scale = this.shadow.scale + 0.01 / 100;
      this.shadow.setScale(scale);
    }

    if (this.verre === 0) {
      this.scene.physics.velocityFromAngle(this.angle, this.currentSpeed, this.body.velocity);
      // this.verre++;
    } else {
      const waterCurrentAngle = 90;
      const waterCurrentVelocity = 50;
      this.scene.physics.velocityFromAngle(waterCurrentAngle, waterCurrentVelocity, this.body.velocity);
      this.verre = 0;
    }

    // console.log('efter', this.body.velocity === res);
    // const { waterCurrentAngle, waterCurrentVelocity } = this.sceneSettings;

    this.scene.physics.velocityFromAngle(this.angle,
      this.currentSpeed, this.shadow.body.velocity);

    // this.spotlight.x = this.x;
    // this.spotlight.y = this.y;

    if (this.currentDepth >= this.scene.sceneSettings.maxDepth) {
      console.error('Boom you dead!');
      this.currentSpeed = 0;
      this.scene.pause();
    }
  }
}

export default Submarine;
