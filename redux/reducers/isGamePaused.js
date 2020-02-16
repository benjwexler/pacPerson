

const isGamePaused = (state, action) => {
  if (typeof state === 'undefined') {
    return false;
  }

  switch (action.type) {
    case 'PAUSE GAME':
      return true;
    case 'RESUME GAME':
      return false;
    default:
      return state;
  }
}

export default isGamePaused;
