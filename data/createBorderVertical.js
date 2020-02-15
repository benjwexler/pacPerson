
import getBorderYobj from './getBorderYobj.js';

const createBorderVertical = (cellWidth, cellHeight, numRows, numCols) => {
  let xAxis = 0;
  let yAxis = 0;
  const borderDataVerticalMatrix = [];
  let arr = []
  while ((cellWidth * xAxis) <= 100 && (cellHeight * yAxis) <= 100) {
    let hasBorder = false;
    arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis, hasBorder })
    yAxis += 1

    if (cellHeight * yAxis > 100) {
      borderDataVerticalMatrix.push(arr)
      arr = [];
      yAxis = 0
      xAxis += 1
    }
  }

  const borderYobj = getBorderYobj(numRows, numCols);
  borderYobj.forEach(border => {
    const row = borderDataVerticalMatrix[border.x]
    for (let i = border.startY; i <= border.endY; i++) {
      row[i].hasBorder = true;
    }
  })

  return borderDataVerticalMatrix;
}

export default createBorderVertical;
