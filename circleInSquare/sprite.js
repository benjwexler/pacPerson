const FLAG = "./images/ghost.png";

const width = 680
    , height = 248
    , flagWidth = 680
    , flagHeight = 248;

const svg2 = d3.select("#spriteContainer").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('style', "border: 2px solid yellow")
    .append('image')
      .attr('xlink:href', FLAG)
      .attr('width', '680px')
      .attr('height', '248px')
      .attr('x', 0)
      .attr('y', 0);