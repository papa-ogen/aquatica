import Phaser from 'phaser';
import Dots from '../prefabs/Dots';
// import { normalizeVectors, } from '../utils';

const normalizeVectors = (vector) => {
  const min = 0;
  const max = 1024;
  const range = [-64, 64];
  const variation = (range[1] - range[0]) / (max - min);

  const normalizedEnemyX = (range[0] + ((vector.x - min) * variation)).toFixed(2);
  const normalizedEnemyY = (range[0] + ((vector.y - min) * variation)).toFixed(2);
  return [normalizedEnemyX, normalizedEnemyY];
};

const distance = (a, b) => Math.hypot(a, b);

export const isOnLine = (a, b, c) => a + b === c;

export default class RadarPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
    this.enemies = this.scene.enemies;
    this.dots = null;
    this.radarMaxLimit = 400;
  }

  create(x, y, enemies) {
    this.addSounds();

    this.dots = new Dots(this.scene);
    this.enemies = enemies;

    this.container = this.scene.add.container(x, y);

    this.pointer = this.scene.add.image(0, 0, 'radar-pointer')
      .setOrigin(0, 1)
      .setAngle(-90);

    const body = this.scene.add.image(0, 0, 'radar-body');

    this.container.add(body);
    this.container.add(this.pointer);

    // const blip = this.scene.add.image(normalizedEnemyX, normalizedEnemyY, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(0, 60, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(33, 33, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(33, 33, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(-33, 64, 'radar-dot');
    // this.container.add(blip);

    console.log(this.pointer.x, this.pointer.y, this.pointer.angle);
    const targetX = this.pointer.x + (this.pointer.width * Math.cos(this.pointer.angle));
    const targetY = this.pointer.y + (this.pointer.width * Math.sin(this.pointer.angle));
    console.log(targetX, targetY, this.pointer.width);
  }

  boot() {
    const eventEmitter = this.systems.events;

    eventEmitter.on('update', this.update, this);
  }

  searchEnemies() {
    const {
      angle, width, x, y,
    } = this.pointer;
    const radarRadius = width * 2;
    const origin = { x: 0, y: 0 };
    const enemies = this.enemies.getChildren();
    const targetX = x + (width * Math.cos(angle));
    const targetY = y + (width * Math.sin(angle));

    // console.log(angle, targetX, targetY);
    enemies.forEach((enemy) => {
      const [enemyX, enemyY] = normalizeVectors(enemy);
      const distanceAb = distance(origin.x - targetX, origin.y - targetY);
      const distanceBc = distance(targetX - enemyX, targetY - enemyY);
      const distanceAc = distance(origin.x - enemyX, origin.y - enemyY);

      if (isOnLine(distanceAb, distanceBc, distanceAc)) {
        console.log('hit');

        this.blipSound.play(this.soundConfig);
        const dot = this.dots.activate(enemyX, enemyY);
        this.container.add(dot);
      }
    });
  }

  addSounds() {
    this.blipSound = this.scene.sound.add('blip');
    this.soundConfig = {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
  }

  update() {
    if (this.pointer) {
      this.pointer.rotation += 0.01;
    }

    if (this.pointer && this.enemies) { this.searchEnemies(); }
  }
}
