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

  static applyMiddleware(...middleware) {
    return function createStoreWithMiddlewares(createStore) {
      return (reducer, initialState) => {
        
      }
    } 
  }
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


export default { AuxiliaryFunctionsForStore }