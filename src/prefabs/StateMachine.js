export default class StateMachine {
  constructor(stateChart) {
    this.stateChart = stateChart;
    this.current = null;
    this.setState(stateChart.inital);
  }

  setState(state) {
    const newState = state.startsWith('.') ? state.substring(1) : state;
    let stateChartStates = this.stateChart.states;
    if (this.current && this.current.states && state.startsWith('.')) {
      stateChartStates = this.current.states;
    }
    try {
      const name = Object.keys(stateChartStates).find((key) => key === newState);

      if (name === undefined) throw new Error('unknown state');

      this.current = {
        name,
        ...stateChartStates[name],
      };
    } catch (e) { console.error(e); } // eslint-disable-line
  }

  getState() {
    return this.current;
  }

  send(data) {
    const { context } = this.stateChart;
    this.stateChart.context = { ...context, ...data };
  }

  get context() {
    return this.stateChart.context;
  }
}
