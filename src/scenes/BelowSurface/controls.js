import * as CONSTANTS from '../../utils/constants';
import { Circle } from '../../ui-kit';

export const speedControls = (ctx, player) => ([
  new Circle({
    ctx,
    text: 'Throttle',
    x: CONSTANTS.CANVAS_WIDTH - CONSTANTS.GRID_SIZE * 2,
    y: CONSTANTS.CANVAS_HEIGHT - (CONSTANTS.GRID_SIZE * 4),
    color: 'green',
    disabled: player.speed.currentSpeed >= player.speed.maxSpeed,
    callback() {
      player.speed.targetSpeed += player.speed.acceleration;

      // if (player.speed.currentSpeed >= player.speed.maxSpeed) {
      //   this.disabled = true;
      //   return;
      // }

      // player.speed.currentSpeed += player.speed.acceleration;
      // this.disabled = false;
    },
  }),
  new Circle({
    ctx,
    text: 'Break',
    x: CONSTANTS.CANVAS_WIDTH - CONSTANTS.GRID_SIZE * 2,
    y: CONSTANTS.CANVAS_HEIGHT - (CONSTANTS.GRID_SIZE * 2),
    color: 'red',
    disabled: player.speed.currentSpeed <= 0,
    callback() {
      player.speed.targetSpeed -= player.speed.deceleration;
      // if (player.speed.currentSpeed <= 0) {
      //   this.disabled = false;
      //   return;
      // }

      // player.speed.currentSpeed -= player.speed.deceleration;
      // this.disabled = false;
    },
  }),
  new Circle({
    ctx,
    text: 'Left',
    x: CONSTANTS.CANVAS_WIDTH - CONSTANTS.GRID_SIZE * 7,
    y: CONSTANTS.CANVAS_HEIGHT - (CONSTANTS.GRID_SIZE * 3),
    color: 'green',
    callback: () => {
      player.position.direction -= 15;
    },
  }),
  new Circle({
    ctx,
    text: 'Right',
    x: CONSTANTS.CANVAS_WIDTH - CONSTANTS.GRID_SIZE * 5,
    y: CONSTANTS.CANVAS_HEIGHT - (CONSTANTS.GRID_SIZE * 3),
    color: 'red',
    callback: () => {
      player.position.direction += 15;
    },
  }),
]);

export const changeScene = (game) => new Circle({
  ctx: game.uiCanvas.ctx,
  text: 'Surface',
  callback: () => {
    const [, surface] = game.scenes;
    game.currentScene = surface;
    game.currentScene.init();
  },
});
