
const resetGhostCoords = (ghosts) => {
  ghosts.forEach(ghost => {
    ghost.ghostCoords = {coordX: 8, coordY:8}
  });
};

export default resetGhostCoords;
