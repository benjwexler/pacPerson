
import createRectData from './createRectData.js';
import createBorderHorizontal from './createBorderHorizontal.js';
import createBorderVertical from './createBorderVertical.js';
import getRotateAmount from './getRotateAmount.js';
import animateSpecialDots from './animateSpecialDots.js';
import update from './update.js';
import getCircleRadius from './getCircleRadius.js';
import getPacmanRadius from './getPacmanRadius.js';
import {numRows, numCols} from './variables.js';

// Fire when DOM is available
export function pacman() {
  let score = 0;
  let cellHeight = 100 / numRows;
  let cellWidth = 100 / numCols;
  let rectData = createRectData(cellWidth, cellHeight, numCols);
  const tealCircleData = [{ x: 0, y: 0, }];
  let pacManGridCoords = { x: 0, y: 0, };

  // Pacman
  // __________

  let pie;
  let pie2;
  let topPath;
  let bottomPath;
  let arc;
  let shouldAnimateMouth = true;
  let currentKeyCode = 38;
  const halfCircleData = [1, 2];
  const pacmanData = [
    { apples: 75, oranges: 100 },
    { apples: 25, oranges: 0 }
  ];

  let circleRadius = getCircleRadius();
  let borderDataHorizontalMatrix = createBorderHorizontal(cellWidth, cellHeight, numRows, numCols);
  let borderDataVerticalMatrix = createBorderVertical(cellWidth, cellHeight, numRows, numCols);

  window.addEventListener("resize", () => {
    circleRadius = getCircleRadius();
    update({
      circleRadius,
      rectData,
      cellHeight,
      cellWidth,
      borderDataHorizontalMatrix,
      borderDataVerticalMatrix,
      score,
    });
  });

  update({
    circleRadius,
    rectData,
    cellHeight,
    cellWidth,
    borderDataHorizontalMatrix,
    borderDataVerticalMatrix,
    score,
  })
  animateSpecialDots();

  let mouthInterval;
  const createInterval = () => {
    mouthInterval = setInterval(function () {
      if (!d3.select("input[value=\"oranges\"]")[0][0].checked) {
        return d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
      }
      return d3.select("input[value=\"apples\"]").property("checked", true).each(change);
    }, 195);

  }

  createInterval()
  let radius = getPacmanRadius();

  window.addEventListener("resize", () => {
    radius = getPacmanRadius();
    pacmanUpdate()
  });

  var mainSvg = d3.select("#crack")
    .append("svg")
    .classed("mainSvg", true)
    .attr("width", '100%')
    .attr("height", '100%')
    .style('overflow', 'visible')

  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return arc(i(t));
    };
  };

  const pacmanUpdate = () => {
    arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius*1.5);

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
          if (borderDataVerticalMatrix[x][y].hasBorder) {
            d3.select("input[value=\"apples\"]").property("checked", true).each(change);
            return clearInterval(mouthInterval);
          }
          pacManGridCoords.x -= 1
          tealCircleData[0].x -= cellWidth
          if (pacManGridCoords.x < 0) {
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
          if (borderDataVerticalMatrix[x + 1][y].hasBorder) {
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

    const indexToRemove = rectData.findIndex(element => element.xAxis === pacManGridCoords.x && element.yAxis === pacManGridCoords.y);
    if (indexToRemove !== -1) {
      if (!rectData[indexToRemove].special) {
        score++
      } else {
        score += 10;
      }
      rectData.splice(indexToRemove, 1);
      update({
        circleRadius,
        rectData,
        cellHeight,
        cellWidth,
        borderDataHorizontalMatrix,
        borderDataVerticalMatrix,
        score,
      })
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
}
