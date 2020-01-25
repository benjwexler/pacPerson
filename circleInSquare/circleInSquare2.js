
// Fire when DOM is available
const numRows = 19;
const numCols = 17;
let score = 0;

let svg;
let cellHeight = 100 / numRows;
let cellWidth = 100 / numCols;
let data = [{
  x: '50%',
  y: '50%',

}];

let rectData = [];

let rectMatrice = [];

const circleDiameter = cellWidth < cellHeight ? cellWidth : cellHeight

let tealCircleX = 0;
let tealCircleY = 0;

const tealCircleData = [{
  x: tealCircleX,
  y: tealCircleY,
}]


let pacManGridCoords = {
  x: 0,
  y: 0,
}




// Pacman
// __________

let pie;
let pie2;
let topPath;
let bottomPath;
let arc;
let shouldAnimateMouth = true;
let pacmanRotateAmount = 0;
let currentKeyCode = 38;

const getRotateAmount = (_currentKeycode) => {
  const rotateObj = {
    37: 0,
    38: 90,
    39: 180,
    40: 270,
  }

  return rotateObj[_currentKeycode]
}

const halfCircleData = [1, 2]
const pacmanData = [
  { apples: 75, oranges: 100 },
  { apples: 25, oranges: 0 }
]

// __________



let circleRadius = circleDiameter / 2
var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};




const generateNoCircleCoords = () => {

const noCircleCoords = [];
const addNoCircleCoords = (xStart, yStart, xEnd, yEnd) => {
  for(let x=xStart; x<=xEnd; x++) {
    for(let y=yStart; y<=yEnd; y++) {
      noCircleCoords.push({x, y})
    }
  }
  
}

addNoCircleCoords(1, 1, 2, 2)
addNoCircleCoords(4, 1, 6, 2)
addNoCircleCoords(8, 0, 8, 2)
addNoCircleCoords(10, 1, 12, 2)
addNoCircleCoords(14, 1, 15, 2)
addNoCircleCoords(1, 4, 2, 5)
addNoCircleCoords(4, 4, 4, 8)
addNoCircleCoords(5, 6, 6, 6)
addNoCircleCoords(5, 4, 10, 4)
addNoCircleCoords(8, 5, 8, 6)
addNoCircleCoords(10, 6, 12, 6)
addNoCircleCoords(12, 4, 12, 8)
addNoCircleCoords(14, 4, 15, 5)
addNoCircleCoords(0, 7, 2, 8)
addNoCircleCoords(6, 8, 10, 10)
addNoCircleCoords(14, 7, 16, 8)
addNoCircleCoords(0, 10, 2, 11)
addNoCircleCoords(4, 10, 4, 14)
addNoCircleCoords(5, 12, 6, 12)
addNoCircleCoords(6, 14, 10, 14)
addNoCircleCoords(8, 12, 8, 13)
addNoCircleCoords(10, 12, 12, 12)
addNoCircleCoords(12, 10, 12, 14)
addNoCircleCoords(14, 10, 16, 11)
addNoCircleCoords(1, 13, 2, 14)
addNoCircleCoords(1, 16, 2, 17)
addNoCircleCoords(4, 16, 6, 17)
addNoCircleCoords(8, 16, 8, 18)
addNoCircleCoords(10, 16, 12, 17)
addNoCircleCoords(14, 13, 16, 14)
addNoCircleCoords(14, 16, 16, 17)

return noCircleCoords

}



const noCircleCoords = generateNoCircleCoords();

const createRectData = () => {
  let xAxis = 0;
  let yAxis = 0;

  let arr = []

  const width = cellWidth * xAxis;
  let count = 0;
  while ((cellWidth * xAxis + 1) <= 100 && (cellHeight * yAxis + 1) <= 100) {
    count++
    arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })
    const shouldAddCircle = noCircleCoords.findIndex(coords => coords.x === xAxis && coords.y === yAxis)
    if(shouldAddCircle === -1) {
      rectData.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count, xAxis, yAxis })
    }
    

    xAxis += 1
    if (cellWidth * xAxis >= 100) {
      rectMatrice.push(arr);
      arr = [];
      yAxis += 1
      xAxis = 0
    }

  }
}

