import Phaser from 'phaser';
import {
  ACTIONS, STATES,
} from './constants';

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
        value: STATES.IS_MOVING,
      },
    ];
  }

  init() {
    this.gameScene = this.scene.get('BelowSurface');
  }

  create() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.setupEvents();
    this.displayHeader(width, height);
    this.addGauges(height);

    const buttons = [];
    this.anchorButton = this.plugins.start('ButtonPlugin', 'anchorButton');
    this.engineButton = this.plugins.start('ButtonPlugin', 'engineButton');
    this.deployButton = this.plugins.start('ButtonPlugin', 'deployButton');
    buttons.push(this.anchorButton);
    buttons.push(this.engineButton);
    buttons.push(this.deployButton);

    this.anchorButton.create({
      scene: this,
      x: 10,
      y: 500,
      text: ACTIONS.DROP_ANCHOR,
      callback: () => {
        const { stateMachine: state } = this.gameScene;
        const { hasAnchor } = state.context;

        state.send({ hasAnchor: !hasAnchor });

        const btnText = hasAnchor ? ACTIONS.DROP_ANCHOR : ACTIONS.PULL_ANCHOR;

        this.anchorButton.buttonText.setText(btnText);
      },
    });

    this.engineButton.create({
      scene: this,
      x: 10,
      y: 520,
      text: ACTIONS.ENGINGE_STOP,
      callback: () => {
        const { stateMachine: state } = this.gameScene;
        const { engineRunning } = state.context;

        state.send({ engineRunning: !engineRunning });

        const btnText = engineRunning ? ACTIONS.ENGINGE_START : ACTIONS.ENGINGE_STOP;

        this.engineButton.buttonText.setText(btnText);
      },
    });

    this.deployButton.create({
      scene: this,
      x: 10,
      y: 540,
      text: ACTIONS.DEPLOY_DIVER,
      callback: () => {
        const { stateMachine: state } = this.gameScene;
        const { diverDeployed } = state.context;

        state.send({ diverDeployed: !diverDeployed });

        const btnText = diverDeployed ? ACTIONS.DEPLOY_DIVER : ACTIONS.WITHDRAW_DIVER;

        this.deployButton.buttonText.setText(btnText);

        if (!diverDeployed) {
          this.gameScene.addDiver();
        }
      },
    });
  }

  displayHeader(width, height) {
    this.levelText = this.add.text(0, 0, 'Below Surface', {
      fontFamily: 'roboto', fontSize: '26px', fill: '#fff',
    });

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, 30, width, height),
    );
  }

  addGauges(height) {
    this.compassPlugin.display(100, height - 100);

    this.speedGauge = this.plugins.start('GaugePlugin', 'speedGauge');
    this.speedGauge.display(this, 270, height - 100, 'Speed', 0, 100);

    this.rpmGauge = this.plugins.start('GaugePlugin', 'rpmGauge');
    this.rpmGauge.display(this, 440, height - 100, 'RPM', 0, 6000);

    this.depthGauge = this.plugins.start('GaugePlugin', 'depthGauge');
    this.depthGauge.display(this, 610, height - 100, 'Depth', 0, 100);
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
    const { stateMachine: state } = this.gameScene;

    this.updateText('updateMaxDepth', 'maxDepth', (value) => `-${Math.round(value)}m`);
    this.updateText('updateWaterCurrentAngle', 'waterCurrentAngle', (value) => `${value}°`);
    this.updateText('updateWaterCurrentVelocity', 'waterCurrentVelocity', (value) => `${value}m/s`);
    this.updateText(undefined, 'shipStatus', state.current.name);

    const {
      angle, targetCourse, currentSpeed, throttle, currentDepth,
    } = this.gameScene.sceneSettings.player;
    this.compassPlugin.update(angle, targetCourse);
    this.speedGauge.update(currentSpeed);
    this.depthGauge.update(currentDepth);

    const convertedThrottle = (Math.round(throttle) * 100) / 2;
    this.rpmGauge.update(convertedThrottle);

    // STATES
    if (state.current.name === STATES.IS_MOVING && !this.anchorButton.disabled) {
      this.anchorButton.disabled = true;
    } else if (state.current.name === STATES.IS_STOPPED && this.anchorButton.disabled) {
      this.anchorButton.disabled = false;
    }

    // CONTEXT
    const { hasAnchor, diverDeployed } = state.context;

    if (hasAnchor && !diverDeployed && this.deployButton.disabled) {
      this.deployButton.disabled = false;
    } else if (!hasAnchor && !this.deployButton.disabled) {
      this.deployButton.disabled = true;
    }
  }
}
