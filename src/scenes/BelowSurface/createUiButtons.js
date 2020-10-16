import {
  ACTIONS,
} from './constants';

export const anchorButtonObject = (_this) => ({
  scene: _this,
  x: 10,
  y: 500,
  text: ACTIONS.DROP_ANCHOR,
  callback: () => {
    const { stateMachine: state } = _this.gameScene;
    const { hasAnchor } = state.context;

    state.send({ hasAnchor: !hasAnchor });

    const btnText = hasAnchor ? ACTIONS.DROP_ANCHOR : ACTIONS.PULL_ANCHOR;

    _this.anchorButton.buttonText.setText(btnText);
  },
});

export const engineButtonObject = (_this) => ({
  scene: _this,
  x: 10,
  y: 520,
  text: ACTIONS.ENGINGE_STOP,
  callback: () => {
    const { stateMachine: state } = _this.gameScene;
    const { engineRunning } = state.context;

    state.send({ engineRunning: !engineRunning });

    const btnText = engineRunning ? ACTIONS.ENGINGE_START : ACTIONS.ENGINGE_STOP;

    _this.engineButton.buttonText.setText(btnText);
  },
});

export const deployButtonObject = (_this) => ({
  scene: _this,
  x: 10,
  y: 540,
  text: ACTIONS.DEPLOY_DIVER,
  callback: () => {
    const { stateMachine: state } = _this.gameScene;
    const { diverDeployed } = state.context;

    state.send({ diverDeployed: !diverDeployed });

    const btnText = diverDeployed ? ACTIONS.DEPLOY_DIVER : ACTIONS.WITHDRAW_DIVER;

    _this.deployButton.buttonText.setText(btnText);

    if (!diverDeployed) {
      _this.gameScene.addDiver();
    } else {
      _this.gameScene.hideDiver();
    }
  },
});
