
// let pie;
// let pie2;
// let topPath;
// let bottomPath;
// let arc;

// const halfCircleData = [1, 2]
// const pacmanData = [
//   {apples: 75, oranges: 100},
//   {apples: 25, oranges: 0}
// ]

var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};



domReady(function () {

  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }

  let timeout = setInterval(function() {
    if(!d3.select("input[value=\"oranges\"]")[0][0].checked) {
      return d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
    }
  
    return d3.select("input[value=\"apples\"]").property("checked", true).each(change);
    
  }, 250);


const circleSize =  document.querySelector('.circle').getBoundingClientRect()

let circleWidth = circleSize.width;
let circleHeight = circleSize.height
let _circleDiameter = circleWidth < circleHeight ? circleWidth : circleHeight;
let radius = _circleDiameter

  window.addEventListener("resize", () => {
  const circleSize =  document.querySelector('.circle').getBoundingClientRect()
  circleWidth = circleSize.width;
  circleHeight = circleSize.height
    _circleDiameter = circleSize.width < circleSize.height ? circleSize.width : circleSize.height;
    radius = _circleDiameter
    pacmanUpdate()
  });

  var mainSvg = d3.select("#crack")
  .append("svg")
  .classed("mainSvg", true)
  .attr("width", '100%')
    .attr("height", '100%')
    .style('overflow', 'visible')

const pacmanUpdate = () => {
var color = 'yellow';

arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(radius);

pie = d3.layout.pie()
.startAngle(.5 * Math.PI)
	.endAngle(-.5 * Math.PI)
    .value(function(d) { return d.apples; })

    pie2 = d3.layout.pie()
    .startAngle(0.5 * Math.PI)
      .endAngle(1.5 * Math.PI)
        .value(function(d) { return d.apples; })
        .sort(null);


let halfCircle = mainSvg.selectAll('.halfCirlce').data(halfCircleData)

const halfCircleEnter = halfCircle
  .enter()
  .append('svg')
  .classed("halfCirlce", true)
  .attr("width", '50%')
    .attr("height", '50%')
    .style('overflow', 'visible')

const g = mainSvg.selectAll('g').data(halfCircleData)
.classed("top", (d, i) => i===0)
    .classed("bottom", (d, i) => i!==0)
    .attr("transform", "translate(" + circleWidth + "," + circleHeight + ")")
    .style('overflow', 'visible')

    halfCircleEnter
    .append("g")
    .classed("top", (d, i) => i===0)
    .classed("bottom", (d, i) => i!==0)
    .attr("transform", "translate(" + circleWidth + "," + circleHeight + ")")
    .style('overflow', 'visible')

    // halfCircle.exit().remove()
    // g.exit().remove()

topPath = d3.select("body").selectAll('.top').datum(pacmanData).selectAll("path")
.data(pie)

let _topPathExisting = topPath
.attr("fill", function(d, i) { return color(i); })
  .style("opacity", (d, i) => i===0 ? '1' : '0')
  .attr("d", arc)
  .each(function(d) { this._current = d; });

let _topPathEnter = topPath
.enter().append("path")
  .attr("fill", function(d, i) { return color(i); })
  .style("opacity", (d, i) => i===0 ? '1' : '0')
  .attr("d", arc)
  .each(function(d) { this._current = d; });

  bottomPath = d3.select("body").selectAll('.bottom').datum(pacmanData).selectAll("path")
.data(pie2)

let _bottomPathExisting = bottomPath
.attr("fill", function(d, i) { return color(i); })
  .style("opacity", (d, i) => i===0 ? '1' : '0')
  .attr("d", arc)
  .each(function(d) { this._current = d; });

let _bottomPathEnter = bottomPath
.enter().append("path")
  .attr("fill", function(d, i) { return color(i); })
  .style("opacity", (d, i) => i===0 ? '1' : '0')
  .attr("d", arc)
  .each(function(d) { this._current = d; });

  d3.selectAll("input")
  .on("change", change);
}

function change() {
  var value = this.value;
  pie.value(function(d) { return d[value]; }); // change the value function
  topPath = topPath.data(pie); // compute the new angles
  topPath.transition().duration(250).attrTween("d", arcTween); // redraw the arcs
  pie2.value(function(d) { return d[value]; }); // change the value function
  bottomPath = bottomPath.data(pie2); // compute the new angles
  bottomPath.transition().duration(250).attrTween("d", arcTween); // redraw the arcs
}

pacmanUpdate()

})