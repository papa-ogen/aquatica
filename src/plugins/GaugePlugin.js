import Phaser from 'phaser';
import { getGaugeInterval } from '../utils';
import { FONTS } from '../utils/constants';

const getGaugeSettings = (type) => {
  switch (type) {
    case 'vu':
      return {
        bg: 'gauge-bg-vu',
        offset: 230,
        defaultAngle: 230,
        interval: 75,
        min: 0,
        max: 100,
        pointer: 'gauge-vu-pointer',
      };
    case 'depth':
      return {
        bg: 'gauge-bg-0-600',
        offset: 120,
        defaultAngle: 130,
        interval: 300,
        min: 0,
        max: 600,
      };
    case 'rpm':
      return {
        bg: 'gauge-bg-0-6',
        offset: 120,
        defaultAngle: 130,
        interval: 300,
        min: 0,
        max: 6,
      };
    case 'speed':
    default:
      return {
        bg: 'gauge-bg-0-60',
        offset: 120,
        defaultAngle: 130,
        interval: 300,
        min: 0,
        max: 60,
      };
  }
};

export default class GaugePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('GaugePlugin', pluginManager);
  }

  create(scene, x, y, text = 'Gauge', gaugeType) {
    const {
      bg, offset, defaultAngle, min, max, interval, pointer,
    } = getGaugeSettings(gaugeType);

    this.offset = offset;
    this.gaugeInterval = getGaugeInterval(min, max, interval);

    this.defaultAngle = defaultAngle; // offset to graphic

    this.container = scene.add.container(x, y);

    if (pointer) {
      console.log(gaugeType);
      this.pointer = scene.add.image(2, 25, pointer);
      this.pointer.setOrigin(0)
        .setAngle(this.defaultAngle);
    } else {
      this.pointer = scene.add.image(0, 0, 'gauge-pointer');
      this.pointer.setOrigin(0.3, 0.5)
        .setAngle(this.defaultAngle);
    }

    const body = scene.add.image(0, 0, bg);

    this.container.add(body);

    if (text) {
      this.text = scene.add.text(0, 28, text, { font: FONTS.EXTRA_SMALL, fill: '#2e5959' })
        .setOrigin(0.5);
      this.container.add(this.text);
    }

    this.container.add(this.pointer);
  }

  update(value) {
    if (value >= 0) {
      this.pointer.angle = this.offset + (value * this.gaugeInterval);
    }
  }
}
