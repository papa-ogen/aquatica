import Phaser from 'phaser';

export default class CompassPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
    this.scene = scene;
  }

  displayText() {
    this.scene.add.text(100, 100, 'Hej', { font: '16px Courier', fill: '#00ff00' });
  }
}
