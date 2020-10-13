import Phaser from 'phaser';

export default class ButtonPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('ButtonPlugin', pluginManager);
  }

  create(scene, x = 0, y = 0, text) {
    this.buttonText = scene.add.text(x, y, text, { fill: '#0f0' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        console.log('update!!');
      })
      .on('pointerover', () => {
        this.buttonText.setStyle({ fill: '#ff0' });
        console.log('pointerover');
      })
      .on('pointerout', () => {
        this.buttonText.setStyle({ fill: '#0f0' });
      });

    // this.compassContainer = this.scene.add.container(x, y);

    // this.targetCourseText = this.scene.add.text(0, 25, 'TC: 0°', { font: '16px roboto', fill: '#ffffff' })
    //   .setOrigin(0.5);

    // this.currentCourseLabel = this.scene.add.text(0, -35, 'Course', { font: '16px roboto', fill: '#ffffff' })
    //   .setOrigin(0.5);
    // this.currentCourseText = this.scene.add.text(0, -17, '0°', { font: '16px roboto', fill: '#ffffff' })
    //   .setOrigin(0.5);

    // const body = this.scene.add.image(0, 0, 'compass-body');
    // // this.compassArrow = this.scene.add.image(0, 0, 'compass-arrow')
    // //   .setOrigin(0);
    // this.compassPointer = this.scene.add.image(0, 0, 'compass-pointer')
    //   .setOrigin(0.1, 0.5);
    // this.compassPointerWhite = this.scene.add.image(0, 0, 'compass-pointer-white')
    //   .setOrigin(0.1, 0.5);
    // this.compassContainer.add(body);
    // // this.compassContainer.add(this.compassArrow);
    // this.compassContainer.add(this.targetCourseText);
    // this.compassContainer.add(this.currentCourseLabel);
    // this.compassContainer.add(this.currentCourseText);
    // this.compassContainer.add(this.compassPointer);
    // this.compassContainer.add(this.compassPointerWhite);
  }

  pointerOver(callback) {
    if (callback) callback();
  }

  update() {
    // TODO
  }
}
