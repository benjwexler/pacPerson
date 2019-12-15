// Fire when DOM is available
let svg;
const cellWidth = 100 / 21
const cellHeight = 100 / 30;
let data = [];

const circleDiameter = cellWidth < cellHeight ? cellWidth : cellHeight

const circleRadius = circleDiameter / 2
var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

const drawLine = (x1, y1, x2, y2) => {
  svg.append("line")
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
    .attr("stroke-width", `${cellWidth}%`)
    .attr("stroke", "#00ccff");
}

const createBorder = () => {
  drawLine("0%", "0%", "100%", "0%")
  drawLine("100%", "0%", "100%", "33.33%")
  drawLine("100%", "66.66%", "100%", "100%")
  drawLine("0%", "100%", "100%", "100%")
  drawLine("0%", "0%", "0%", "33.33%")
  drawLine("0%", "66.66%", "0%", "100%")
}


domReady(function () {
  svg = d3.select("#crack");
  const createCircle = (cx, cy, r, styleName, styleVal) => {

    const circleSelection = svg.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", r)
      .style(styleName, styleVal);

  }

  const createDots = () => {
    let shouldCreateDots = true;
    let xAxis = 0;
    let yAxis = 0;
    const width = cellWidth * xAxis;
    let count = 0;
    while ((cellWidth * xAxis) <= 100 && (cellHeight * yAxis) <= 100) {
      count++

      data.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })

      xAxis += 1
      if (cellWidth * xAxis > 100) {
        yAxis += 1
        xAxis = 0
      }
    }
  }


  createDots()

  const update = () => {
    var selection = d3.select("#crack")
      .selectAll("circle").data(data, (d) => d.count)
      .attr('cx', d => `${d.x}%`)
      .attr('cy', d => `${d.y}%`)
      .attr('r', d => `${circleRadius / 2}%`)
      .style("fill", "blue")


    selection.enter()
      .append("circle")
      .on("mouseenter", function (e, i) {
        console.log('e', e)
        console.log('i', i)

        const indexToRemove = data.findIndex(element => element.count === e.count)
        data.splice(indexToRemove, 1);
        update();
      })
      .attr('r', d => `${circleRadius / 10}%`)
      .transition()
        
      .attr('cx', d => `${d.x}%`)
      .attr('cy', d => `${d.y}%`)
      .attr('r', d => `${circleRadius / 2}%`)
      .style("fill", "blue")
     

    selection.exit()
    .on("mouseenter", function (e, i) {
      console.log("GONNA BE REMOVED")
    })
    .style("fill", "yellow")
    .transition()
    .style("opacity", 0)
    .delay(25)
    .remove();
  }
  update()

  // createBorder()

});