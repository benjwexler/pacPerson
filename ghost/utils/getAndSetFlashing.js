
const getAndSetFlashing = (ghost) => {
    ghost.flashingAmount ? ghost.flashingAmount = 0 : ghost.flashingAmount = 1
    return ghost.flashingAmount
  }

export default getAndSetFlashing;