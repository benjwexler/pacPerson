import { pacman } from './circleInSquare2.js';
import { ghost } from './ghost.js';

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