
import generateNoCircleCoords from './generateNoCircleCoords.js'
import getSpecialCoords from './getSpecialCoords.js';

const createRectData = (_cellWidth, _cellHeight, numCols) => {
  const specialCoords = getSpecialCoords(numCols);
  const rectData = [];
  const noCircleCoords = generateNoCircleCoords();
  let xAxis = 0;
  let yAxis = 0;
  let rectMatrice = [];
  let arr = []
  let count = 0;
  while ((_cellWidth * xAxis + 1) <= 100 && (_cellHeight * yAxis + 1) <= 100) {
    count++
    arr.push({ x: _cellWidth * xAxis, y: _cellHeight * yAxis, count })
    const shouldAddCircle = noCircleCoords.findIndex(coords => coords.x === xAxis && coords.y === yAxis)
    if (shouldAddCircle === -1) {
      rectData.push({ x: _cellWidth * xAxis, y: _cellHeight * yAxis, count, xAxis, yAxis })
    }

    xAxis += 1
    if (_cellWidth * xAxis >= 100) {
      rectMatrice.push(arr);
      arr = [];
      yAxis += 1
      xAxis = 0
    }
  }
  specialCoords.forEach(coordPair => {
    const specialCircle = rectData.find(e => e.xAxis === coordPair.xAxis && e.yAxis === coordPair.yAxis);
    if (specialCircle) {
      specialCircle.special = true;
    }
  })
  return rectData;
}

export default createRectData;
