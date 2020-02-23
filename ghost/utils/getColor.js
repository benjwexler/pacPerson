
 const getColor = (timer, flashingAmount, color) => {
   const canBeEatenColor = 'white';
    if(!timer) return color
    if(timer < 4) return !flashingAmount ? color : canBeEatenColor;
    return canBeEatenColor;
  }

  export default getColor;