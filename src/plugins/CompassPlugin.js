import Phaser from 'phaser';
import { convertSpriteAngle } from '../utils';

export default class CompassPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);
    this.x = 0;
    this.y = 0;
    this.compassContainer = null;
    this.compassArrow = null;
  }

  display(x = 0, y = 0) {
    this.compassContainer = this.scene.add.container(x, y);

    this.targetCourseText = this.scene.add.text(0, 25, 'TC: 0°', { font: '16px roboto', fill: '#ffffff' })
      .setOrigin(0.5);

    this.currentCourseLabel = this.scene.add.text(0, -35, 'Course', { font: '16px roboto', fill: '#ffffff' })
      .setOrigin(0.5);
    this.currentCourseText = this.scene.add.text(0, -17, '0°', { font: '16px roboto', fill: '#ffffff' })
      .setOrigin(0.5);

    const body = this.scene.add.image(0, 0, 'compass-body');
    // this.compassArrow = this.scene.add.image(0, 0, 'compass-arrow')
    //   .setOrigin(0);
    this.compassPointer = this.scene.add.image(0, 0, 'compass-pointer')
      .setOrigin(0.1, 0.5);
    this.compassPointerWhite = this.scene.add.image(0, 0, 'compass-pointer-white')
      .setOrigin(0.1, 0.5);
    this.compassContainer.add(body);
    // this.compassContainer.add(this.compassArrow);
    this.compassContainer.add(this.targetCourseText);
    this.compassContainer.add(this.currentCourseLabel);
    this.compassContainer.add(this.currentCourseText);
    this.compassContainer.add(this.compassPointer);
    this.compassContainer.add(this.compassPointerWhite);
  }

  update(playerAngle, targetCourse) {
    const targetCourseWithOffset = targetCourse - 90;
    this.compassPointer.angle = targetCourseWithOffset;
    this.compassPointerWhite.angle = playerAngle;
    this.targetCourseText.setText(`TC: ${targetCourse}°`);
    this.currentCourseText.setText(`${Math.round(convertSpriteAngle(playerAngle))}°`);
  }
}
