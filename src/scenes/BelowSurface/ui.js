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
      {
        name: 'shipStatus',
        text: 'Ship status',
        value: SHIP_STATE.MOVING,
      },
    ];
  }

  init() {
    this.gameScene = this.scene.get('BelowSurface');
  }

  create() {
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
    this.anchorButton.create({
      scene: this,
      x: 10,
      y: 500,
      text: SHIP_ACTIONS.DROP_ANCHOR,
      callback: () => {
        const {
          props: { state },
        } = this.gameScene.sceneSettings.player;
        if (state === SHIP_STATE.ANCHOR) {
          // set state
          this.gameScene.sceneSettings.player.props.state = SHIP_STATE.MOVING;
          // set screen text
          this.updateText(undefined, 'shipStatus', SHIP_STATE.MOVING);
          // update button text
          this.anchorButton.buttonText.setText(SHIP_ACTIONS.DROP_ANCHOR);
        } else {
          // set state
          this.gameScene.sceneSettings.player.props.state = SHIP_STATE.ANCHOR;
          // set screen text
          this.updateText(undefined, 'shipStatus', SHIP_STATE.ANCHOR);
          // update button text
          this.anchorButton.buttonText.setText(SHIP_ACTIONS.PULL_ANCHOR);
        }
      },
    });
    this.deployButton = this.plugins.start('ButtonPlugin', 'deployButton');
    this.deployButton.create({
      scene: this,
      x: 10,
      y: 520,
      text: SHIP_ACTIONS.DEPLOY_DIVER,
      // disabled: this.gameScene.sceneSettings.player.props.state === SHIP_STATE.MOVING,
      callback: () => {
        const diver = this.gameScene.add.image(150, 150, 'diver');
        this.gameScene.add.image(150, 150, 'diver');
        this.gameScene.cameras.main.startFollow(diver);
      },
    });
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

  updateText(eventName, textKey, textValue) {
    if (eventName) {
      this.gameScene.events.once(eventName, (value) => {
        const obj = this.subData.find((data) => data.name === textKey);
        obj.t.setText(`${obj.text}: ${textValue(value)}`);
      });
    } else {
      const obj = this.subData.find((data) => data.name === textKey);
      obj.t.setText(`${obj.text}: ${textValue}`);
    }
  }

  update() {
    this.updateText('updateMaxDepth', 'maxDepth', (value) => `-${Math.round(value)}m`);
    this.updateText('updateWaterCurrentAngle', 'waterCurrentAngle', (value) => `${value}°`);
    this.updateText('updateWaterCurrentVelocity', 'waterCurrentVelocity', (value) => `${value}m/s`);

    const {
      angle, targetCourse, currentSpeed, throttle, currentDepth,
    } = this.gameScene.sceneSettings.player;
    this.compass.update(angle, targetCourse);
    this.speedGauge.update(currentSpeed);
    this.depthGauge.update(currentDepth);

    const convertedThrottle = (Math.round(throttle) * 100) / 2;
    this.rpmGauge.update(convertedThrottle);

    if (currentSpeed === 0) {
      if (this.anchorButton.disabled) {
        this.anchorButton.disabled = false;
      }
    } else if (currentSpeed > 5) {
      this.anchorButton.disabled = true;
    }
  }
}
