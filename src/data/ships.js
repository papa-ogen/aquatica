import * as CONSTANTS from '../utils/constants';

export default [
  {
    type: 'simple class',
    cost: 10,
    layout: [
      {
        id: 'main',
        name: 'Command Center',
        x: 0,
        y: 0,
        width: CONSTANTS.GRID_SIZE * 6,
        height: CONSTANTS.GRID_SIZE * 12,
      },
      {
        id: 'right',
        name: 'Right Wing',
        x: CONSTANTS.GRID_SIZE * 6,
        y: 0,
        width: CONSTANTS.GRID_SIZE * 3,
        height: CONSTANTS.GRID_SIZE * 6,
      },
      {
        id: 'left',
        name: 'Left Wing',
        x: -CONSTANTS.GRID_SIZE * 3,
        y: 0,
        width: CONSTANTS.GRID_SIZE * 3,
        height: CONSTANTS.GRID_SIZE * 6,
      },
      {
        id: 'torpedos',
        name: 'Torpedos',
        x: 0,
        y: -CONSTANTS.GRID_SIZE * 7,
        width: CONSTANTS.GRID_SIZE * 2,
        height: CONSTANTS.GRID_SIZE * 2,
      },
    ],
  },
];
