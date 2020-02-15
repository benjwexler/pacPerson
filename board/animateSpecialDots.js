
const animateSpecialDots = () => {
  const specialDots = document.querySelectorAll('.special')
  let isBright = true;
  setInterval(() => {
    isBright = !isBright;
    specialDots.forEach(dot => {
      isBright ? dot.style.opacity = 1 : dot.style.opacity = .2
    })
  }, 300);
};

export default animateSpecialDots;
