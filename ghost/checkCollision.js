
const checkCollision = (pacmanCoords, _ghosts) => {
  const {ghosts, invincibleTimer} = _ghosts;
  if (invincibleTimer) return false;
  return ghosts.some(ghost => {
    const {ghostCoords} = ghost;
    return ghostCoords.coordX === pacmanCoords.x && ghostCoords.coordY === pacmanCoords.y
  })
};

export default checkCollision;
