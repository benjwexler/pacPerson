
import move from './reducers/move.js';
import isGamePaused from './reducers/isGamePaused.js';

const createStore = (reducer) => {
  const {combineReducers, createStore} = Redux;
  const reducers = combineReducers({
    coords: move,
    isGamePaused,
  });
  var store = createStore(reducers)
  return store;
}

export default createStore;
