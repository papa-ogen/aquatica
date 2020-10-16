import Phaser from 'phaser';

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

    const body = this.scene.add.image(0, 0, 'compass-body');

    this.currentCourseLabel = this.scene.add.text(0, -35, 'Course', { font: '16px roboto', fill: '#ffffff' })
      .setOrigin(0.5);
    this.currentCourseText = this.scene.add.text(0, -17, '0°', { font: '16px roboto', fill: '#ffffff' })
      .setOrigin(0.5);

    this.velocityText = this.scene.add.text(0, 25, 'Velocity: 0', { font: '16px roboto', fill: '#ffffff' })
      .setOrigin(0.5);

    this.pointer = this.scene.add.image(0, 0, 'compass-pointer')
      .setOrigin(0.1, 0.5);

    this.container.add(body);
    this.container.add(this.currentCourseLabel);
    this.container.add(this.currentCourseText);
    this.container.add(this.velocityText);
    this.container.add(this.pointer);
    this.container.setScale(0.5);
  }

  update() {
    if (this.pointer) {
      const angleWithOffset = this.wcAngle - 90;
      this.pointer.angle = angleWithOffset;
      this.currentCourseText.setText(`${this.wcAngle}°`);
      this.velocityText.setText(`Velocity: ${this.wcVelocity}`);
    }
  }
}
