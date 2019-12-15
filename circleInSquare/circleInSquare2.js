// Fire when DOM is available
let svg;
let cellHeight = 100 / 10;
let cellWidth = 100 / 10;
let data = [{
  x: '50%',
  y: '50%',

}];

let rectData = [];

let rectMatrice = [];

const circleDiameter = cellWidth < cellHeight ? cellWidth : cellHeight

let circleRadius = circleDiameter / 2
var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

const createRectData = () => {
  let xAxis = 0;
  let yAxis = 0;

  let arr = []

  const width = cellWidth * xAxis;
  let count = 0;
  while ((cellWidth * xAxis+1) <= 100 && (cellHeight * yAxis + 1) <= 100) {
    count++

    rectData.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })
    arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })

    xAxis += 1
    if (cellWidth * xAxis >= 100) {
      rectMatrice.push(arr);
      arr = [];
      yAxis += 1
      xAxis = 0
    }
    
  }

  console.log('rectMatrice', rectMatrice)

}

createRectData()


domReady(function () {

  const elementSize = document.getElementById("crack").getBoundingClientRect();
    const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;

    console.log('elem size', elementSize)
    // newCircleData = data[0];
    // // newCircleData.x=100;
    circleRadius = diameter/40
  svg = d3.select("#crack");
  const createCircle = (cx, cy, r, styleName, styleVal) => {

    const circleSelection = svg.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", r)
      .style(styleName, styleVal);

  }

  window.addEventListener("resize", () => {
    console.log("RESIZE")
    const elementSize = document.getElementById("crack").getBoundingClientRect();
    const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;

    console.log('elem size', elementSize)
    // newCircleData = data[0];
    // // newCircleData.x=100;
    circleRadius = diameter/40
    // newCircleData.r = diameter/4;

    // data[0] = newCircleData
    update()
  });

  const update = () => {


    var selection = d3.select("#crack")
      .selectAll("rect").data(rectData, (d) => d.count)
      .attr('x', d => 0)
      .attr('y', d => 0)
      .attr('height', '100%')
      .attr('width', '100%')
      // .style("fill", "red")

    const circles = d3.select("#crack").selectAll("circle").data(rectData, (d) => d.count)
      .attr('cx', d => '50%')
      .attr('cy', d => '50%')
      .attr('r', d => `${circleRadius}%`)
      .style("fill", "blue")

    selection.exit().remove();
    circles.exit()
    .style("fill", "yellow")
    .transition()
    .style("opacity", 0)
    .delay(25)
    .remove();


    const svg = selection.enter()
      .append('svg')
      .attr('x', d => `${d.x}%`)
      .attr('y', d => `${d.y}%`)
      .attr('height', `${cellHeight}%`)
      .attr('width', `${cellWidth}%`)
      .on("mouseenter", function (e, i, j) {
        console.log('j', j)
        const indexToRemove = rectData.findIndex(element => element.count === e.count)
        if (indexToRemove !== -1) {
          rectData.splice(indexToRemove, 1);
        }

        update();
      })


    svg.append("rect")
      .attr('x', d => 0)
      .attr('y', d => 0)
      .attr('height', '100%')
      .attr('width', '100%')
      // .style("fill", "red")


    svg.append("circle")
      .attr('cx', d => '50%')
      .attr('cy', d => '50%')
      .attr('r', d => `${circleRadius}%`)
      .style("fill", "blue")

      


    // selection.enter()
    // .append('svg')
    // .attr('x', d => `${d.x}%`)
    // .attr('y', d => `${d.y}%`)
    // .attr('height', `${cellHeight}%`)
    // .attr('width', `${cellWidth}%`)
    // .append("circle")
    //  .attr('cx', d => '50%')
    // .attr('cy', d =>'50%')
    // .attr('r', d => `${circleRadius}%`)
    // .style("fill", "blue")



    // .style("fill", "blue")

    // var selection = d3.select("#crack")
    // .selectAll("rec").data(rectData)

    // var selection = d3.select("#crack")
    // .selectAll("svg circle").data(rectData)



    // selection.enter()
    // .append("circle")
    // .attr('cx', d => '50%')
    // .attr('cy', d => '50%')
    // .attr('r', d => 50)
    // .style("fill", "blue")


    // createCircle('50%', '50%', 25, "fill", "blue")
    // .select("circle").data(data, (d) => d.count)
    // .attr('cx', d => `${d.x}%`)
    // .attr('cy', d => `${d.y}%`)
    // .attr('r', d => `${circleRadius / 2}%`)
    // .style("fill", "blue")


    // selection.enter()
    //   .append("circle")
    //   .on("mouseenter", function (e, i) {
    //     console.log('e', e)
    //     console.log('i', i)

    //     const indexToRemove = data.findIndex(element => element.count === e.count)
    //     data.splice(indexToRemove, 1);
    //     update();
    //   })
    //   .attr('r', d => `${circleRadius / 10}%`)
    //   .transition()

    //   .attr('cx', d => `${d.x}%`)
    //   .attr('cy', d => `${d.y}%`)
    //   .attr('r', d => `${circleRadius / 2}%`)
    //   .style("fill", "blue")


    // selection.exit()
    // .on("mouseenter", function (e, i) {
    //   console.log("GONNA BE REMOVED")
    // })
    // .style("fill", "yellow")
    // .transition()
    // .style("opacity", 0)
    // .delay(25)
    // .remove();
  }
  update()

  // createBorder()

});