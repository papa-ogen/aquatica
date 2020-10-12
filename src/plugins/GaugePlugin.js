import Phaser from 'phaser';

export default class GaugePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('GaugePlugin', pluginManager);

    this.syllables1 = ['fro', 'tir', 'nag', 'bli', 'mon', 'zip'];
    this.syllables2 = ['fay', 'shi', 'zag', 'blarg', 'rash', 'izen'];

    this.current = this.syllables1;
  }

  display(scene, x, y, text = 'Gauge', min, max) {
    this.defaultAngle = 110; // offset to graphic
    // TODO: normalize values
    this.container = scene.add.container(x, y);

    this.text = scene.add.text(0, 25, text, { font: '16px roboto', fill: '#2e5959' })
      .setOrigin(0.5);

    this.pointer = scene.add.image(0, 0, 'compass-pointer')
      .setOrigin(0.1, 0.5)
      .setAngle(this.defaultAngle);

    const body = scene.add.image(0, 0, 'gauge-bg');

    this.container.add(body);
    this.container.add(this.text);
    this.container.add(this.pointer);
  }

  update() {
    this.angle += 1;
  }
}
