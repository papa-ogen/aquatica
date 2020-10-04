import Phaser from 'phaser';

export default class Test extends Phaser.Scene {
  constructor() {
    super('Test');
  }

  create() {
    this.lights.enable();
    this.lights.setAmbientColor(0x555555);

    this.add.sprite(400, 300, 'sub').setPipeline('Light2D');

    const light = this.lights.addLight(400, 300, 200);

    this.input.on('pointermove', (pointer) => {
      light.x = pointer.x;
      light.y = pointer.y;
    });
  }
}
