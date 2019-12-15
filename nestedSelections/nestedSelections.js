
var matrix = [
  [ 0,  1,  2,  3],
  [ 4,  5,  6,  7],
  [ 8,  9, 10, 11],
  [12, 13, 14, 15],
];

// var td = d3.selectAll("tbody tr").selectAll("td");

var td = d3.selectAll("tbody tr")
    .data(matrix)
  .selectAll("td")
    .data(function(d, i) { return d; }); // d is matrix[i]

// td.style("color", function(d, i, j) { 
//   console.log('d', d);
//   console.log('i', i)
//   console.log('j', j)
//   return i || j ? null : "red"; 
// });

