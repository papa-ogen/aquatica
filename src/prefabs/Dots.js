import Phaser from 'phaser';
import Dot from './Dot';

export default class Dots extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      key: 'red',
      active: false,
      visible: false,
      classType: Dot,
    });
  }

  activate(x, y) {
    const dot = this.getFirstDead(false);

    if (dot) {
      dot.activate(x, y);
    }
    return dot;
  }
}
