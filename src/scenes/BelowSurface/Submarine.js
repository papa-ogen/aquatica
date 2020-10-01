class Submarine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, cursors, ship) {
    super(scene, x, y, 'sub');

    this.cursors = cursors;
    this.ship = ship;
    this.currentSpeed = 0;
    this.maxSpeed = this.ship.speed.maxSpeed;

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

    // this.shadow = this.physics.add.sprite(90, 440, 'sub-shadow')
    //   .setOrigin(0.5);
    // this.shadow.alpha = 0.3;
  }

  update() {
    if (this.cursors.up.isDown) {
      console.log('sub');
      // this.player.anims.play('move');
      this.scene.events.emit('updateSpeed', this.currentSpeed);

      if (this.ship.speed.maxSpeed >= this.currentSpeed) {
        this.currentSpeed += this.ship.speed.acceleration;
      } else {
        this.currentSpeed = this.ship.speed.maxSpeed;
      }
    }
  }
}

export default Submarine;
