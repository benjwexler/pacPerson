const test = (store) => {
  const { dispatch, subscribe, getState } = store;
document.body
  .addEventListener('click', function () {
    dispatch({ type: 'PAUSE GAME' })
  })

}

export default test;