
const movePacman = (state, action) => {
  if (typeof state === 'undefined') {
    return {pacman: {x: 0, y: 0}};
  }

  switch (action.type) {
    case 'MOVE':
      const newState = {...state};
      newState[action.actor] = action.coords
      return newState;
    default:
      return state
  }
}

export default movePacman;
