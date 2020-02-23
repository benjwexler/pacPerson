import updateLegs from "./updateLegs.js";

const updateAllLegs = (_ghosts, boardInfo, svgs) => {
  const { ghosts } = _ghosts;
  return ghosts.map((ghost, i) => {
    return updateLegs({
      ghost, 
      boardInfo,
      svg: svgs[i],
      ghosts: _ghosts,
    })
  });
};

export default updateAllLegs;
