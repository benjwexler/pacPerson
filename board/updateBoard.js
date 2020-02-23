import getCircleRadius from "./getCircleRadius.js";
import {
  numCols,
  numRows,
  cellHeightPercentageInt as cellHeight,
  cellWidthPercentageInt as cellWidth,
  borderDataHorizontalMatrix,
  borderDataVerticalMatrix,
} from '../constants.js';

const updateBoard = ({
  dimensions,
}, dots) => {
  const {boardDimensions} = dimensions;
  const circleRadius = getCircleRadius(boardDimensions);
  var selection = d3.select("#board")
    .selectAll(".rect").data(dots, (d) => d.count)
    .attr('x', 0)
    .attr('y', 0)
    .classed('cell', true)
    .classed('rect', true)
    .attr('height', '100%')
    .attr('width', '100%')

  const circles = d3.select("#board").selectAll(".circle").data(dots, (d) => d.count)
    .attr('cx', '50%')
    .attr('cy', '50%')
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
    .attr('x', 0)
    .attr('y', 0)
    .classed('rect', true)
    .attr('height', '100%')
    .attr('width', '100%')

  svg.append("circle")
    .classed("circle", true)
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', d => `${!d.special ? circleRadius : circleRadius * 2}%`)
    .classed('special', d => d.special)
    .style("fill", "blue")

  borderDataHorizontalMatrix.forEach(row => {
    row.forEach((piece, i) => {
      if (!piece.hasBorder) return;
      if (!row[i + 1]) { return }
      d3.select("#board").append("line")
        .attr("x1", `${piece.x}%`)
        .attr("y1", `${piece.y}%`)
        .attr("x2", `${row[i + 1].x}%`)
        .attr("y2", `${piece.y}%`)
        .attr("stroke-width", 5)
        .attr("stroke", !piece.isOpening ? "#C7CC56" : 'red')
    })
  })

  borderDataVerticalMatrix.forEach(row => {
    row.forEach((piece, i) => {
      if (!piece.hasBorder) return;
      if (!row[i + 1]) { return }
      d3.select("#board").append("line")
        .attr("x1", `${piece.x}%`)
        .attr("y1", `${piece.y}%`)
        .attr("x2", `${piece.x}%`)
        .attr("y2", `${row[i + 1].y}%`)
        .attr("stroke-width", 5)
        .attr("stroke", "#C7CC56")
    })
  })

  // document.getElementById('score').innerText = score;
};

export default updateBoard;
