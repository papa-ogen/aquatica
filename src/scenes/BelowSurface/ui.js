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
      {
        name: 'engingeDb',
        text: 'Enginge Decibel',
        value: 0,
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
    this.addPanel(width, height);

    const buttons = [];
    this.engineButton = this.plugins.start('ButtonPlugin', 'engineButton');
    this.anchorButton = this.plugins.start('ButtonPlugin', 'anchorButton');
    this.deployButton = this.plugins.start('ButtonPlugin', 'deployButton');
    buttons.push(this.engineButton);
    buttons.push(this.anchorButton);
    buttons.push(this.deployButton);

    this.engineButton.create(engineButtonObject(this, width, height - 47));

    this.anchorButton.create(anchorButtonObject(this, width, height - 47));

    this.deployButton.create(deployButtonObject(this, width, height - 47));

    this.waterCurrentPlugin.create(width - 75, 55);
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

  addPanel(width, height) {
    const centerX = width / 2;
    const bottomMargin = height - 94;
    const gaugesBottomMargin = height - 60;

    const panel = this.add.tileSprite(0, height - 88, 615, 88, 'panel-bg');
    panel.setOrigin(0);

    const panel2 = this.add.tileSprite(616, height - 88, 615, 88, 'panel-bg');
    panel2.setOrigin(0);

    this.radarPlugin.create(centerX, bottomMargin,
      this.gameScene.enemies, this.gameScene.sceneSettings.player);

    const gaugeOffset = centerX + 150;

    this.speedGauge = this.plugins.start('GaugePlugin', 'speedGauge');
    this.rpmGauge = this.plugins.start('GaugePlugin', 'rpmGauge');
    this.depthGauge = this.plugins.start('GaugePlugin', 'depthGauge');
    this.vuGauge = this.plugins.start('GaugePlugin', 'vuGauge');

    this.speedGauge.create(this, gaugeOffset, gaugesBottomMargin, 'Km/h', 'speed');
    this.rpmGauge.create(this, gaugeOffset + 120, gaugesBottomMargin, 'RPM', 'rpm');
    this.depthGauge.create(this, gaugeOffset + 240, gaugesBottomMargin, 'Depth', 'depth');
    this.vuGauge.create(this, centerX - 150, gaugesBottomMargin, 'VU', 'vu');
    // this.compassPlugin.display(610, height - 250);
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
    this.updateText(undefined, 'engingeDb', state.context.engineDecibel);

    const {
      angle, targetCourse, currentSpeed, throttle, currentDepth,
    } = this.gameScene.sceneSettings.player;
    // this.compassPlugin.update(angle, targetCourse);
    this.speedGauge.update(currentSpeed);
    this.depthGauge.update(currentDepth);

    this.rpmGauge.update(throttle);

    this.vuGauge.update(state.context.engineDecibel);

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
