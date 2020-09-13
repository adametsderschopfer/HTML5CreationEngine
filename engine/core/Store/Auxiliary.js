class AuxiliaryFunctionsForStore {
  static combineReducers(reducerMap) {
    return function combinationReducer(state, action) {
      const nextState = {};
      Object.entries(reducersMap).forEach(([key, reducer]) => {
        nextState[key] = reducer(state[key], action);
      });

      return nextState;
    };
  }

  static applyMiddleware(...middlewares) {
    return function createStoreWithMiddlewares(createStore) {
      return (reducer, initialState) => {
        const store = createStore(reducer, initialState);

        return {
          dispatch: (action) => {
            return middlewares.forEach((middleware) => {
              return middleware(store)(store.dispatch)(action);
            });
          },
          this: store,
        };
      };
    };
  }

  thunk = (store) => (dispatch) => (action) => {
    if (typeof action === "function") {
      return action(store.dispatch);
    }

    return dispatch(action);
  };

  middlewares = {
    thunk: this.thunk,
  };
}

export default { AuxiliaryFunctionsForStore };
