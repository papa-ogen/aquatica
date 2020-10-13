import Phaser from 'phaser';
import { SHIP_ACTIONS, SHIP_STATE } from './constants';

export default class BelowSurfaceHUD extends Phaser.Scene {
  constructor() {
    super('BelowSurfaceHUD');

    this.subData = [
      {
        name: 'maxDepth',
        text: 'Max Depth',
        value: 0,
      },
      {
        name: 'targetDepth',
        text: 'Target Depth',
        value: 0,
      },
      {
        name: 'waterCurrentAngle',
        text: 'Water Current Angle',
        value: 0,
      },
      {
        name: 'waterCurrentVelocity',
        text: 'Water Current Velocity',
        value: 0,
      },
    ];
  }

  init() {
    this.gameScene = this.scene.get('BelowSurface');
  }

  create() {
    const {
      props: { state },
    } = this.gameScene.sceneSettings.player;
    this.setupEvents();

    this.levelText = this.add.text(0, 0, 'Below Surface', {
      fontFamily: 'roboto', fontSize: '26px', fill: '#fff',
    });

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, 30, width, height),
    );
    // Loading plugin
    this.compass.display(100, height - 100);

    this.speedGauge = this.plugins.start('GaugePlugin', 'speedGauge');
    this.speedGauge.display(this, 270, height - 100, 'Speed', 0, 100);

    this.rpmGauge = this.plugins.start('GaugePlugin', 'rpmGauge');
    this.rpmGauge.display(this, 440, height - 100, 'RPM', 0, 6000);

    this.depthGauge = this.plugins.start('GaugePlugin', 'depthGauge');
    this.depthGauge.display(this, 610, height - 100, 'Depth', 0, 100);

    this.anchorButton = this.plugins.start('ButtonPlugin', 'anchorButton');
    this.anchorButton.create(this, 10, 500, SHIP_ACTIONS.LAY_ANCHOR, { fill: '#0f0' });
    // .setInteractive({ useHandCursor: true })
    // .on('pointerdown', () => {
    //   console.log('update!!', state, SHIP_STATE.ANCHOR);
    // })
    // .on('pointerover', () => {
    //   this.anchorButton.setStyle({ fill: '#ff0' });
    //   console.log('pointerover');
    // })
    // .on('pointerout', () => {
    //   this.anchorButton.setStyle({ fill: '#0f0' });
    // });
  }

  setupEvents() {
    const margin = 20;
    this.subData = this.subData.map((data, i) => ({
      ...data,
      t: this.add.text(10, 120 + (i * margin), `${data.text}: ${data.value}`, {
        fontFamily: 'roboto', fontSize: '16px', fill: '#fff',
      }),
    }));
  }

  update() {
    this.gameScene.events.once('updateMaxDepth', (maxDepth) => {
      const obj = this.subData.find((data) => data.name === 'maxDepth');
      obj.t.setText(`${obj.text}: -${Math.round(maxDepth)}m`);
    });
    this.gameScene.events.once('updateWaterCurrentAngle', (waterCurrentAngle) => {
      const obj = this.subData.find((data) => data.name === 'waterCurrentAngle');
      obj.t.setText(`${obj.text}: ${waterCurrentAngle}°`);
    });
    this.gameScene.events.once('updateWaterCurrentVelocity', (waaterCurrentVelocity) => {
      const obj = this.subData.find((data) => data.name === 'waterCurrentVelocity');
      obj.t.setText(`${obj.text}: ${waaterCurrentVelocity}m/s`);
    });

    const {
      angle, targetCourse, currentSpeed, throttle, currentDepth,
    } = this.gameScene.sceneSettings.player;
    this.compass.update(angle, targetCourse);
    this.speedGauge.update(currentSpeed);
    this.depthGauge.update(currentDepth);

    const convertedThrottle = (Math.round(throttle) * 100) / 2;
    this.rpmGauge.update(convertedThrottle);

    // if (currentSpeed === 0) {
    //   this.anchorButton.setStyle({ fill: '#0f0' });
    // } else if (currentSpeed > 0) {
    //   this.anchorButton.setStyle({ fill: '#FF0000' });
    // }
  }
}
