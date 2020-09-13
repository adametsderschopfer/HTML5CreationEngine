/**
 * @module(Store)
 */

import Dispatcher from "./Dispatcher";

class Store extends Dispatcher {
  constructor(reducer = () => ({}), initialState = {}) {
    super();
    this.reducer = reducer;
    this.state = initialState || {};
    this.listeners = [];

    this.dispatch({ type: "__INIT__" });
  }

  getState = () => this.state;
}

function createStore(reducer, initialState) {
  return new Store(reducer, initialState);
}

const { combineReducers } = Store;

export { combineReducers, createStore };
