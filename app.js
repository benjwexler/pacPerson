import { pacman } from './pacman/pacman.js';
import { ghost } from './ghost.js';
import createStore from './redux/createStore.js';

import subscriber from './redux/subscriber.js';
import test from './redux/test.js';
import reset from './reset.js';

var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};


domReady(function () {
  pacman();
  ghost(1, 'purple');
  ghost(2, 'blue');
  ghost(3, 'green');
  ghost(4, 'pink');
});