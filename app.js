import { pacman } from './pacman/pacman.js';
import { ghost } from './ghost.js';
import createStore from './redux/createStore.js';
import reducer from './redux/reducer.js';
import subscriber from './redux/subscriber.js';

var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};


domReady(function () {
  
  const store = createStore(reducer);
  // subscriber(store)
  pacman(store);
  ghost(1, 'purple', store);
  ghost(2, 'blue', store);
  ghost(3, 'green', store);
  ghost(4, 'pink', store);

});