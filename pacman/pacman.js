import getPacmanRadius from "./getPacmanRadius.js";

  const getPacman = () => {
    return {
    coords: {
      x: 0,
      y: 0,
    },
    lives: 3,
    direction: 1,
    radius: getPacmanRadius(),
    isFacingWall: true,
  };
  }

  export default getPacman;