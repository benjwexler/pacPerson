

var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {

  const radius = 80;
  const diameter = radius * 2;

  var vis = d3.select("body").append("svg")
    .attr("style", "position: absolute; top: 200; left: 200; overflow: visible")

  const degToRadians = deg => deg * (Math.PI / 180)

  const height = radius / 2;

  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(radius)
    .startAngle(degToRadians(-90))
    .endAngle(degToRadians(90))

  var rectangle = vis.append("rect")
    .attr("x", radius * -1)
    .attr("y", 0)
    .attr('id', 'vis')
    .attr("width", diameter)
    .attr("height", height);


  vis.append("path")
    .attr("d", arc)

  const leg1DataX0 = (diameter / 4) * 1;
  const leg1DataX1 = (diameter / 4) * 0;

  const leg2DataX0 = (diameter / 4) * 2;
  const leg2DataX1 = (diameter / 4) * 1;

  const leg3DataX0 = (diameter / 4) * 3;
  const leg3DataX1 = (diameter / 4) * 2;

  const leg4DataX0 = (diameter / 4) * 4;
  const leg4DataX1 = (diameter / 4) * 3;



  var leg1Data = [{ x: leg1DataX0, y: 0 }, { x: leg1DataX1, y: height }]

  var leg2Data = [{ x: leg2DataX0, y: 0 }, { x: leg2DataX1, y: height }]

  var leg3Data = [{ x: leg3DataX0, y: 0 }, { x: leg3DataX1, y: height }]

  var leg4Data = [{ x: leg4DataX0, y: 0 }, { x: leg4DataX1, y: height }]

  var svg = vis.append("svg")
    .attr("height", height)
    .attr('y', height)
    .attr("x", radius * -1)


  const leftEye = vis.append("ellipse")
    .attr("cx", function (d) {
      return (radius / 4) * -1;
    })
    .attr("cy", function (d) {
      return (radius / 3) * -1;
    })
    .style("fill", "white")
    .attr("rx", radius / 6)
    .attr("ry", radius / 4)

  
   const leftInnerEye =  vis.append("ellipse")
    .attr("cx", function (d) {
      return ((radius / 4) * -1);
    })
    .attr("cy", function (d) {
      return ((radius / 3) * -1);
    })
    .style("fill", "blue")
    .attr("rx", (radius / 6)/2)
    .attr("ry", (radius / 6)/2);


    const rightEye = vis.append("ellipse")
    .attr("cx", function (d) {
      return (radius / 4) * 1;
    })
    .attr("cy", function (d) {
      return (radius / 3) * -1;
    })
    .style("fill", "white")
    .attr("rx", radius / 6)
    .attr("ry", radius / 4);

    const rightInnerEye =  vis.append("ellipse")
    .attr("cx", function (d) {
      return ((radius / 4) * 1);
    })
    .attr("cy", function (d) {
      return ((radius / 3) * -1);
    })
    .style("fill", "blue")
    .attr("rx", (radius / 6)/2)
    .attr("ry", (radius / 6)/2);


  let fakeData = [0]

  var curveFunc = d3.svg.area()
    .x1(function (d) { return d.x })      // Position of both line breaks on the X axis
    .y1(function (d) { return d.y })     // Y position of top line breaks
    .y0(0)
    .x0(function (d) { return d.x })

  const addleg = () => {
    const leg = svg.selectAll('.legSvg')
      .data(fakeData)

    leg.exit().remove()

    leg.enter().append('path')
      .classed("legSvg", true)
      .attr("y", height)
      .attr('d', curveFunc(leg1Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');

    leg
      .attr("y", height)
      .attr('d', curveFunc(leg1Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');

    const leg2 = svg.selectAll('.legSvg2')
      .data(fakeData)

    leg2.exit().remove()

    leg2.enter().append('path')
      .classed("legSvg2", true)
      .attr("y", height)
      .attr('d', curveFunc(leg2Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');

    leg2
      .attr("y", height)
      .attr('d', curveFunc(leg2Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');

    const leg3 = svg.selectAll('.legSvg3')
      .data(fakeData)

    leg3.exit().remove()

    leg3.enter().append('path')
      .classed("legSvg3", true)
      .attr("y", height)
      .attr('d', curveFunc(leg3Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');

    leg3
      .attr("y", height)
      .attr('d', curveFunc(leg3Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');


    const leg4 = svg.selectAll('.legSvg4')
      .data(fakeData)

    leg4.exit().remove()

    leg4.enter().append('path')
      .classed("legSvg4", true)
      .attr("y", height)
      .attr('d', curveFunc(leg4Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');

    leg4
      .attr("y", height)
      .attr('d', curveFunc(leg4Data))
      .attr('stroke', 'black')
      .attr('fill', 'black');
  }

  const updateLeg = () => {
    fakeData[0] += 1

    if (fakeData[0] % 2 === 0) {
      leg1Data[1].x = leg1DataX0
      leg1Data[0].x = leg1DataX1

      leg2Data[1].x = leg2DataX0
      leg2Data[0].x = leg2DataX1

      leg3Data[0].x = leg3DataX0
      leg3Data[1].x = leg3DataX1

      leg4Data[0].x = leg4DataX0
      leg4Data[1].x = leg4DataX1


    } else {
      leg1Data[1].x = leg1DataX1
      leg1Data[0].x = leg1DataX0

      leg2Data[0].x = leg2DataX0
      leg2Data[1].x = leg2DataX1

      leg3Data[1].x = leg3DataX0
      leg3Data[0].x = leg3DataX1

      leg4Data[1].x = leg4DataX0
      leg4Data[0].x = leg4DataX1
    }

    addleg()
  }

  setInterval(updateLeg, 200)

})




