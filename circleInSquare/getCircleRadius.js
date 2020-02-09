
const getCircleRadius = () => {
  const elementSize = document.getElementById("crack").getBoundingClientRect();
  const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;
  let circleRadius = diameter / 80;
  return circleRadius;
};

export default getCircleRadius;
