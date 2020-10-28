import Phaser from 'phaser';

export default class ButtonPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('ButtonPlugin', pluginManager);
  }

  create({
    scene, x = 0, y = 0,
    callback,
    disabled = false,
  }) {
    this._disabled = disabled;
    this.button = scene.add.image(x, y, 'engine-button-on')
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.hoverState())
      .on('pointerout', () => this.inactiveState())
      .on('pointerdown', () => this.activeState())
      .on('pointerup', () => {
        this.hoverState();
        if (callback && !this._disabled) callback();
      });
  }

  hoverState() {
  }

  inactiveState() {
  }

  activeState() {
    this.button.setTexture('engine-button-on');
  }

  set disabled(isDisabled) {
    this._disabled = isDisabled;
  }

  get disabled() {
    return this._disabled;
  }
}
