class Singletone {
  constructor() {
    if (Singletone.exists) {
      return Singletone._instance;
    }

    Singletone._instance = this;
    Singletone.exists = true;
  }
}

class AuxiliaryFunctionsForStore extends Singletone {
  constructor() {
    super();

    this.data = { data: Math.floor(Math.random() * 10) };
  }

  static combineReducers(reducersMap) {
    return function combinationReducer(state, action) {
      const nextState = {};
      Object.entries(reducersMap).forEach(([key, reducer]) => {
        nextState[key] = reducer(state[key], action);
      });

      return nextState;
    };
  }
}
