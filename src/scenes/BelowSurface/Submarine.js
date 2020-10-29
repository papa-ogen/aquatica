import Phaser from 'phaser';
import { isClosestDirectionLeft, convertSpriteAngle } from '../../utils';
import StatusBar from './StatusBar';

class Submarine extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

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
      controlsActive: true,
      hp: new StatusBar(scene, -20, 10),
      throttleDisabled: false,
      engingeDb: 0,
    };

    this.offset = new Phaser.Geom.Point(this.x + 10, this.y + 8);

    this.setSize(64, 64);

    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(1, 1);

    this.sprite = scene.add.image(0, 0, 'sub-2');
    this.add(this.sprite);

    const particles = this.scene.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 25,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
    });

    // TODO: offset by Submarine (this) angle (this, x, y)
    emitter.startFollow(this.sprite);

    this.shadow = this.scene.physics.add.sprite(this.offset.x, this.offset.y, 'sub-2-shadow')
      .setOrigin(0.5);
    this.shadow.alpha = 0.3;
    this.shadow.angle = course - 90;

    this.add(this.shadow);

    this.createAnimations();
    // this.setCollideWorldBounds(true); // TODO: fix

    // this.play('move');

    this.verre = 0;

    // set velocity on current
    // console.log(scene.sceneSettings.waterCurrentAngle,
    //   scene.sceneSettings.waterCurrentVelocity, this.angle);
  }

  activate() {
    this.props.controlsActive = true;
  }

  deActivate() {
    this.props.controlsActive = false;
  }

  damage(amount) {
    if (this.props.hp.decrease(amount)) {
      this.alive = false;
    }
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

  updateControls() {
    // Set Throttle
    const { throttleDisabled } = this.props;
    if (this.cursors.up.isDown && !throttleDisabled) {
      this.throttle += 1;

      if (this.throttle >= this.maxSpeed) {
        this.throttle = this.maxSpeed;
      }
    }

    if (this.cursors.down.isDown && !throttleDisabled) {
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
  }

  preUpdate() {
    // super.preUpdate(time, delta);

    if (this.props.controlsActive) {
      this.updateControls();
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

    if (this.verre === 0) {
      this.scene.physics.velocityFromAngle(this.angle, this.currentSpeed, this.body.velocity);
      // this.verre++;
    } else {
      const waterCurrentAngle = 90;
      const waterCurrentVelocity = 50;
      this.scene.physics.velocityFromAngle(waterCurrentAngle, waterCurrentVelocity,
        this.body.velocity);
      this.verre = 0;
    }

    // console.log('efter', this.body.velocity === res);
    // const { waterCurrentAngle, waterCurrentVelocity } = this.sceneSettings;

    this.scene.physics.velocityFromAngle(this.angle,
      this.currentSpeed, this.shadow.body.velocity);
  }
}

export default Submarine;
