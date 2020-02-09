
const generateNoCircleCoords = () => {

    const noCircleCoords = [];
    const addNoCircleCoords = (xStart, yStart, xEnd, yEnd) => {
      for (let x = xStart; x <= xEnd; x++) {
        for (let y = yStart; y <= yEnd; y++) {
          noCircleCoords.push({ x, y })
        }
      }

    }

    addNoCircleCoords(1, 1, 2, 2)
    addNoCircleCoords(4, 1, 6, 2)
    addNoCircleCoords(8, 0, 8, 2)
    addNoCircleCoords(10, 1, 12, 2)
    addNoCircleCoords(14, 1, 15, 2)
    addNoCircleCoords(1, 4, 2, 5)
    addNoCircleCoords(4, 4, 4, 8)
    addNoCircleCoords(5, 6, 6, 6)
    addNoCircleCoords(5, 4, 10, 4)
    addNoCircleCoords(8, 5, 8, 6)
    addNoCircleCoords(10, 6, 12, 6)
    addNoCircleCoords(12, 4, 12, 8)
    addNoCircleCoords(14, 4, 15, 5)
    addNoCircleCoords(0, 7, 2, 8)
    addNoCircleCoords(6, 8, 10, 10)
    addNoCircleCoords(14, 7, 16, 8)
    addNoCircleCoords(0, 10, 2, 11)
    addNoCircleCoords(4, 10, 4, 14)
    addNoCircleCoords(5, 12, 6, 12)
    addNoCircleCoords(6, 14, 10, 14)
    addNoCircleCoords(8, 12, 8, 13)
    addNoCircleCoords(10, 12, 12, 12)
    addNoCircleCoords(12, 10, 12, 14)
    addNoCircleCoords(14, 10, 16, 11)
    addNoCircleCoords(1, 13, 2, 14)
    addNoCircleCoords(1, 16, 2, 17)
    addNoCircleCoords(4, 16, 6, 17)
    addNoCircleCoords(8, 16, 8, 18)
    addNoCircleCoords(10, 16, 12, 17)
    addNoCircleCoords(14, 13, 15, 14)
    addNoCircleCoords(14, 16, 15, 17)

    return noCircleCoords

  }

export default generateNoCircleCoords;
