import Phaser from 'phaser';
import Stats from 'stats.js';
import Boot from './scenes/Boot';
import Preload from './scenes/Loading';
import Main from './scenes/Main';
import GameOptions from './scenes/GameOptions';
import BelowSurface from './scenes/BelowSurface';
import BelowSurfaceHUD from './scenes/BelowSurface/ui';
import Test from './scenes/Test';

// Plugins
import CompassPlugin from './plugins/CompassPlugin';
import GaugePlugin from './plugins/GaugePlugin';
import ButtonPlugin from './plugins/ButtonPlugin';
import FishPlugin from './plugins/FishPlugin';
import MaskPlugin from './plugins/MaskPlugin';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      renderer: Phaser.WEBGL_MULTI,
      enableDebug: process.env.NODE_ENV === 'development',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: { debug: false },
      },
      plugins: {
        global:
          [
            { key: 'GaugePlugin', plugin: GaugePlugin },
            { key: 'ButtonPlugin', plugin: ButtonPlugin },
          ],
        scene: [
          // { key: 'Test', plugin: CompassPlugin, mapping: 'compass' },
          { key: 'CompassPlugin', plugin: CompassPlugin, mapping: 'compassPlugin' },
          { key: 'FishPlugin', plugin: FishPlugin, mapping: 'fishPlugin' },
          { key: 'MaskPlugin', plugin: MaskPlugin, mapping: 'maskPlugin' },
        ],
      },
    });

    this.scene.add('Boot', Boot, false);
    this.scene.add('Loading', Preload, false);
    this.scene.add('Main', Main, false);
    this.scene.add('BelowSurface', BelowSurface, false);
    this.scene.add('BelowSurfaceHUD', BelowSurfaceHUD, false);
    this.scene.add('GameOptions', GameOptions, false);
    this.scene.add('Test', Test, false);

    this.scene.start('Boot');

    // Handle debug mode.
    if (process.env.NODE_ENV === 'development') {
      this.setupStats();
    }

    // Expose the game on the window if in dev/test.
    if (process.env.NODE_ENV !== 'production') {
      window.game = this;
    }
  }

  /**
   * Display the FPS and MS using Stats.js.
   */
  setupStats() {
    // Setup the new stats panel.
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // Monkey-patch the update loop so we can track the timing.
    const updateLoop = this.update;
    this.update = (...args) => {
      stats.begin();
      updateLoop.apply(this, args);
      stats.end();
    };
  }
}

new Game();
