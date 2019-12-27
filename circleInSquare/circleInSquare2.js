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
  while ((cellWidth * xAxis + 1) <= 100 && (cellHeight * yAxis + 1) <= 100) {
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

  // console.log('rectMatrice', rectMatrice)
  console.log('rectData', rectData)

}

createRectData()


domReady(function () {

  const elementSize = document.getElementById("crack").getBoundingClientRect();
  const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;
  circleRadius = diameter / 40
  svg = d3.select("#crack");

  window.addEventListener("resize", () => {
    const elementSize = document.getElementById("crack").getBoundingClientRect();
    const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;
    circleRadius = diameter / 40
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

    const circles = d3.select("#crack").selectAll(".circle").data(rectData, (d) => d.count)
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
      .classed("circle", true)
      .attr('cx', d => '50%')
      .attr('cy', d => '50%')
      .attr('r', d => `${circleRadius}%`)
      .style("fill", "blue")
  }
  update()

  let tealCircleX = 0;
  let tealCircleY = 0;

  const tealCircleData = [{
    x: tealCircleX,
    y: tealCircleY,
  }]

  window.addEventListener("keydown", (ev) => {

    // tealCircleX+=100
    console.log('ev', ev.keyCode)


    switch (ev.keyCode) {
      case 37:
        // code block
        tealCircleData[0].x -= 5
        if(tealCircleData[0].x < 0) {
          tealCircleData[0].x = 100
        }
        break;
      case 38:
        tealCircleData[0].y -= 5
        if(tealCircleData[0].y < 0) {
          tealCircleData[0].y = 100
        }
        break;
      case 39:
        tealCircleData[0].x += 5
        if(tealCircleData[0].x > 100) {
          tealCircleData[0].x = 0
        }
        break;
      case 40:
        tealCircleData[0].y += 5
        if(tealCircleData[0].y > 100) {
          tealCircleData[0].y = 0
        }
        break;
      default:
      // code block
    }
    // tealCircleData[0].x +=10
    console.log('tealCircleData', tealCircleData)
    console.log('rectData', rectData)
    const circleCompensation = 5;


    const indexToRemove = rectData.findIndex(element => element.x === (tealCircleData[0].x -5) && (element.y === tealCircleData[0].y -5))
    console.log('tealCircleData.x -5', tealCircleData.x -5)
    console.log('tealCircleData.y -5', tealCircleData.y -5)
        if (indexToRemove !== -1) {
          rectData.splice(indexToRemove, 1);
          update()
        }

    

   
    moveCirlce()
  });


  const moveCirlce = () => {
    d3.select("#crack")
      .selectAll("g svg circle").data(tealCircleData)
      .attr('cx', d => `${d.x}%`)
      .attr('cy', d => `${d.y}%`)
      .attr('r', `${circleRadius/5}%`)
      .attr("transform", "translate(0," + 0 + ")")
      .style("fill", "teal")
      .enter()
      .append('g')
      .append('svg')
      .append("circle")
      .attr('cx', d => `${d.x}%`)
      .attr('cy', d => `${d.y}%`)
      .attr('r', `${circleRadius/5}%`)
      .attr("transform", "translate(0," + 00 + ")")
      .style("fill", "teal")
    // .enter().append("circle")

  }





});