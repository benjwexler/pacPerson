import { pacman } from './pacman/pacman.js';
import { ghost } from './ghost.js';
import createStore from './redux/createStore.js';

import subscriber from './redux/subscriber.js';

var reset = (store) => {

  
  pacman(store);
  
}

export default reset;
