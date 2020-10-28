import Phaser from 'phaser';
import { FONTS } from '../utils/constants';

export default class WaterCurrentPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
    this.x = 0;
    this.y = 0;
    this.container = null;
    this.pointer = null;
    this.wcAngle = 0;
    this.wcVelocity = 0;
  }

  boot() {
    const eventEmitter = this.systems.events;

    eventEmitter.on('update', this.update, this);
  }

  create(x, y) {
    this.container = this.scene.add.container(x, y);

    const body = this.scene.add.image(0, 0, 'gauge-bg-water-current');

    this.currentCourseText = this.scene.add.text(0, 85, '0°', { font: FONTS.SMALL, fill: '#ffffff' })
      .setOrigin(0.5);

    this.velocityText = this.scene.add.text(0, 55, 'Velocity: 0', { font: FONTS.SMALL, fill: '#ffffff' })
      .setOrigin(0.5);

    this.pointer = this.scene.add.image(0, 0, 'gauge-water-current-pointer')
      .setOrigin(0.1, 0.5);

    this.container.add(body);
    this.container.add(this.currentCourseText);
    this.container.add(this.velocityText);
    this.container.add(this.pointer);
  }

  update() {
    if (this.pointer) {
      const angleWithOffset = this.wcAngle - 90;
      this.pointer.angle = angleWithOffset;
      this.currentCourseText.setText(`Course: ${this.wcAngle}°`);
      this.velocityText.setText(`Velocity: ${this.wcVelocity}`);
    }
  }
}
