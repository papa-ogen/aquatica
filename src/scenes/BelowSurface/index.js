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
  }

  init(config) {
    const { ship } = config;
    this.sceneSettings.ship = ship;

    this.hudScene = this.scene.get('BelowSurfaceHUD');
  }

  create() {
    // const {
    //   width, height, centerX, centerY,
    // } = this.cameras.main;

    this.cameras.main.setBackgroundColor(0xeedf6a);

    this.createMap();
    this.createCursor();
    this.createKeyboardEvents();
    this.createCameraControls();

    this.fishPlugin.create(100);

    this.sceneSettings.player = new Submarine(this, 500, 250);

    this.maskPlugin.create(this.sceneSettings.player);

    this.cameraFollow = this.sceneSettings.player;
    this.cameras.main.startFollow(this.cameraFollow);

    const bigBoss = new BigBoss(this, 100, 100);
    bigBoss.setScale(2);
    // this.setCollisions();
  }

  createMap() {
    this.map = this.make.tilemap({ key: 'level1' });
    this.tiles = this.map.addTilesetImage('desert-tiles');
    // this.backgroundLayer = this.map.createDynamicLayer('background', this.tiles, 0, 0);
    this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);
    this.detailsLayer = this.map.createStaticLayer('details', this.tiles, 0, 0);
    this.obstaclesLayer.setCollisionBetween(0, 200);

    this.bossStartAreas = this.map.findObject('objects', (obj) => obj.name === 'BossSpawnPoint1');
  }

  createCursor() {
    this.cursor = this.add.image(32, 32, 'cursor');
    this.cursor.setScale(0.5);
    this.cursor.setOrigin(0);
    this.cursor.alpha = 0;
  }

  setCollisions() {
    this.physics.add.collider(this.sceneSettings.player, this.obstaclesLayer);
  }

  createCameraControls() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.camera = this.cameras.main;
    // this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

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

    if (!this.sceneSettings.diver) {
      this.sceneSettings.diver = new Diver(this, playerX, playerY, 'diver');
    } else {
      this.sceneSettings.diver.x = playerX;
      this.sceneSettings.diver.y = playerY;
      this.sceneSettings.diver.setActive(true).setVisible(true);
      this.sceneSettings.diver.props.controlsActive = true;
    }

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

  update(time, delta) {
    const { player } = this.sceneSettings;

    this.controls.update(delta);

    if (player.currentDepth >= this.sceneSettings.maxDepth) {
      console.error('Boom you dead!');
      player.currentSpeed = 0;
      this.pause();
    }

    const { stateMachine: state } = this;
    const maxAnchorSpeed = 5;

    if (player.currentSpeed > maxAnchorSpeed && state.current.name !== STATES.IS_MOVING) {
      state.setState(STATES.IS_MOVING);
    } else if (player.currentSpeed <= maxAnchorSpeed && state.current.name !== STATES.IS_STOPPED) {
      state.setState(STATES.IS_STOPPED);
    }
  }
}
