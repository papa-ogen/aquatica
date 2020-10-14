import Phaser from 'phaser';

export default class MaskPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
  }

  createRt(opacity = 0.9) {
    const { width, height } = this.scene.cameras.main;
    this.rt = this.scene.add.renderTexture(0, 0, width, height)
      .fill(0x023c4f, opacity)
      .setDepth(1);
  }

  addMask() {
    this.createRt();

    this.spotlight = this.scene.make.sprite({
      x: 400,
      y: 300,
      key: 'mask',
      add: false,
    })
      .setScale(2)
      .setAlpha(0.6)
      .setDepth(1);

    const scaleX = this.scene.cameras.main.width / this.rt.width;
    const scaleY = this.scene.cameras.main.height / this.rt.height;
    const scale = Math.max(scaleX, scaleY);

    this.rt.setScale(scale).setScrollFactor(0);

    const mask = this.rt.createBitmapMask(this.spotlight);

    mask.invertAlpha = true;

    this.rt.setMask(mask);
  }

  update(target) {
    this.spotlight.x = target.x;
    this.spotlight.y = target.y;
  }
}
