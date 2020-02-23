
const keyDownListener = (pacman) => {
window.addEventListener("keydown", (ev) => {
    let direction;
    switch (ev.keyCode) {
      case 37:
        direction = 1;
        break;
      case 38:
        direction = 2;
        break;
      case 39:
        direction = 3;
        break;
      case 40:
        direction = 4;
        break;
      default:
        direction = pacman.direction
        break;
    }
    pacman.direction = direction;
  });
}

export default keyDownListener;
