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

const COLORS = {
  JET: { hex: '#353535', rgb: [53, 53, 53] },
  MING: { hex: '#3C6E71', rgb: [60, 110, 113] },
  WHITE: { hex: '#fffff', rgb: [0, 0, 0] },
  BLACK: { hex: '#000000', rgb: [255, 255, 255] },
  GAINSBORO: { hex: '#D9D9D9', rgb: [217, 217, 217] },
  INDIGO_DYE: { hex: '#284B63', rgb: [40, 74, 99] },
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
  COLORS,
};
