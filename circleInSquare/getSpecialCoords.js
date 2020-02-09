export default function getSpecialCoords(numCols) {
  return [
    { xAxis: 0, yAxis: 3 },
    { xAxis: numCols - 1, yAxis: 3 },
    { xAxis: 0, yAxis: 15 },
    { xAxis: numCols - 1, yAxis: 15 },
  ];
};
