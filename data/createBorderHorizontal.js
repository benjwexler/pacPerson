
import getBorderXobj from './getBorderXobj.js';

const createBorderHorizontal = (cellWidth, cellHeight, numRows, numCols) => {
  const borderXobj = getBorderXobj(numRows, numCols)
  let xAxis = 0;
  let yAxis = 0;
  const borderDataHorizontalMatrix = [];
  let arr = [];

  while ((cellWidth * xAxis) <= 100 && (cellHeight * yAxis) <= 100) {
    let hasBorder = false;
    arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis, hasBorder })
    xAxis += 1

    if (cellWidth * xAxis > 100) {
      borderDataHorizontalMatrix.push(arr)
      arr = [];
      yAxis += 1
      xAxis = 0
    }
  }

  borderXobj.forEach(border => {
    const row = borderDataHorizontalMatrix[border.y]
    for (let i = border.startX; i < border.endX; i++) {
      row[i].hasBorder = true;
      row[i].isOpening = border.isOpening;
    }
  })
  return borderDataHorizontalMatrix;
};

export default createBorderHorizontal;