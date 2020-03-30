

class Ghost {
  constructor(ghostNum, color) {
    this.ghostNum = ghostNum;
    this.color = color;
    this.ghostRadius = undefined;
    this.legsDataX = undefined;
    this.flashingAmount = 0;
    this.ghostCoords = { coordX: 8, coordY: 8 };
    this.previousDirection = undefined;
  }
}

export let ghost1 = new Ghost(1, 'purple');
export let ghost2 = new Ghost(2, 'blue');
export let ghost3 = new Ghost(3, 'green');
export let ghost4 = new Ghost(4, '#FF7E00');
export let ghost5 = new Ghost(5, '#DE5D83');
export let ghost6 = new Ghost(6, '#3B7A57');

class Ghosts {
  constructor(ghosts) {
    this.ghosts = ghosts;
    this.invincibleTimer = 0;
  }
}

export let ghosts = new Ghosts([ghost1, ghost2, ghost3, ghost4, ghost5, ghost6]);

