
const update = ({
  circleRadius,
  rectData,
  cellHeight,
  cellWidth,
  borderDataHorizontalMatrix,
  borderDataVerticalMatrix,
  score,
  store,
}) => {
  const {getState, subscribe, dispatch} = store;

  var selection = d3.select("#crack")
    .selectAll(".rect").data(rectData, (d) => d.count)
    .attr('x', 0)
    .attr('y', 0)
    .classed('cell', true)
    .classed('rect', true)
    .attr('height', '100%')
    .attr('width', '100%')

  const circles = d3.select("#crack").selectAll(".circle").data(rectData, (d) => d.count)
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
      d3.select("#crack").append("line")
        .attr("x1", `${piece.x}%`)
        .attr("y1", `${piece.y}%`)
        .attr("x2", `${row[i + 1].x}%`)
        .attr("y2", `${piece.y}%`)
        .attr("stroke-width", circleRadius > 8.5 ? 5 : 1)
        .attr("stroke", !piece.isOpening ? "#C7CC56" : 'red')
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
        .attr("stroke-width", circleRadius > 8.5 ? 5 : 1)
        .attr("stroke", "#C7CC56")
    })
  })

  document.getElementById('score').innerText = score;
};

export default update;
