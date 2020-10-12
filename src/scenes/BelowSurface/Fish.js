import Phaser from 'phaser';
// TODO: Fish plugin https://phaser.io/examples/v3/view/plugins/custom-game-object ?
class Fish extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'fish');

    this.currentSpeed = Phaser.Math.Between(20, 50);
    this.targetSpeed = 0;
    this.maxSpeed = 10;
    this.distance = 0;
    this.moveInterval = Phaser.Math.Between(50, 200);

    scene.physics.world.enable(this);

    const count = Phaser.Math.Between(0, 5);
    const angle = Phaser.Math.Angle.RandomDegrees();

    this.angle = angle;

    const scale = Phaser.Math.Between(0.1, 1);
    this.setScale(scale);

    this.play(`move-fish-${count}`);
  }

  update() {
    this.scene.physics.velocityFromAngle(this.angle, this.currentSpeed, this.body.velocity);
    this.distance += 1;

    if (this.distance === this.moveInterval) {
      this.currentSpeed = Phaser.Math.Between(this.currentSpeed - 10, this.currentSpeed + 10);

      const angle = Phaser.Math.Angle.RandomDegrees();

      this.scene.tweens.add({
        targets: this,
        angle,
        duration: 1000,
        ease: 'Sine.easeInOut',
      });

      this.distance = 0;
    }
  }
}

export default Fish;
