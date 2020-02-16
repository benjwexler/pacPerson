
const reducer = (state, action) => {
  if (typeof state === 'undefined') {
    return {x: 0, y: 0}
  }

  switch (action.type) {
    case 'MOVE':
      return action.coords;
    default:
      return state
  }
}

export default reducer;
