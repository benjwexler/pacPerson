
const getRotateAmount = (_currentKeycode) => {
    const rotateObj = {
      37: 0,
      38: 90,
      39: 180,
      40: 270,
    }
    return rotateObj[_currentKeycode]
  };

export default getRotateAmount;
