import Phaser from 'phaser';

export default class BelowSurfaceHUD extends Phaser.Scene {
  constructor() {
    super('BelowSurfaceHUD');

    this.subData = [
      {
        name: 'currentSpeed',
        text: 'Current Speed',
        value: 0,
      },
      {
        name: 'throttle',
        text: 'RPM',
        value: 0,
      },
      {
        name: 'maxDepth',
        text: 'Max Depth',
        value: 0,
      },
      {
        name: 'currentDepth',
        text: 'Current Depth',
        value: 0,
      },
      {
        name: 'targetDepth',
        text: 'Target Depth',
        value: 0,
      },
      {
        name: 'targetCourse',
        text: 'Target Course',
        value: 0,
      },
      {
        name: 'currentCourse',
        text: 'Current Course',
        value: 0,
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
    this.gameScene.events.once('updateCurrentSpeed', (currentSpeed) => {
      const obj = this.subData.find((data) => data.name === 'currentSpeed');
      obj.t.setText(`${obj.text}: ${Math.round(currentSpeed)}`);
    });

    this.gameScene.events.once('updateThrottle', (throttle) => {
      const obj = this.subData.find((data) => data.name === 'throttle');
      obj.t.setText(`${obj.text}: ${Math.round(throttle) * 100 / 2}`);
    });

    this.gameScene.events.once('updateMaxDepth', (maxDepth) => {
      const obj = this.subData.find((data) => data.name === 'maxDepth');
      obj.t.setText(`${obj.text}: -${Math.round(maxDepth)}`);
    });
    this.gameScene.events.once('updateCurrentDepth', (currentDepth) => {
      const obj = this.subData.find((data) => data.name === 'currentDepth');
      obj.t.setText(`${obj.text}: -${Math.round(currentDepth)}`);
    });
    this.gameScene.events.once('updateCurrentCourse', (currentCourse) => {
      const obj = this.subData.find((data) => data.name === 'currentCourse');
      obj.t.setText(`${obj.text}: ${Math.round(currentCourse)}`);
    });
    this.gameScene.events.once('updateTargetCourse', (targetCourse) => {
      const obj = this.subData.find((data) => data.name === 'targetCourse');
      obj.t.setText(`${obj.text}: ${Math.round(targetCourse)}`);
    });
  }
}
