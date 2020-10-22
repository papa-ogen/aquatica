import Phaser from 'phaser';
import Dots from '../prefabs/Dots';
import { isOnLine, getVectorFromAngle } from '../utils';

const normalizeVectors = (vector) => {
  const min = 0;
  const max = 1024;
  const range = [-64, 64];
  const variation = (range[1] - range[0]) / (max - min);

  const normalizedEnemyX = (range[0] + ((vector.x - min) * variation)).toFixed(2);
  const normalizedEnemyY = (range[0] + ((vector.y - min) * variation)).toFixed(2);
  return [Math.round(normalizedEnemyX), Math.round(normalizedEnemyY)];
};

// const distance = (a, b) => Math.hypot(a, b);

// export const isOnLine = (a, b, c) => a + b === c;

export default class RadarPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
    this.enemies = this.scene.enemies;
    this.player = null;
    this.dots = null;
    this.radarMaxLimit = 400;
  }

  create(x, y, enemies, player) {
    this.addSounds();

    this.dots = new Dots(this.scene);
    this.enemies = enemies;
    this.player = player;

    this.container = this.scene.add.container(x, y);

    this.pointer = this.scene.add.image(0, 0, 'radar-pointer')
      .setOrigin(0, 1)
      .setAngle(-90);

    const body = this.scene.add.image(0, 0, 'radar-body');

    this.container.add(body);
    this.container.add(this.pointer);

    // const blip = this.scene.add.image(33, -55, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(0, 60, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(33, 33, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(33, 33, 'radar-dot');
    // this.container.add(blip);
    // blip = this.scene.add.image(-33, 64, 'radar-dot');
    // this.container.add(blip);

    // console.log(this.pointer.x, this.pointer.y, this.pointer.angle);
    // const targetX = this.pointer.x + (this.pointer.width * Math.cos(this.pointer.angle));
    // const targetY = this.pointer.y + (this.pointer.width * Math.sin(this.pointer.angle));
    // console.log(targetX, targetY, this.pointer.width);

    this.searchEnemies();
  }

  boot() {
    const eventEmitter = this.systems.events;

    eventEmitter.on('update', this.update, this);
  }

  searchEnemies() {
    const {
      angle, width, x, y,
    } = this.pointer;
    const enemies = this.enemies.getChildren();
    const fixedAngle = Math.round(angle);
    const [targetX, targetY] = getVectorFromAngle({
      x, y, angle, length: width,
    });

    const [playerX, playerY] = normalizeVectors(this.player);

    if (angle >= 90 && angle <= 91) {
    // if (isOnLine({ x: 0, y: 0 }, { x: targetX, y: targetY }, { x: playerX, y: playerY })) {
      // this.blipSound.play(this.soundConfig);
      const dot = this.dots.activate(playerX, playerY);
      this.container.add(dot);
    }

    // const blip = this.scene.add.image(playerX, playerY, 'radar-dot');
    // this.container.add(blip);
    // // const blip2 = this.scene.add.image(0, 0, 'radar-dot');
    // // this.container.add(blip2);

    // console.log(playerX, playerY);
    // console.log(isOnLine({ x: 0, y: 0 }, { x: targetX, y: targetY }, { x: playerX, y: playerY }));
    // // console.log(targetX, targetY, blip.x, blip.y);
    // // console.log(targetX, targetY, blip2.x, blip2.y);
    // // console.log(isOnLine({ x: 0, y: 0 }, { x: targetX, y: targetY }, { x: blip.x, y: blip.y }));

    // // enemies.forEach((enemy) => {
    // //   const [enemyX, enemyY] = normalizeVectors(enemy);
    // //   if (isOnLine({ x: 0, y: 0 }, { x: targetX, y: targetY }, { x: enemyX, y: enemyY })) {
    // //     this.blipSound.play(this.soundConfig);
    // //     const dot = this.dots.activate(enemyX, enemyY);
    // //     this.container.add(dot);
    // //   }
    // // });
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
      this.pointer.rotation += 0.02;
    }

    if (this.pointer && this.enemies) {
      this.searchEnemies();
    }
  }
}
