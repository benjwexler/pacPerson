import { numRows, numCols } from "../../constants.js";
import getLegDataX from "./getLegDataX.js";

 const updateGhostRadius = (ghost, boardDimensions) => {
    let cellHeight = boardDimensions.height / numRows;
    let cellWidth = boardDimensions.width / numCols;
    ghost.ghostRadius = (cellHeight < cellWidth ? cellHeight / 4 : cellWidth / 4) * 1.5;
    ghost.ghostDiameter = ghost.ghostRadius * 2;
    const { ghostDiameter } = ghost;
    ghost.leg1DataX0 = getLegDataX(ghostDiameter, 1);
    ghost.leg1DataX1 = getLegDataX(ghostDiameter, 0);
    ghost.leg2DataX0 = getLegDataX(ghostDiameter, 2);
    ghost.leg2DataX1 = getLegDataX(ghostDiameter, 1);
    ghost.leg3DataX0 = getLegDataX(ghostDiameter, 3);
    ghost.leg3DataX1 = getLegDataX(ghostDiameter, 2);
    ghost.leg4DataX0 = getLegDataX(ghostDiameter, 4);
    ghost.leg4DataX1 = getLegDataX(ghostDiameter, 3);

    const {leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1} = ghost;
    ghost.legsDataX = [leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1]
  }

  export default updateGhostRadius;
