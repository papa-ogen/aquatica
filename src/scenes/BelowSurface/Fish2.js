import Phaser from 'phaser';

class Fish extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'fish');

    this.currentSpeed = 0;
    this.targetSpeed = 0;
    this.maxSpeed = 10;

    scene.physics.world.enable(this);

    this.createAnimations();

    this.play('move-fish');
  }

  createAnimations() {
    this.scene.anims.create({
      key: 'move-fish',
      frames: this.scene.anims.generateFrameNumbers('fish', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}

export default Fish;
