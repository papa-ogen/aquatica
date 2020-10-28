import Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  preload() {
    this.createPreloader();
    this.loadAssets();
  }

  createPreloader() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    // add logo image
    const logo = this.add.image(width / 2, height / 2 - 110, 'logo');
    logo.setScale(0.1);

    // display progress bar
    const progressBar = this.add.graphics();
    const progresBox = this.add.graphics();
    progresBox.fillStyle(0x222222, 0.8);
    progresBox.fillRect(width / 2 - 160, height / 2 + 30, 320, 50);

    // loading text
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 16,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    // percent text
    const percenText = this.make.text({
      x: width / 2,
      y: height / 2 + 56,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percenText.setOrigin(0.5, 0.5);

    // loading assets text
    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percenText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 40, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progresBox.destroy();
      progressBar.destroy();
      assetText.destroy();
      loadingText.destroy();
      percenText.destroy();
    });
  }

  create() {
    const shipData = this.cache.json.get('shipData');

    this.scene.start('Main', {
      shipData,
    });
  }

  loadAssets() {
    this.load.json('shipData', 'src/data/ships.json');

    this.load.tilemapTiledJSON('level1', 'src/data/1.json');

    // this.load.setPath('assets/');
    this.load.image('gauge-bg-water-current', 'src/assets/images/gauge-bg-water-current.png');
    this.load.image('gauge-bg-vu', 'src/assets/images/gauge-bg-vu.png');
    this.load.image('gauge-bg-0-6', 'src/assets/images/gauge-bg-0-6.png');
    this.load.image('gauge-bg-0-60', 'src/assets/images/gauge-bg-0-60.png');
    this.load.image('gauge-bg-0-600', 'src/assets/images/gauge-bg-0-600.png');
    this.load.image('gauge-pointer', 'src/assets/images/gauge-pointer.png');
    this.load.image('gauge-vu-pointer', 'src/assets/images/gauge-vu-pointer.png');
    this.load.image('gauge-water-current-pointer', 'src/assets/images/gauge-water-current-pointer.png');
    this.load.image('radar-bg', 'src/assets/images/radar-bg.png');
    this.load.image('panel-bg', 'src/assets/images/panel-bg.png');

    this.load.image('radar-dot', 'src/assets/images/radar-dot.png');
    this.load.image('radar-pointer', 'src/assets/images/radar-pointer.png');
    this.load.image('radar-body', 'src/assets/images/radar-body.png');

    this.load.image('engine-button', 'src/assets/images/engine-button.png');
    this.load.image('engine-button-on', 'src/assets/images/engine-button-on.png');
    this.load.image('switch', 'src/assets/images/switch.png');
    this.load.image('switch-on', 'src/assets/images/switch-on.png');

    this.load.image('diver', 'src/assets/images/diver.png');
    this.load.image('manta', 'src/assets/images/manta.png');
    this.load.image('sub-2', 'src/assets/images/sub-2.png');
    this.load.image('sub-2-shadow', 'src/assets/images/sub-2-shadow.png');
    this.load.image('shark-bg', 'src/assets/images/shark-bg.jpg');
    this.load.image('desert-tiles', ['src/assets/sprites/desert-tiles.png', 'src/assets/sprites/desert-tiles_n.png']);
    this.load.image('red', 'src/assets/images/red.png');
    this.load.image('bubble', 'src/assets/images/bubble.png');
    this.load.image('sub-shadow', 'src/assets/images/sub-shadow.png');
    this.load.image('mask', 'src/assets/images/mask.png');
    this.load.image('cursor', 'src/assets/images/cursor.png');
    this.load.spritesheet('sub',
      ['src/assets/sprites/sub-sprite.png', 'src/assets/sprites/sub-sprite_n.png'],
      { frameWidth: 210, frameHeight: 132 });
    this.load.spritesheet('fish',
      'src/assets/sprites/fish-sprite.png',
      { frameWidth: 32, frameHeight: 32, endFrame: 18 });

    // FX
    this.load.audio('ambient', 'src/assets/sounds/ambient.mp3');
    this.load.audio('blip', 'src/assets/sounds/blip.mp3');
    this.load.audio('engine', 'src/assets/sounds/engine.mp3');
    this.load.audio('engine-start', 'src/assets/sounds/engine-start.mp3');
    this.load.audio('explosion-underwater', 'src/assets/sounds/explosion-underwater-distant.mp3');

    // Music
    this.load.audio('music', 'src/assets/music/music_dave_miles_shades_of_orange.mp3');
  }
}

export default LoadingScene;
