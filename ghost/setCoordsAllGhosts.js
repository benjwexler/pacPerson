import updateGhost from "./updateGhost.js";
import setCoordAndUpdate from "./setCoordAndUpdate.js";

const setCoordsAllGhosts = (ghosts) => {
  return ghosts.forEach(ghost => {
    setCoordAndUpdate(ghost)
  });
};

export default setCoordsAllGhosts;
