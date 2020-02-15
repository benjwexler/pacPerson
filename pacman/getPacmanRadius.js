
const getPacmanRadius = () => {
const circleSize = document.querySelector('.circle').getBoundingClientRect()
  let circleWidth = circleSize.width;
  let circleHeight = circleSize.height
  let _circleDiameter = circleWidth < circleHeight ? circleWidth : circleHeight;
  // Pacman is twice the size of a normal circle so that's why the 'radius' is actually the diameter;
  return _circleDiameter;
};

export default getPacmanRadius;
