import Phaser from 'phaser';
import BigBoss from './BigBoss';
import Diver from './Diver';
import Submarine from './Submarine';
import StateMachine from '../../prefabs/StateMachine';
import { stateChart, STATES } from './constants';

export default class BelowSurface extends Phaser.Scene {
  constructor() {
    super('BelowSurface');
    this.stateMachine = new StateMachine(stateChart);
    this.cursors = null;
    this.sceneSettings = {
      player: null,
      ship: null,
      diver: null,
      defaultDepthSet: false,
      startingPlayerDepth: 80,
      startingPlayerCourse: 33,
      maxDepth: 100, // TODO: Should come from map meta data
      waterTemp: 4,
      waterCurrentAngle: 77,
      waterCurrentVelocity: 1,
    };
    this.cameraFollow = null;
    this.bossStartAreas = [];
    this.enemies = [];
  }

  init(config) {
    const { ship } = config;
    this.sceneSettings.ship = ship;

    this.hudScene = this.scene.get('BelowSurfaceHUD');
  }

  create() {
    const { engineDecibel } = this.sceneSettings.ship;

    this.stateMachine.send({ engineDecibel });

    this.cameras.main.setBackgroundColor(0x000000);

    this.createMap();
    this.createCursor();
    this.createKeyboardEvents();
    this.createCameraControls();
    this.addSounds();

    // this.musicSound.play({ ...this.soundConfig, volume: 0.2, mute: true });
    // this.ambientSound.play(this.soundConfig);
    // this.engineSound.play({ ...this.soundConfig, volume: 1 });

    this.fishPlugin.create(100);

    this.sceneSettings.player = new Submarine(this, 400, 250);

    this.maskPlugin.create(this.sceneSettings.player);

    this.cameraFollow = this.sceneSettings.player;
    this.cameras.main.startFollow(this.cameraFollow);

    this.placeBosses();

    this.enemies = this.physics.add.group();
    this.enemies.add(this.bigBoss);

    this.setCollisions();
  }