createRectData()
const specialCoords = [
  {xAxis: 0, yAxis: 3},
  {xAxis: numCols-1, yAxis: 3},
  {xAxis: 0, yAxis: 15},
  {xAxis: numCols-1, yAxis: 15},

]

specialCoords.forEach(coordPair => {
  const specialCircle = rectData.find(e => e.xAxis === coordPair.xAxis && e.yAxis === coordPair.yAxis);
  if(specialCircle) {
    specialCircle.special = true;
  }
  
})

domReady(function () {

  const elementSize = document.getElementById("crack").getBoundingClientRect();
  const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;
  circleRadius = diameter / 80
  svg = d3.select("#crack");

  let borderDataHorizontal = [];
  let borderDataVertical = [];

  const borderTopXstart = 5;
  const borserTopXend = 14;

  const borderYstart = 3;
  const borderYend = 7;
  let borderDataHorizontalMatrix = [];
  let borderDataVerticalMatrix = [];

  const createBorderHorizontal = () => {
    let xAxis = 0;
    let yAxis = 0;
    let arr = []
    const width = cellWidth * xAxis;

    while ((cellWidth * xAxis) <= 100 && (cellHeight * yAxis) <= 100) {
      let hasBorder = false;
      borderDataHorizontal.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis })
      arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis, hasBorder })
      xAxis += 1

      if (cellWidth * xAxis > 100) {
        borderDataHorizontalMatrix.push(arr)
        arr = [];
        yAxis += 1
        xAxis = 0
      }

    }
  }

  const createBorderVertical = () => {
    let xAxis = 0;
    let yAxis = 0;
    const width = cellWidth * xAxis;
    
    let arr = []
    while ((cellWidth * xAxis) <= 100 && (cellHeight * yAxis) <= 100) {
      let hasBorder = false;
      arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis, hasBorder })
      yAxis += 1

      if (cellHeight * yAxis > 100) {
        borderDataVerticalMatrix.push(arr)
        
        arr = [];
        yAxis = 0
        xAxis += 1
      }

    }
  }

  createBorderHorizontal()
  const borderXobj = [
    {y: 0, startX: 0, endX: numCols},

    {y: 1, startX: 1, endX: 3},
    {y: 3, startX: 1, endX: 3},



    {y: 1, startX: 4, endX: 7},
    {y: 3, startX: 4, endX: 7},

    {y: 1, startX: 10, endX: 13},
    {y: 3, startX: 10, endX: 13},

    {y: 4, startX: 12, endX: 13},
    {y: 9, startX: 12, endX: 13},

    {y: 6, startX: 10, endX: 12},
    {y: 7, startX: 10, endX: 12},

    {y: 7, startX: 0, endX: 3},
    {y: 9, startX: 0, endX: 3},

    {y: 10, startX: 0, endX: 3},
    {y: 12, startX: 0, endX: 3},

    {y: 13, startX: 1, endX: 3},
    {y: 15, startX: 1, endX: 3},
    {y: 16, startX: 1, endX: 3},
    {y: 18, startX: 1, endX: 3},


    {y: 16, startX: 4, endX: 7},
    {y: 18, startX: 4, endX: 7},

    {y: 16, startX: 14, endX: 16},
    {y: 18, startX: 14, endX: 16},
   
    {y: 15, startX: 6, endX: 11},
    {y: 14, startX: 6, endX: 8},
    {y: 14, startX: 9, endX: 11},

    {y: 12, startX: 8, endX: 9},


    


    {y: 3, startX: 8, endX: 9},


    {y: 4, startX: 1, endX: 3},
    {y: 6, startX: 1, endX: 3},

    {y: 4, startX: 4, endX: 5},
    {y: 9, startX: 4, endX: 5},

    {y: 6, startX: 5, endX: 7},
    {y: 7, startX: 5, endX: 7},
    
    {y: 4, startX: 6, endX: 11},
    {y: 5, startX: 6, endX: 8},
    {y: 5, startX: 9, endX: 11},

    {y: 7, startX: 8, endX: 9},

    {y: 4, startX: 15, endX: 16},

    {y: 7, startX: 14, endX: 18},
    {y: 9, startX: 14, endX: 18},

    {y: 10, startX: 14, endX: 18},
    {y: 12, startX: 14, endX: 18},


    {y: 1, startX: 14, endX: 16},
    {y: 3, startX: 14, endX: 16},

    {y: 4, startX: 14, endX: 16},
    {y: 6, startX: 14, endX: 16},


    {y: 8, startX: 6, endX: 11},
    {y: 11, startX: 6, endX: 11},


    {y: 10, startX: 4, endX: 5},
    {y: 15, startX: 4, endX: 5},

    {y: 12, startX: 5, endX: 7},
    {y: 13, startX: 5, endX: 7},

    {y: 13, startX: 14, endX: 16},
    {y: 15, startX: 14, endX: 16},

    {y: 16, startX: 10, endX: 13},
    {y: 18, startX: 10, endX: 13},

    {y: 10, startX: 12, endX: 13},
    {y: 15, startX: 12, endX: 13},

    {y: 12, startX: 10, endX: 12},
    {y: 13, startX: 10, endX: 12},

    {y: 16, startX: 8, endX: 9},



    {y: numRows, startX: 0, endX: numCols},
  ]

  borderXobj.forEach(border => {
    const row = borderDataHorizontalMatrix[border.y]

    for(let i = border.startX; i < border.endX; i++) {
      row[i].hasBorder = true;
    }
  })

  createBorderVertical()
  const borderYobj = [
    {x: 0, startY: 0, endY: 6},
    {x: 0, startY: 12, endY: numRows},
    {x: 3, startY: 7, endY: 8},
    {x: 3, startY: 10, endY: 11},
    {x: numCols, startY: 0, endY: 6},
    {x: numCols, startY: 12, endY: numRows},
    {x: 1, startY: 1, endY: 2},
    {x: 3, startY: 1, endY: 2},
    {x: 1, startY: 13, endY: 14},
    {x: 3, startY: 13, endY: 14},
    {x: 1, startY: 16, endY: 17},
    {x: 3, startY: 16, endY: 17},
    {x: 4, startY: 16, endY: 17},
    {x: 7, startY: 16, endY: 17},
    {x: 4, startY: 1, endY: 2},
    {x: 7, startY: 1, endY: 2},
    {x: 8, startY: 0, endY: 2},
    {x: 9, startY: 0, endY: 2},
    {x: 10, startY: 1, endY: 2},
    {x: 13, startY: 1, endY: 2},
    {x: 13, startY: 4, endY: 8},
    {x: 12, startY: 4, endY: 5},
    {x: 12, startY: 7, endY: 8},
    {x: 10, startY: 6, endY: 6},
    {x: 8, startY: 12, endY: 13},
    {x: 9, startY: 12, endY: 13},
    {x: 6, startY: 14, endY: 14},
    {x: 11, startY: 14, endY: 14},
    {x: 4, startY: 10, endY: 14},
    {x: 5, startY: 10, endY: 11},
    {x: 5, startY: 13, endY: 14},
    {x: 7, startY: 12, endY: 12},
    {x: 14, startY: 1, endY: 2},
    {x: 16, startY: 1, endY: 2},
    {x: 14, startY: 4, endY: 5},
    {x: 16, startY: 4, endY: 5},
    {x: 14, startY: 16, endY: 17},
    {x: 16, startY: 16, endY: 17},
    {x: 1, startY: 4, endY: 5},
    {x: 3, startY: 4, endY: 5},
    {x: 4, startY: 4, endY: 8},
    {x: 5, startY: 4, endY: 5},
    {x: 5, startY: 7, endY: 8},
    {x: 6, startY: 4, endY: 4},
    {x: 7, startY: 6, endY: 6},
    {x: 11, startY: 4, endY: 4},
    {x: 8, startY: 5, endY: 6},
    {x: 9, startY: 5, endY: 6},
    {x: 6, startY: 8, endY: 10},
    {x: 11, startY: 8, endY: 10},
    {x: 14, startY:7, endY:8},
    {x: 14, startY:10, endY:11},
    {x: 14, startY:13, endY:14},
    {x: 16, startY:13, endY:14},
    {x: 10, startY:16, endY:17},
    {x: 13, startY:16, endY:17},
    {x: 13, startY:10, endY:14},
    {x: 12, startY:10, endY:11},
    {x: 12, startY:13, endY:14},
    {x: 10, startY: 12, endY:12},
    {x: 8, startY: 16, endY:numRows},
    {x: 9, startY: 16, endY:numRows},
  ]

  borderYobj.forEach(border => {
    const row = borderDataVerticalMatrix[border.x]

    for(let i = border.startY; i <= border.endY; i++) {
      row[i].hasBorder = true;
    }

  })

  window.addEventListener("resize", () => {
    const elementSize = document.getElementById("crack").getBoundingClientRect();
    const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;
    circleRadius = diameter / 80
    update()
  });


  const update = () => {
    var selection = d3.select("#crack")
      .selectAll("rect").data(rectData, (d) => d.count)
      .attr('x', d => 0)
      .attr('y', d => 0)
      .classed('cell', true)
      .attr('height', '100%')
      .attr('width', '100%')

    const circles = d3.select("#crack").selectAll(".circle").data(rectData, (d) => d.count)
      .attr('cx', d => '50%')
      .attr('cy', d => '50%')
      .attr('r', d => `${!d.special ? circleRadius : circleRadius * 2}%`)
      .classed('special', d => d.special)
      .style("fill", "blue")

    selection.exit().remove();
    circles.exit()
      .remove();


    const svg = selection.enter()
      .append('svg')
      .classed('cell', true)
      .attr('x', d => `${d.x}%`)
      .attr('y', d => `${d.y}%`)
      .attr('height', `${cellHeight}%`)
      .attr('width', `${cellWidth}%`)

    svg.append("rect")
      .attr('x', d => 0)
      .attr('y', d => 0)
      .attr('height', '100%')
      .attr('width', '100%')

    svg.append("circle")
      .classed("circle", true)
      .attr('cx', d => '50%')
      .attr('cy', d => '50%')
      .attr('r', d => `${!d.special ? circleRadius : circleRadius * 2}%`)
      .classed('special', d => d.special)
      .style("fill", "blue")
      // .style("fill", "#3C12CA")



      borderDataHorizontalMatrix.forEach(row => {
        row.forEach((piece, i) => {
          if (!piece.hasBorder) return;
          if (!row[i + 1]) { return }
          d3.select("#crack").append("line")
            .attr("x1", `${piece.x}%`)
            .attr("y1", `${piece.y}%`)
            .attr("x2", `${row[i + 1].x}%`)
            .attr("y2", `${piece.y}%`)
            .attr("stroke-width", 5)
            // .attr("stroke", "#56CCCA")
            .attr("stroke", "#C7CC56")
        })
      })
    
      borderDataVerticalMatrix.forEach(row => {
        row.forEach((piece, i) => {
          if (!piece.hasBorder) return;
          if (!row[i + 1]) { return }
          d3.select("#crack").append("line")
            .attr("x1", `${piece.x}%`)
            .attr("y1", `${piece.y}%`)
            .attr("x2", `${piece.x}%`)
            .attr("y2", `${row[i + 1].y}%`)
            .attr("stroke-width", 5)
            // .attr("stroke", "#56CCCA")
            // .attr("stroke", "#F66553")
            .attr("stroke", "#C7CC56")
        })
      })

document.getElementById('score').innerText=score
  }

  update()
  const specialDots = document.querySelectorAll('.special')
  // console.log('sepcial dots', specialDots)
  let blah =5
    setInterval(() => {
      // const specialDots = document.querySelectorAll('.special')
      specialDots.forEach(dot => {
      dot.style.opacity == .2 ?  dot.style.opacity = 1 : dot.style.opacity = .2
    })
  }, 300)


  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return arc(i(t));
    };
  }
  let mouthInterval
  const createInterval = () => {

    mouthInterval = setInterval(function () {
      if (!d3.select("input[value=\"oranges\"]")[0][0].checked) {
        return d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
      }

      return d3.select("input[value=\"apples\"]").property("checked", true).each(change);

    }, 195);

  }

  createInterval()
  const circleSize = document.querySelector('.circle').getBoundingClientRect()

  let circleWidth = circleSize.width;
  let circleHeight = circleSize.height
  let _circleDiameter = circleWidth < circleHeight ? circleWidth : circleHeight;
  let radius = _circleDiameter

  window.addEventListener("resize", () => {
    const circleSize = document.querySelector('.circle').getBoundingClientRect()
    circleWidth = circleSize.width;
    circleHeight = circleSize.height
    _circleDiameter = circleSize.width < circleSize.height ? circleSize.width : circleSize.height;
    radius = _circleDiameter
    pacmanUpdate()
  });

  const cellDimensions = d3.select('.cell').node().getBoundingClientRect()

  var mainSvg = d3.select("#crack")
    .append("svg")
    .classed("mainSvg", true)
    .attr("width", '100%')
    .attr("height", '100%')
    .style('overflow', 'visible')

  const pacmanUpdate = () => {

    const cellDimensions = d3.select('.cell').node().getBoundingClientRect()
    const _cellWidth = cellDimensions.width;
    const _cellHeight = cellDimensions.height;

    halfCircleData[0] += 1
    halfCircleData[1] += 1

    arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius);

    pie = d3.layout.pie()
      .startAngle(.5 * Math.PI)
      .endAngle(-.5 * Math.PI)
      .value(function (d) { return d.apples; })

    pie2 = d3.layout.pie()
      .startAngle(0.5 * Math.PI)
      .endAngle(1.5 * Math.PI)
      .value(function (d) { return d.apples; })
      .sort(null);

    let halfCircle = mainSvg.selectAll('.halfCirlce').data(halfCircleData)

    const halfCircleEnter = halfCircle
      .enter()
      .append('svg')
      .classed("halfCirlce", true)
      .attr("width", '100%')
      .attr("height", '100%')
      .style('overflow', 'visible')

    let gridSize = document.getElementById("crack").getBoundingClientRect();
    const gridHeight = gridSize.height;
    const gridWidth = gridSize.width;

    const g = mainSvg.selectAll('g').data(halfCircleData)
      .classed("top", (d, i) => i === 0)
      .classed("bottom", (d, i) => i !== 0)
      .attr("transform", `translate(${((tealCircleData[0].x + cellWidth / 2) * (gridWidth / 100)).toFixed(2)}, ${((tealCircleData[0].y + cellHeight / 2) * (gridHeight / 100)).toFixed(2)})rotate(${getRotateAmount(currentKeyCode)})`)
      .style('overflow', 'visible')

    halfCircleEnter
      .append("g")
      .classed("top", (d, i) => i === 0)
      .classed("bottom", (d, i) => i !== 0)
      .attr("transform", `translate(${((tealCircleData[0].x + cellWidth / 2) * (gridWidth / 100)).toFixed(2)}, ${((tealCircleData[0].y + cellHeight / 2) * (gridHeight / 100)).toFixed(2)})rotate(${getRotateAmount(currentKeyCode)})`)
      .style('overflow', 'visible')

    halfCircle.exit().remove()
    g.exit().remove()

    topPath = d3.select("body").selectAll('.top').datum(pacmanData).selectAll("path")
      .data(pie)

    let _topPathExisting = topPath
      .attr("fill", function (d, i) { return 'red'; })
      .style("opacity", (d, i) => i === 0 ? '1' : '0')
      .attr("d", arc)
      .each(function (d) { this._current = d; });

    let _topPathEnter = topPath
      .enter().append("path")
      .attr("fill", function (d, i) { return 'red'; })
      .style("opacity", (d, i) => i === 0 ? '1' : '0')
      .attr("d", arc)
      .each(function (d) { this._current = d; });

    bottomPath = d3.select("body").selectAll('.bottom').datum(pacmanData).selectAll("path")
      .data(pie2)

    let _bottomPathExisting = bottomPath
      .attr("fill", function (d, i) { return 'red'; })
      .style("opacity", (d, i) => i === 0 ? '1' : '0')
      .attr("d", arc)
      .each(function (d) { this._current = d; });

    let _bottomPathEnter = bottomPath
      .enter().append("path")
      .attr("fill", function (d, i) { return 'red'; })
      .style("opacity", (d, i) => i === 0 ? '1' : '0')
      .attr("d", arc)
      .each(function (d) { this._current = d; });

    d3.selectAll("input")
      .on("change", change);
  }

  function change() {
    var value = this.value;
    pie.value(function (d) { return d[value]; }); // change the value function
    topPath = topPath.data(pie); // compute the new angles
    topPath.transition().duration(250).attrTween("d", arcTween); // redraw the arcs
    pie2.value(function (d) { return d[value]; }); // change the value function
    bottomPath = bottomPath.data(pie2); // compute the new angles
    bottomPath.transition().duration(250).attrTween("d", arcTween); // redraw the arcs
  }

  pacmanUpdate()

  setInterval(function () {
    switch (currentKeyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        if (!shouldAnimateMouth) {
          createInterval()
          shouldAnimateMouth = true;
        }
    }

    if (shouldAnimateMouth) {
      const { x, y } = pacManGridCoords

      switch (currentKeyCode) {
        case 37:
        if ( borderDataVerticalMatrix[x][y].hasBorder) {
          d3.select("input[value=\"apples\"]").property("checked", true).each(change);
          return clearInterval(mouthInterval);
        }
          pacManGridCoords.x -= 1
          tealCircleData[0].x -= cellWidth
          if(pacManGridCoords.x < 0) {
            tealCircleData[0].x = 100
            pacManGridCoords.x = numCols
          }
          break;
        case 38:
          if (borderDataHorizontalMatrix[y][x].hasBorder) {
            d3.select("input[value=\"apples\"]").property("checked", true).each(change);
            return clearInterval(mouthInterval);
          }
          pacManGridCoords.y -= 1
          tealCircleData[0].y -= cellHeight
          if (tealCircleData[0].y <= 0) {
            d3.select("input[value=\"apples\"]").property("checked", true).each(change);
            clearInterval(mouthInterval)
            tealCircleData[0].y = 0
          }
          break;
        case 39:
        if (borderDataVerticalMatrix[x+1][y].hasBorder) {
          d3.select("input[value=\"apples\"]").property("checked", true).each(change);
          return clearInterval(mouthInterval);
        } 
          pacManGridCoords.x += 1
          tealCircleData[0].x += cellWidth
          if (pacManGridCoords.x >= numCols) {
            clearInterval(mouthInterval)
            tealCircleData[0].x = 0
            pacManGridCoords.x = 0
          }
          break;
        case 40:
          if (borderDataHorizontalMatrix[y + 1][x].hasBorder) {
            return clearInterval(mouthInterval);
          }
          pacManGridCoords.y += 1
          tealCircleData[0].y += cellHeight
          if (tealCircleData[0].y > 100) {
            clearInterval(mouthInterval)
            tealCircleData[0].y = 100 - cellHeight
          }
          break;
        default:
      }

      if (pacManGridCoords.x < 0) {
        pacManGridCoords.x = 0
      }

      if (pacManGridCoords.y < 0) {
        pacManGridCoords.y = 0
      }
    }

    const circleCompensation = 5;
    const indexToRemove = rectData.findIndex(element => element.xAxis === pacManGridCoords.x && element.yAxis === pacManGridCoords.y)
    if (indexToRemove !== -1) {
      if(!rectData[indexToRemove].special) {
        score ++
      } else {

        score += 10;
      }
      rectData.splice(indexToRemove, 1);
      update()

    }

    pacmanUpdate()


  }, 130);

  window.addEventListener("keydown", (ev) => {
    switch (ev.keyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        currentKeyCode = ev.keyCode
        shouldAnimateMouth = true;
    }
    pacmanUpdate()
  });

  window.addEventListener("keyup", (ev) => {
    d3.select("input[value=\"apples\"]").property("checked", true);

    switch (ev.keyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        if (shouldAnimateMouth) {
          clearInterval(mouthInterval)
          shouldAnimateMouth = false;
        }
      default:
    }
  });

});