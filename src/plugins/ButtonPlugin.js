import Phaser from 'phaser';
import { FONTS } from '../utils/constants';

export default class ButtonPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('ButtonPlugin', pluginManager);
  }

  create({
    scene, x = 0, y = 0,
    callback,
    disabled = false,
    isSwitch = false,
    text,
  }) {
    this._disabled = disabled;
    this.textureOn = !isSwitch ? 'engine-button-on' : 'switch-on';
    this.textureOff = !isSwitch ? 'engine-button' : 'switch';

    this.button = scene.add.image(x, y, this.textureOff)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.hoverState())
      .on('pointerout', () => this.inactiveState())
      .on('pointerdown', () => this.activeState())
      .on('pointerup', () => {
        this.hoverState();
        if (callback && !this._disabled) callback();
      });

    if (text) {
      this.buttonText = scene.add.text(x, y + 35, text, { font: FONTS.EXTRA_SMALL, fill: '#ffffff', align: 'center' }).setOrigin(0.5);
    }
  }

  hoverState() {
  }

  inactiveState() {
  }

  activeState() {
    // this.button.setTexture('engine-button-on');
  }

  set disabled(isDisabled) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.button.setTint(0x808080);
    } else {
      this.button.clearTint();
    }
  }

  get disabled() {
    return this._disabled;
  }
}
