
const subscriber = (store) => {
  const logState = () => {
    console.log('STATE', store.getState())
  };

  store.subscribe(logState)
};

export default subscriber;
