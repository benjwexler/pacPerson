
import {
  cellHeightPercentageInt,
  cellWidthPercentageInt,
} from '../constants.js';
import getRotateAmount from './getRotateAmount.js'

const updatePacman = ({
  dimensions,
  mainSvg,
  pacman,
  pacmanData,
}) => {
  const {radius, coords, direction } = pacman;
  const {height: gridHeight, width: gridWidth} = dimensions;

  let pie;
  let pie2;
  let topPath;
  let bottomPath;
  let arc;

  const halfCircleData = [1, 2];
  
    arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius*1.5);

    pie = d3.layout.pie()
      .startAngle(.5 * Math.PI)
      .endAngle(-.5 * Math.PI)
      .value(function (d) { return d.ratio; })

    pie2 = d3.layout.pie()
      .startAngle(0.5 * Math.PI)
      .endAngle(1.5 * Math.PI)
      .value(function (d) { return d.ratio; })
      .sort(null);

    let halfCircle = mainSvg.selectAll('.halfCircle').data(halfCircleData)

    const halfCircleEnter = halfCircle
      .enter()
      .append('svg')
      .classed("halfCircle", true)
      .attr("width", '100%')
      .attr("height", '100%')
      .style('overflow', 'visible')
      

    const xTranslate = (coords.x * cellWidthPercentageInt) + cellWidthPercentageInt / 2;
    const yTranslate = (coords.y * cellHeightPercentageInt) + cellHeightPercentageInt / 2;

    const g = mainSvg.selectAll('g').data(halfCircleData)
      .classed("top", (d, i) => i === 0)
      .classed("bottom", (d, i) => i !== 0)
      .attr("transform", `translate(${((xTranslate) * (gridWidth / 100)).toFixed(2)}, ${((yTranslate) * (gridHeight / 100)).toFixed(2)})rotate(${getRotateAmount(direction)})`)
      .style('overflow', 'visible')

    halfCircleEnter
      .append("g")
      .classed("top", (d, i) => i === 0)
      .classed("bottom", (d, i) => i !== 0)
      .attr("transform", `translate(${((xTranslate) * (gridWidth / 100)).toFixed(2)}, ${((yTranslate) * (gridHeight / 100)).toFixed(2)})rotate(${getRotateAmount(direction)})`)
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
}

export default updatePacman;
