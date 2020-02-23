
const getRotateAmount = (_currentKeycode) => {
    const rotateObj = {
      1: 0,
      2: 90,
      3: 180,
      4: 270,
    }
    return rotateObj[_currentKeycode]
  };

export default getRotateAmount;
