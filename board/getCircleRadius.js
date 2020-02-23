
const getCircleRadius = (dimensions) => {
  const diameter = dimensions.width < dimensions.height ? dimensions.width : dimensions.height;
  let circleRadius = diameter / 80;
  return circleRadius;
};

export default getCircleRadius;
