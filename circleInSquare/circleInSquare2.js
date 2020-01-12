// Fire when DOM is available
const numRows = 28;
const numCols = 24

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



const noCircleCoords = [
]



for(let x=5; x<15; x++) {

  for(let y=3; y<8; y++) {
    noCircleCoords.push({x, y})
  }
}

const createRectData = () => {
  let xAxis = 0;
  let yAxis = 0;

  let arr = []

  const width = cellWidth * xAxis;
  let count = 0;
  while ((cellWidth * xAxis + 1) <= 100 && (cellHeight * yAxis + 1) <= 100) {
    count++


    arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })
    // rectData.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })
    const shouldAddCircle = noCircleCoords.findIndex(coords => coords.x === xAxis && coords.y === yAxis)
    if(shouldAddCircle === -1) {
      // arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })
      rectData.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })
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
      // borderDataHorizontal.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis })
      let hasBorder = false;
      borderDataHorizontal.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis })

      if ((xAxis >= borderTopXstart && xAxis <= borserTopXend)) {
        // borderDataHorizontal.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis })
        // arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis })
        hasBorder = true;
      } else {

      }

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
      // hasBorder = true;
      // borderDataHorizontal.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis })
      // borderDataVertical.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis })
      if ((yAxis >= borderYstart && yAxis <= borderYend)) {
        hasBorder = true;
      } else {

      }
      arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis, hasBorder })
      yAxis += 1

      if (cellHeight * yAxis >= 100) {
        borderDataVerticalMatrix.push(arr)
        
        arr = [];
        yAxis = 0
        xAxis += 1
      }

    }
  }

  createBorderHorizontal()
  createBorderVertical()
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
        .attr("stroke", "white")
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
        .attr("stroke", "white")
    })
  })

  //   borderDataVertical.forEach((piece, i) => {
  //     console.log('i', i)
  //     // if(piece.rowX <= 5) {return}
  //     if(!borderDataVertical[i+1]) {return}
  //     console.log('piece', piece)
  // //     d3.select("#crack").append("line")
  // // .attr("x1", `${piece.x}%`)
  // // .attr("y1", `${piece.y}%`)
  // // .attr("x2", `${borderData[i+1].x}%`)
  // // .attr("y2", `${piece.y}%`)
  // // .attr("stroke-width", 5)
  // // .attr("stroke", "white")
  // // .attr('transform', `translate(0, ${elementSize.height * (cellHeight/200)})`)


  // d3.select("#crack").append("line")
  // .attr("x1", `${piece.x}%`)
  // .attr("y1", `${piece.y}%`)
  // .attr("x2", `${piece.x}%`)
  // .attr("y2", `${borderDataVertical[i+1].y}%`)
  // .attr("stroke-width", 5)
  // .attr("stroke", "white")
  // // .attr('transform', `translate(${elementSize.width * (cellWidth/200)}, 0)`)


  //   })



  // var line = d3.select("#crack").append("line")
  // .attr("x1", 0)
  // .attr("y1", `${cellHeight/2}%`)
  // .attr("x2", '100%')
  // .attr("y2", `${cellHeight/2}%`)
  // .attr("stroke-width", 5)
  // .attr("stroke", "white")
  // .attr("transform", `translate(0, ${cellHeight*elementSize.height/200})`)

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
      .attr('r', d => `${circleRadius}%`)
      .style("fill", "blue")

    selection.exit().remove();
    circles.exit()
      .style("fill", "yellow")
      .transition()
      .style("opacity", 0)
      .duration(150)
      // .delay(25)
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
      .attr('r', d => `${circleRadius}%`)
      .style("fill", "blue")


  }

  update()


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

    }, 200);

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
    var color = d3.scale.category20();

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
    // console.log('borderDataHorizontal', borderDataHorizontal)
    // console.log('borderDataHorizontalMatrix', borderDataHorizontalMatrix)

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
        console.log('left')
        console.log('borderDataVerticalMatrix', borderDataVerticalMatrix)
        // console.log(
        //   'hasBorder', borderDataVerticalMatrix[x-1][y].hasBorder
        // )
        if (!borderDataVerticalMatrix[x-1] || borderDataVerticalMatrix[x-1][y].hasBorder) {
          return clearInterval(mouthInterval);
        }
          pacManGridCoords.x -= 1
          tealCircleData[0].x -= cellWidth
          if (tealCircleData[0].x <= 0) {
            clearInterval(mouthInterval)
            tealCircleData[0].x = 0
          }
          break;
        case 38:
          console.log(
            'hasBorder', borderDataHorizontalMatrix[y - 1][x].hasBorder
          )
          if (borderDataHorizontalMatrix[y - 1][x].hasBorder) {
            return clearInterval(mouthInterval);
          }
          pacManGridCoords.y -= 1
          tealCircleData[0].y -= cellHeight
          if (tealCircleData[0].y <= 0) {
            clearInterval(mouthInterval)
            tealCircleData[0].y = 0
          }
          break;
        case 39:
        console.log(
          'hasBorder', borderDataVerticalMatrix[x+1][y].hasBorder
        )
        if (borderDataVerticalMatrix[x+1][y].hasBorder) {
          return clearInterval(mouthInterval);
        }
          pacManGridCoords.x += 1
          tealCircleData[0].x += cellWidth
          if (tealCircleData[0].x >= 100) {
            clearInterval(mouthInterval)
            tealCircleData[0].x = 100 - cellWidth
          }
          break;
        case 40:
          console.log(
            'hasBorder', borderDataHorizontalMatrix[y + 1][x].hasBorder
          )
          if (borderDataHorizontalMatrix[y + 1][x].hasBorder) {
            return clearInterval(mouthInterval);
          }
          pacManGridCoords.y += 1
          tealCircleData[0].y += cellHeight
          if (tealCircleData[0].y >= 100) {
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



      console.log('pacManGridCoords', pacManGridCoords)

    }

    const circleCompensation = 5;
    const indexToRemove = rectData.findIndex(element => element.x.toFixed(2) === ((tealCircleData[0].x - (0)).toFixed(2)) && (element.y.toFixed(2) === (tealCircleData[0].y - (0)).toFixed(2)))
    if (indexToRemove !== -1) {
      rectData.splice(indexToRemove, 1);
      update()

    }

    pacmanUpdate()



    moveCirlce()

  }, 120);

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


  const moveCirlce = () => {
    d3.select("#crack")
      .selectAll("g svg circle").data(tealCircleData)
      .style('opacity', 0)
      .attr('cx', d => `${d.x}%`)
      .attr('cy', d => `${d.y}%`)
      .attr('r', `${circleRadius / 5}%`)
      .attr("transform", "translate(0," + 0 + ")")
      .style("fill", "teal")
      .enter()
      .append('g')
      .append('svg')
      .append("circle")
      .attr('cx', d => `${d.x}%`)
      .attr('cy', d => `${d.y}%`)
      .attr('r', `${circleRadius / 5}%`)
      .attr("transform", "translate(0," + 00 + ")")
      .style("fill", "teal")
  }
});