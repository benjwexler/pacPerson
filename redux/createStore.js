
const createStore = (reducer) => {
  var store = Redux.createStore(reducer)
  return store;
}

export default createStore;
