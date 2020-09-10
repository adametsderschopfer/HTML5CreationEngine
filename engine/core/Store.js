/**
 * @module(Store)
 */

class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.state = {};
    this.listeners = [];
    this.dispatch({ type: "__INIT__" });
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe() {
    this.listeners.shift();
  }

  unsubscribeAll() {
    this.listeners = [];
  }

  getState = () => this.state;
}

function createStore(reducer) {
  return new Store(reducer);
}

function combineReducers(reducersMap) {
  return function combinationReducer(state, action) {
    const nextState = {};
    Object.entries(reducersMap).forEach(([key, reducer], ...rest) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
}

export { createStore, combineReducers };
export default Store;
