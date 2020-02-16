import reset from "../reset.js";
import update from "../board/update.js";
import getCircleRadius from "../board/getCircleRadius.js";
import { numRows, numCols } from '../board/variables.js';
import createRectData from '../data/createRectData.js';
import createBorderHorizontal from '../data/createBorderHorizontal.js';
import createBorderVertical from '../data/createBorderVertical.js';
const subscriber = (store) => {
  const { dispatch, getState } = store;
  const logState = () => {
    console.log('STATE', store.getState())
  };

  const checkIfCollision = () => {
    const state = store.getState();
    if (state.isGamePaused) {
      return 
    }
    const { pacman, ghost1, ghost2, ghost3, ghost4 } = store.getState().coords;
    
    const hasCollision = [ghost1, ghost2, ghost3, ghost4].some(ghost => {
      
      if (!ghost || !pacman ) {
        return false
      }
      if (ghost.x === pacman.x && ghost.y === pacman.y) {
        return true;
      }
    })
    if (hasCollision) {
      dispatch({
        type: 'PAUSE GAME',
      })

      // dispatch({
      //   type: 'MOVE',
      //   actor: 'pacman',
      //   coords: {
      //       x: 0,
      //       y: 0,
      //   }
      // })
    }
  }

  const subscribers = [checkIfCollision];
  subscribers.forEach(subscription => {
    store.subscribe(subscription)
  })
};

export default subscriber;
