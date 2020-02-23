
import {
  numCols,
  numRows,
  cellHeightPercentageInt,
  cellWidthPercentageInt,
  borderDataHorizontalMatrix,
  borderDataVerticalMatrix,
} from '../constants.js';

const setCoordAndUpdate = (ghost) => {
  let isInCenter = true;
  let {previousDirection, ghostCoords} = ghost;
  let {coordX, coordY} = ghostCoords;
    let newPreviousDirection;
    const getDirection = () => {
      const randomNumber = (Math.floor(Math.random() * 4)) + 1;
      const cannotMove = {
        1: borderDataVerticalMatrix[coordX][coordY],
        2: borderDataHorizontalMatrix[coordY][coordX],
        3: borderDataVerticalMatrix[coordX + 1][coordY],
        4: borderDataHorizontalMatrix[coordY + 1][coordX],
      }

      const preventPreviousDirection = {
        1: 3,
        2: 4,
        3: 1,
        4: 2,
      };

      if ((cannotMove[randomNumber].hasBorder && (!cannotMove[randomNumber].isOpening || (cannotMove[randomNumber].isOpening && !isInCenter))) || randomNumber === preventPreviousDirection[previousDirection]) {
        return getDirection();
      }

      // if (cannotMove[randomNumber].isOpening) {
      //   isInCenter = false;
      // };

      const mutateInstructions = {
        1: () => coordX - 1 >= 0 ? coordX -= 1 : coordX = numCols - 1,
        2: () => coordY -= 1,
        3: () => coordX + 1 < numCols ? coordX += 1 : coordX = 0,
        4: () => coordY += 1,
      };

      mutateInstructions[randomNumber]();
      newPreviousDirection = randomNumber;
     
  
    }
    getDirection();

    ghost.previousDirection = newPreviousDirection;
    ghostCoords.coordX = coordX;
    ghostCoords.coordY = coordY;

    return {
       coordX,
       coordY,
       previousDirection: newPreviousDirection,
     }
  }

export default setCoordAndUpdate;
