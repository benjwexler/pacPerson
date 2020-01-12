
var matrix = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];


const update = () => {
  var tr = d3.select("table tbody").selectAll("tr")
    .data(matrix)
    .enter().append("tr");

  var td = tr.selectAll("td")
    .data(function (d) { return d; })
    .enter().append("td")
    .text(d => d)
}

window.addEventListener("click", () => {
  matrix.push([6,7,8,9])
  update()
})

update()







