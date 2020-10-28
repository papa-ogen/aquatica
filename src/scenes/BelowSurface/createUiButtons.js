import {
  ACTIONS,
} from './constants';

export const anchorButtonObject = (_this, width, height) => ({
  isSwitch: true,
  scene: _this,
  x: 200,
  y: height,
  text: ACTIONS.DROP_ANCHOR,
  callback: () => {
    const { stateMachine: state } = _this.gameScene;
    const { hasAnchor } = state.context;

    state.send({ hasAnchor: !hasAnchor });

    const btnTexture = hasAnchor ? 'switch' : 'switch-on';

    _this.anchorButton.button.setTexture(btnTexture);
  },
});

export const engineButtonObject = (_this, width, height) => ({
  scene: _this,
  x: 45,
  y: height,
  text: ACTIONS.ENGINGE_STOP,
  callback: () => {
    const { stateMachine: state } = _this.gameScene;
    const { engineRunning } = state.context;

    state.send({ engineRunning: !engineRunning });

    const btnTexture = engineRunning ? 'engine-button' : 'engine-button-on';

    _this.engineButton.button.setTexture(btnTexture);
  },
});

export const deployButtonObject = (_this, width, height) => ({
  isSwitch: true,
  scene: _this,
  x: 120,
  y: height,
  text: ACTIONS.DEPLOY_DIVER,
  callback: () => {
    const { stateMachine: state } = _this.gameScene;
    const { diverDeployed } = state.context;

    state.send({ diverDeployed: !diverDeployed });

    const btnTexture = diverDeployed ? 'switch' : 'switch-on';

    _this.deployButton.button.setTexture(btnTexture);

    if (!diverDeployed) {
      _this.gameScene.addDiver();
    } else {
      _this.gameScene.hideDiver();
    }
  },
});
