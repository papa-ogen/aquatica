import Phaser from 'phaser';

const theme = {
  disabled: {
    hover: '#010101',
    active: '#808080',
    inactive: '#999999',
  },
  default: {
    hover: '#ff0',
    active: '#0ff',
    inactive: '#0f0',
  },
};

export default class ButtonPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super('ButtonPlugin', pluginManager);
  }

  create({
    scene, x = 0, y = 0,
    text,
    callback,
    disabled = false,
  }) {
    this._disabled = disabled;
    this.buttonText = scene.add.text(x, y, text, { fill: this.setThemeColor('inactive') })
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
    const fill = this.setThemeColor('hover');
    this.buttonText.setStyle({ fill });
  }

  inactiveState() {
    const fill = this.setThemeColor('inactive');
    this.buttonText.setStyle({ fill });
  }

  activeState() {
    const fill = this.setThemeColor('active');
    this.buttonText.setStyle({ fill });
  }

  set disabled(isDisabled) {
    this._disabled = isDisabled || true;
    const fill = this.setThemeColor('inactive', isDisabled);
    this.buttonText.setStyle({ fill });
  }

  get disabled() {
    return this._disabled;
  }

  setThemeColor(state, isDisabled) {
    if (arguments.length === 2) return isDisabled ? theme.disabled[state] : theme.default[state];
    return this._disabled ? theme.disabled[state] : theme.default[state];
  }
}
