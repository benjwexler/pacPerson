import { borderDataHorizontalMatrix, borderDataVerticalMatrix } from "../constants.js";

const updateBorders = () => {
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
};

export default updateBorders;
