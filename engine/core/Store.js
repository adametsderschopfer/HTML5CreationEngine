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

// function thunk(store) {
//   return (dispatch) => (action) => {
//     if (typeof action === "function") {
//       return action(store.dispatch, store.getState);
//     }
//     return dispatch(action);
//   };
// }

// function applyMiddleware(middleware) {
//   return function createStoreWithMiddleware(createStore) {
//     return (reducer) => {
//       const store = createStore(reducer);
//       return {
//         dispatch: (action) => {
//           return middleware(store)(store.dispatch)(action)
//         },
//         getState: store.getState,
//       };
//     };
//   };
// }

export { createStore, combineReducers };
export default Store;

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const reducer = (state = { is: false }, action) => {
//   switch (action.type) {
//     case "trfs": {
//       return { ...state, is: !state.is };
//     }

//     default: {
//       return state;
//     }
//   }
// };
// const store = createStoreWithMiddleware(reducer);