  placeBosses() {
    const startingAreaIndex = Phaser.Math.Between(0, this.bossStartAreas.length - 1);
    const startingArea = this.bossStartAreas[startingAreaIndex];

    const x = Phaser.Math.Between(startingArea.x, startingArea.x + startingArea.width);
    const y = Phaser.Math.Between(startingArea.y, startingArea.y + startingArea.height);
    this.bigBoss = new BigBoss(this, x, y);

    this.bigBoss.setScale(2);
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'level1' });
    this.tiles = this.map.addTilesetImage('desert-tiles');
    this.backgroundLayer = this.map.createDynamicLayer('background', this.tiles, 0, 0);
    this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);
    this.detailsLayer = this.map.createStaticLayer('details', this.tiles, 0, 0);
    this.triviumLayer = this.map.createDynamicLayer('trivium', this.tiles, 0, 0);

    this.obstaclesLayer.setCollisionBetween(0, 200);
    this.triviumLayer.setCollisionBetween(0, 200);

    this.bossStartArea1 = this.map.findObject('BossSpawnPoints', (obj) => obj.name === 'BossSpawnPoint1');
    this.bossStartArea2 = this.map.findObject('BossSpawnPoints', (obj) => obj.name === 'BossSpawnPoint2');
    this.bossStartArea3 = this.map.findObject('BossSpawnPoints', (obj) => obj.name === 'BossSpawnPoint3');

    this.bossStartAreas.push(this.bossStartArea1);
    this.bossStartAreas.push(this.bossStartArea2);
    this.bossStartAreas.push(this.bossStartArea3);
  }

  createCursor() {
    this.cursor = this.add.image(32, 32, 'cursor');
    this.cursor.setScale(0.5);
    this.cursor.setOrigin(0);
    // this.cursor.alpha = 0;
  }

  setCollisions() {
    this.physics.add.collider(this.sceneSettings.player, this.obstaclesLayer, () => {
      console.log('bump');
    });
    this.physics.add.collider(this.sceneSettings.diver, this.triviumLayer, () => {
      console.log('gör nåt');
    });

    this.sceneSettings.player.setCollideWorldBounds(true);

    this.physics.world.on('collide', () => {
      console.log('collide');
    });
    this.physics.world.on('overlap', () => {
      console.log('overlap');
    });

    this.physics.world.on('worldbounds', () => {
      console.log('world');
    });
  }

  createCameraControls() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera = this.cameras.main;

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: this.camera,
      zoomIn: this.input.keyboard.addKey('q'),
      zoomOut: this.input.keyboard.addKey('e'),
    });
  }

  createKeyboardEvents() {
    const EscKey = this.input.keyboard.addKey('Esc');
    EscKey.on('down', () => {
      // stop boat
    });

    const SpaceKey = this.input.keyboard.addKey('Space');
    SpaceKey.on('down', () => {
      this.scene.pause();
      this.hudScene.scene.pause();
      this.scene.launch('GameOptions');
    });

    // const GKey = this.input.keyboard.addKey('g');
    // GKey.on('down', () => {
    //   const fish = new Fish(this, this.sceneSettings.player.x,
    // this.sceneSettings.player.y, 'fish');
    //   this.add.existing(fish);
    //   this.fishes.add(fish);
    // });
  }

  addDiver() {
    const { x: playerX, y: playerY } = this.sceneSettings.player;

    this.sceneSettings.diver.activate(playerX, playerY);

    this.sceneSettings.player.props.controlsActive = false;
    this.cameras.main.startFollow(this.sceneSettings.diver);
    this.cameraFollow = this.sceneSettings.diver;
    this.maskPlugin.target = this.sceneSettings.diver;
  }

  hideDiver() {
    this.sceneSettings.diver.setActive(false).setVisible(false);
    // Todo: make sprite a container or group - group.killAndHide(sprite);
    this.cameras.main.startFollow(this.sceneSettings.player);
    this.cameraFollow = this.sceneSettings.player;
    this.sceneSettings.diver.props.controlsActive = false;
    this.sceneSettings.player.props.controlsActive = true;
    this.maskPlugin.target = this.sceneSettings.player;
  }

  addSounds() {
    this.ambientSound = this.sound.add('ambient');
    this.engineSound = this.sound.add('engine');
    this.musicSound = this.sound.add('music');
    this.soundConfig = {
      mute: false,
      volume: 2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
  }

  update(time, delta) {
    const { player, player: { throttle, props: { throttleDisabled } } } = this.sceneSettings;

    this.controls.update(delta);

    if (player.currentDepth >= this.sceneSettings.maxDepth) {
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once('camerafadeoutcomplete', () => {
        this.sceneSettings.player.destroy();
        this.scene.restart();
      });
      console.error('Boom you dead!');
      player.currentSpeed = 0;
      // this.pause();
    }

    const { stateMachine: state } = this;
    const maxAnchorSpeed = 5;

    if (!state.context.engineRunning) {
      if (!throttleDisabled) {
        this.sceneSettings.player.props.throttleDisabled = true;
        this.engineSound.pause();
        state.send({ engineDecibel: 0 });
      }
      if (throttle > 0) {
        this.sceneSettings.player.throttle -= 1;
      }
    } else if (state.context.engineRunning) {
      if (throttleDisabled) {
        this.sceneSettings.player.props.throttleDisabled = false;
        this.engineSound.resume();
        const { engineDecibel } = this.sceneSettings.ship;

        state.send({ engineDecibel });
      }
    }

    if (player.currentSpeed > maxAnchorSpeed && state.current.name !== STATES.IS_MOVING) {
      state.setState(STATES.IS_MOVING);
    } else if (player.currentSpeed <= maxAnchorSpeed && state.current.name !== STATES.IS_STOPPED) {
      state.setState(STATES.IS_STOPPED);
    }
  }
}
