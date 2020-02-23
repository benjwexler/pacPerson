import updateGhostRadius from "./utils/updateGhostRadius.js";

const updateAllGhostRadii = (ghosts) => {
  let boardDimensions = document.getElementById("board").getBoundingClientRect();
  ghosts.forEach(ghost => {
    updateGhostRadius(ghost, boardDimensions)
  });
};

export default updateAllGhostRadii;
