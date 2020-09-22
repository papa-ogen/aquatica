const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRID_SIZE = 32;
const VERTICAL_ROWS = CANVAS_HEIGHT / GRID_SIZE;
const HORIZONTAL_ROWS = CANVAS_WIDTH / GRID_SIZE;

const TEXT_ALIGN_LEFT = 'left';
const TEXT_ALIGN_CENTER = 'center';
const TEXT_ALIGN_RIGHT = 'right';

const ACTIONS = {
  BATTLE_STATIONS: 'To Battle Stations!',
  PERISCOPE_DEPTH: 'Periscope depth',
  EMERGENCY_DEPTH: 'Emergency depth',
};

const SHIP_STATE = {
  MOVING: 'moving',
  ANCHOR: 'anchor',
  DIVING: 'diving',
  RESURFACING: 'resurfacing',
};

const SHIP_LEVEL = {
  ABOVE_WATER: 'above-water',
  BELOW_WATER: 'below-water',
};

export {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GRID_SIZE,
  VERTICAL_ROWS,
  HORIZONTAL_ROWS,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_CENTER,
  TEXT_ALIGN_RIGHT,
  ACTIONS,
  SHIP_STATE,
  SHIP_LEVEL,
};
