import Phaser from 'phaser';

export default class Dot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'red');

    this.tween = null;
    this.scene = scene;
  }

  activate(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);
    this.tween = this.scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0 },
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      yoyo: false,
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.alpha === 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
