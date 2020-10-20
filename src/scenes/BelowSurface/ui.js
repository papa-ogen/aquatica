import Phaser from 'phaser';
import {
  STATES,
} from './constants';
import {
  anchorButtonObject,
  engineButtonObject,
  deployButtonObject,
} from './createUiButtons';

export default class BelowSurfaceHUD extends Phaser.Scene {
  constructor() {
    super('BelowSurfaceHUD');

    this.subData = [
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

    this.anchorButton.create(anchorButtonObject(this));

    this.engineButton.create(engineButtonObject(this));

    this.deployButton.create(deployButtonObject(this));

    this.waterCurrentPlugin.create(75, height - 200);
    this.waterCurrentPlugin.wcAngle = this.gameScene.sceneSettings.waterCurrentAngle;
    this.waterCurrentPlugin.wcVelocity = this.gameScene.sceneSettings.waterCurrentVelocity;
  }

  displayHeader(width, height) {
    this.levelText = this.add.text(0, 0, 'Below Surface', {
      fontFamily: 'Black Ops One', fontSize: '26px', fill: '#fff',
    });

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, 30, width, height),
    );
  }

  addGauges(height) {
    this.radarPlugin.create(100, height - 100, this.gameScene.enemies);

    this.speedGauge = this.plugins.start('GaugePlugin', 'speedGauge');
    this.speedGauge.display(this, 270, height - 100, 'Speed', 0, 100);

    this.rpmGauge = this.plugins.start('GaugePlugin', 'rpmGauge');
    this.rpmGauge.display(this, 440, height - 100, 'RPM', 0, 6000);

    this.depthGauge = this.plugins.start('GaugePlugin', 'depthGauge');
    this.depthGauge.display(this, 610, height - 100, 'Depth', 0, 100);
    this.compassPlugin.display(610, height - 250);
  }

  setupEvents() {
    const margin = 20;
    this.subData = this.subData.map((data, i) => ({
      ...data,
      t: this.add.text(10, 20 + (i * margin), `${data.text}: ${data.value}`, {
        fontFamily: 'Arvo', fontSize: '16px', fill: '#fff',
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
    } else if (hasAnchor && diverDeployed && !this.anchorButton.disabled) {
      this.anchorButton.disabled = true;
    }

    if (this.gameScene.player) {
      if (hasAnchor && this.gameScene.player.props.controlsActive) {
        this.gameScene.player.props.controlsActive = false;
      } else if (!hasAnchor && !this.gameScene.player.props.controlsActive) {
        this.gameScene.player.props.controlsActive = true;
      }
    }
  }
}
