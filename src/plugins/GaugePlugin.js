import Phaser from 'phaser';
import { getGaugeInterval } from '../utils';
import { FONTS } from '../utils/constants';

export default class GaugePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('GaugePlugin', pluginManager);
  }

  display(scene, x, y, text = 'Gauge', min, max, interval, offset) {
    this.offset = 120;
    this.gaugeInterval = getGaugeInterval(min, max, 300);

    // switch (gaugeType) {
    //   case 'speed':
    //     break;
    //   case 'depth':
    //     break;
    //   case 'rpm':
    //     break;
    //   default:
    // }

    this.defaultAngle = 110; // offset to graphic

    this.container = scene.add.container(x, y);

    this.text = scene.add.text(0, 22, text, { font: FONTS.NORMAL, fill: '#2e5959' })
      .setOrigin(0.5);

    this.pointer = scene.add.image(0, 0, 'compass-pointer')
      .setOrigin(0.1, 0.5)
      .setAngle(this.defaultAngle);

    const body = scene.add.image(0, 0, 'gauge-bg');

    this.container.add(body);
    this.container.add(this.text);
    this.container.add(this.pointer);
  }

  update(value) {
    if (value >= 0) {
      this.pointer.angle = this.offset + (value * this.gaugeInterval);
    }
  }
}
