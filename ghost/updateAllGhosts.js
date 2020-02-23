import updateGhost from "./updateGhost.js";

const updateAllGhosts = (_ghosts, dimensions) => {
  const {invincibleTimer, ghosts} = _ghosts;
  return ghosts.map(ghost => {
    return updateGhost(ghost, dimensions, invincibleTimer)
  });
};

export default updateAllGhosts;
