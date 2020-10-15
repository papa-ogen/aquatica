export const SHIP_ACTIONS = {
  BATTLE_STATIONS: 'To Battle Stations!',
  PERISCOPE_DEPTH: 'Periscope depth',
  EMERGENCY_DEPTH: 'Emergency depth',
  TURN_OFF_ENGINE: 'Turn off Engine',
  TURN_ON_ENGINE: 'Turn on Engine',
  DROP_ANCHOR: 'Drop Anchor',
  PULL_ANCHOR: 'Pull Anchor',
  DEPLOY_DIVER: 'Deploy Diver',
  WITHDRAW_DIVER: 'Withdraw Diver',
};

export const SHIP_STATE = {
  MOVING: 'moving',
  ANCHOR: 'anchor',
  // DIVING: 'diving',
  // RESURFACING: 'resurfacing',
};

export const SHIP_LEVEL = {
  ABOVE_WATER: 'above-water',
  BELOW_WATER: 'below-water',
};

export const ACTIONS = {
  SHOOT: 'shoot',
  DEPLOY_DIVER: 'deployDiver',
  WITHDRAW_DIVER: 'withdrawDiver',
  STOP: 'stop',
  START: 'start',
  ENGINGE_START: 'engineStart',
  ENGINGE_STOP: 'engineStop',
  DROP_ANCHOR: 'dropAnchor',
  PULL_ANCHOR: 'pullAnchor',
};

export const STATES = {
  IS_MOVING: 'isMoving',
  IS_STOPPED: 'isStopped',
};

export const stateChart = {
  inital: STATES.IS_MOVING,
  context: {
    engineRunning: true,
    hasAnchor: false,
    diverDeployed: false,
  },
  states: {
    [STATES.IS_MOVING]: {
      actions: [ACTIONS.SHOOT, ACTIONS.STOP, ACTIONS.ENGINGE_START, ACTIONS.ENGINGE_STOP],
    },
    [STATES.IS_STOPPED]: {
      actions: [ACTIONS.SHOOT, ACTIONS.ENGINGE_START, ACTIONS.ENGINGE_STOP, ACTIONS.DROP_ANCHOR, ACTIONS.DEPLOY_DIVER, `.${ACTIONS.PULL_ANCHOR}`],
    },
  },
};
