import createBorderHorizontal from "./data/createBorderHorizontal.js";
import createBorderVertical from "./data/createBorderVertical.js";
import createDotsData from "./data/createDotsData.js";
export const pacmanData = [
    { ratio: 750 },
    { ratio: 250 }
  ];
export const numCols = 17;
export const numRows = 19;
export const cellHeightPercentageInt = 100 / numRows;
export const cellWidthPercentageInt = 100 / numCols;
export const borderDataHorizontalMatrix = createBorderHorizontal(cellWidthPercentageInt, cellHeightPercentageInt, numRows, numCols);
export const borderDataVerticalMatrix = createBorderVertical(cellWidthPercentageInt, cellHeightPercentageInt, numRows, numCols);
export const dots = createDotsData(cellWidthPercentageInt, cellHeightPercentageInt, numCols);
export const getMainSvg = () => {
  return d3.select("#board")
    .append("svg")
    .classed("mainSvg", true)
    .attr("width", '100%')
    .attr("height", '100%')
    .style('overflow', 'visible')
}

export const mainSvg = getMainSvg();
