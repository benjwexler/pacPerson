
import updateBoard from "./board/updateBoard.js";
import updatePacman from './pacman/updatePacman.js'
import getPacmanRadius from "./pacman/getPacmanRadius.js";
import {
  numCols,
  numRows,
  borderDataHorizontalMatrix,
  borderDataVerticalMatrix,
  mainSvg,
  pacmanData,
  dots
} from './constants.js';
import { ghosts } from "./ghost/ghost.js";
import getPacman from "./pacman/pacman.js";
import keyDownListener from "./pacman/keyDownListener.js";
import updateAllGhostRadii from "./ghost/updateAllGhostRadii.js";
import updateAllGhosts from "./ghost/updateAllGhosts.js";
import updateAllLegs from "./ghost/updateAllLegs.js";
import setCoordsAllGhosts from "./ghost/setCoordsAllGhosts.js";
import checkCollision from "./ghost/checkCollision.js";
import resetGhostCoords from "./ghost/resetGhostCoords.js";
import animateSpecialDots from "./board/animateSpecialDots.js";
import updateBorders from "./board/updateBorders.js";

var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

const getBoardDimensions = (numCols, numRows, ) => {
  let boardDimensions = document.getElementById("board").getBoundingClientRect();
  let cellHeight = boardDimensions.height / numRows;
  let cellWidth = boardDimensions.width / numCols;

  return {
    boardDimensions,
    cellHeight,
    cellWidth,
  }
}

domReady(function () {
  const updateBoardDimensionsOnResize = (boardInfo, numCols, numRows) => {
    window.addEventListener("resize", () => {
      boardInfo.dimensions = getBoardDimensions(numCols, numRows);
      updateAllGhostRadii(ghosts.ghosts)
    });
  }
  let lives = 3;
  let score = 0;
  let shouldUpdateBoard = false;
  let invincibleInterval;

  const createInterval = () => {
    let { invincibleTimer } = ghosts;
    invincibleTimer < 0 ? invincibleTimer = 0 : invincibleTimer += 5;
    invincibleInterval = setInterval(function () {
      invincibleTimer -= 1;
      if (invincibleTimer <= 0) {
        invincibleTimer = 0;
        ghosts.invincibleTimer = invincibleTimer;
        clearInterval(invincibleInterval)
      }

      ghosts.invincibleTimer = invincibleTimer;
    }, 1000);
    ghosts.invincibleTimer = invincibleTimer;
  }

  updateAllGhostRadii(ghosts.ghosts)
  let dimensions = getBoardDimensions(numCols, numRows);
  let boardInfo = { dimensions }
  updateBoardDimensionsOnResize(boardInfo, numCols, numRows);
  updateBoard(boardInfo, dots)
  updateBorders()
  animateSpecialDots()
  let pacman = getPacman();

  keyDownListener(pacman)

  updatePacman({
    mainSvg,
    pacman,
    dimensions: boardInfo.dimensions.boardDimensions,
    pacmanData,
  })

  window.addEventListener("resize", () => {
    pacman.radius = getPacmanRadius();
    updateBoard(boardInfo, dots)
  });

  const updateCoords = () => {
    const { x, y } = pacman.coords;

    switch (pacman.direction) {
      case 1:
        if (borderDataVerticalMatrix[x][y].hasBorder) return pacman.isFacingWall = true;
        pacman.isFacingWall = false;
        pacman.coords.x -= 1;
        if (pacman.coords.x < 0) pacman.coords.x = numCols;
        break;
      case 2:
        if (borderDataHorizontalMatrix[y][x].hasBorder) return pacman.isFacingWall = true;
        pacman.isFacingWall = false;
        pacman.coords.y -= 1;
        break;
      case 3:
        if (borderDataVerticalMatrix[x + 1][y].hasBorder) return pacman.isFacingWall = true;
        pacman.isFacingWall = false;
        pacman.coords.x += 1;
        if (pacman.coords.x >= numCols) pacman.coords.x = 0;
        break
      case 4:
        if (borderDataHorizontalMatrix[y + 1][x].hasBorder) return pacman.isFacingWall = true;
        pacman.isFacingWall = false;
        pacman.coords.y += 1;
        break;
    }

    const indexToRemove = dots.findIndex(element => element.xAxis === pacman.coords.x && element.yAxis === pacman.coords.y);
    if (indexToRemove !== -1) {
      shouldUpdateBoard = true;
      if (!dots[indexToRemove].special) {
        score++

      } else {
        score += 10;
        clearInterval(invincibleInterval)
        createInterval()
      }
      dots.splice(indexToRemove, 1);
    } else {
      shouldUpdateBoard = false;
    }
  }

  let svgs = updateAllGhosts(ghosts, boardInfo.dimensions)
  updateAllLegs(ghosts, boardInfo, svgs)

  let wasCollisionDetected = false;
  let ghostsCanMove = true;

  setInterval(() => {
    if(!dots.length) return alert("CONGRATS! YOU WON!");
    ghostsCanMove = !ghostsCanMove;
    if (wasCollisionDetected) {
      alert("OVER")
      lives -= 1;
      if (!lives) {
        alert("YOU LOST")
        return location.reload();
      }
      document.getElementById('lives').innerText = lives;
      resetGhostCoords(ghosts.ghosts)
      ghosts.invincibleTimer = 0;
      return wasCollisionDetected = false;
    }

    if (ghostsCanMove) {
      setCoordsAllGhosts(ghosts.ghosts)
      updateAllGhosts(ghosts, boardInfo.dimensions)
    }

    updateCoords()

    if (shouldUpdateBoard && !pacman.isFacingWall) {
      updateBoard(boardInfo, dots)
      document.getElementById('score').innerText = score;
    }

    if (pacman.isFacingWall || pacmanData[1].ratio <= 0) {
      pacmanData[1].ratio = 250
    } else {
      pacmanData[1].ratio -= 126
    }

    updatePacman({
      mainSvg,
      pacman,
      dimensions: boardInfo.dimensions.boardDimensions,
      pacmanData,
    })

    wasCollisionDetected = checkCollision(pacman.coords, ghosts)

  }, 175)
});
