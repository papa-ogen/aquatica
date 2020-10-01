class Submarine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, cursors, ship, cameras) {
    super(scene, x, y, 'sub');

    this.cursors = cursors;
    this.ship = ship;
    this.currentSpeed = 10;
    this.maxSpeed = this.ship.speed.maxSpeed;
    this.cameras = cameras;
    this.offset = new Phaser.Geom.Point(10, 8);

    scene.physics.world.enable(this);

    this.setCollideWorldBounds(true);

    this.setScale(0.5);
    this.setBounce(1, 1);

    const particles = this.scene.add.particles('bubble');

    const emitter = particles.createEmitter({
      speed: 25,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
    });

    emitter.startFollow(this);

    this.cameras.main.startFollow(this);

    // this.shadow = this.physics.add.sprite(90, 440, 'sub-shadow')
    //   .setOrigin(0.5);
    // this.shadow.alpha = 0.3;

    this.addMask();
  }

  addMask() {
    this.spotlight = this.scene.make.sprite({
      x: 400,
      y: 300,
      key: 'mask',
      add: false,
    });

    const rt = this.scene.add.renderTexture(0, 0, 2000, 2000); // TODO: Fix size to reflect camera or game
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
    if (this.cursors.up.isDown) {
      this.anims.play('move');
      this.scene.events.emit('updateSpeed', this.currentSpeed);

      if (this.ship.speed.maxSpeed >= this.currentSpeed) {
        this.currentSpeed += this.ship.speed.acceleration;
      } else {
        this.currentSpeed = this.ship.speed.maxSpeed;
      }
    }

    if (this.cursors.down.isDown) {
      this.scene.events.emit('updateSpeed', this.currentSpeed);
      if (this.currentSpeed <= 0) {
        this.currentSpeed = 0;
        this.anims.play('stop');
      } else {
        this.currentSpeed -= this.ship.speed.deceleration;
      }
    }

    if (this.cursors.left.isDown && this.currentSpeed > 0) {
      this.angle -= 0.5;
      // this.shadow.angle -= 0.5;
    }

    if (this.cursors.right.isDown && this.currentSpeed > 0) {
      this.angle += 0.5;
      // this.shadow.angle += 0.5;
    }

    this.scene.physics.velocityFromAngle(this.angle, this.currentSpeed, this.body.velocity);
    // this.physics.velocityFromAngle(this.shadow.angle, this.playerSpeed, this.shadow.body.velocity);

    this.spotlight.x = this.x;
    this.spotlight.y = this.y;
  }
}

export default Submarine;
