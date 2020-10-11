import Phaser from 'phaser';

export default class GaugePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('GaugePlugin', pluginManager);

    this.syllables1 = ['fro', 'tir', 'nag', 'bli', 'mon', 'zip'];
    this.syllables2 = ['fay', 'shi', 'zag', 'blarg', 'rash', 'izen'];

    this.current = this.syllables1;
  }

  display(scene, x, y) {
    this.container = scene.add.container(x, y);

    this.text = scene.add.text(0, 25, 'Speed', { font: '16px roboto', fill: '#ffffff' })
      .setOrigin(0.5);

    this.container.add(this.text);
  }
}
