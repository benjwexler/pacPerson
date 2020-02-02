
export function ghost() {
  const getCoordY = (offsetY, _cellWidth) => offsetY * _cellWidth;
  const getCoordX = (offsetX, _cellHeight) => offsetX * _cellHeight;
  const degToRadians = deg => deg * (Math.PI / 180);

  let { width: cellWidth, height: cellHeight } = d3.select('.cell').node().getBoundingClientRect();
  const offsetX = cellWidth / 2;
  const offsetY = cellHeight / 2;
  let radius = cellHeight < cellWidth ? cellHeight / 4 : cellWidth / 4;
  radius = radius * 1.5
  const diameter = radius * 2;
  let coordX = 7;
  let coordY = 7;
  const height = radius / 2;
  let fakeData = [0];
  let fakeBodyData = [0];

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

  var curveFunc = d3.svg.area()
    .x1(function (d) { return d.x })      // Position of both line breaks on the X axis
    .y1(function (d) { return d.y })     // Y position of top line breaks
    .y0(0)
    .x0(function (d) { return d.x })

  let svg

  let vis = d3.select("#crack").append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .style('overflow', 'visible')

  const update = () => {

    var group = d3.select("#crack").selectAll('.group').data(fakeBodyData)

    group.enter()
      .append("g")
      .classed('group', true)
      .attr('transform', `translate(${getCoordX(coordX, cellWidth)}, ${getCoordY(coordY, cellHeight)})`)

    group
      .attr('transform', `translate(${getCoordX(coordX, cellWidth)}, ${getCoordY(coordY, cellHeight)})`)

    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(degToRadians(-90))
      .endAngle(degToRadians(90))

    var rectangle = group.selectAll('.ghostRect')
      .data(fakeBodyData)

    rectangle.enter()
      .append("rect")
      .classed('ghostRect', true)
      .attr("x", (radius * -1) + offsetX)
      .attr("y", 0 + offsetY)
      .attr('id', 'group')
      .attr("width", diameter)
      .attr("height", height)
      .style("fill", "blue")

    rectangle
      .attr("x", (radius * -1) + offsetX)
      .attr("y", 0 + offsetY)
      .attr('id', 'group')
      .attr("width", diameter)
      .attr("height", height)
      .style("fill", "blue")

    rectangle.exit().remove()

    const topArc = group.selectAll('.topArc')
      .data(fakeBodyData)

    topArc.enter().append("path")
      .classed('topArc', true)
      .attr("d", arc)
      .style("fill", "blue")
      .attr('transform', `translate(${offsetX}, ${offsetY + 0})`)


    topArc
      .attr("d", arc)
      .style("fill", "blue")
      .attr('transform', `translate(${offsetX}, ${offsetY + 0})`)

    svg = group.selectAll('.svg')
      .data(fakeBodyData)

    svg.enter()
      .append("svg")
      .classed('svg', true)
      .attr("height", height)
      .attr('y', height + offsetY)
      .attr("x", radius * -1)

    svg
      .attr("height", height)
      .attr('y', height + offsetY)
      .attr("x", radius * -1)

    const leftEye = group.selectAll('.leftEye')
      .data(fakeBodyData)

    leftEye
      .enter()
      .append("ellipse")
      .classed('leftEye', true)
      .attr("cx", ((radius / 4) * -1) + offsetX)
      .attr("cy", ((radius / 3) * -1) + offsetY)
      .style("fill", "white")
      .attr("rx", radius / 6)
      .attr("ry", radius / 4)

    leftEye
      .attr("cx", ((radius / 4) * -1) + offsetX)
      .attr("cy", ((radius / 3) * -1) + offsetY)
      .style("fill", "white")
      .attr("rx", radius / 6)
      .attr("ry", radius / 4)



    const leftInnerEye = group.selectAll('.leftInnerEye')
      .data(fakeBodyData)

    leftInnerEye.enter()
      .append("ellipse")
      .classed('leftInnerEye', true)
      .attr("cx", function (d) {
        return ((radius / 4) * -1);
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1);
      })
      .style("fill", "blue")
      .attr("rx", (radius / 6) / 2)
      .attr("ry", (radius / 6) / 2)
      .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`)

    leftInnerEye
      .attr("cx", function (d) {
        return ((radius / 4) * -1);
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1);
      })
      .style("fill", "blue")
      .attr("rx", (radius / 6) / 2)
      .attr("ry", (radius / 6) / 2)
      .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`)

    const rightEye = group.selectAll('.rightEye')
      .data(fakeBodyData)

    rightEye.enter()
      .append("ellipse")
      .classed('rightEye', true)
      .attr("cx", function (d) {
        return ((radius / 4) * 1) + offsetX;
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1) + offsetY;
      })
      .style("fill", "white")
      .attr("rx", radius / 6)
      .attr("ry", radius / 4)

    rightEye
      .attr("cx", function (d) {
        return ((radius / 4) * 1) + offsetX;
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1) + offsetY;
      })
      .style("fill", "white")
      .attr("rx", radius / 6)
      .attr("ry", radius / 4)

    const rightInnerEye = group.selectAll('.rightInnerEye')
      .data(fakeBodyData)

    rightInnerEye.enter()
      .append("ellipse")
      .classed('rightInnerEye', true)
      .attr("cx", function (d) {
        return ((radius / 4) * 1);
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1);
      })
      .style("fill", "blue")
      .attr("rx", (radius / 6) / 2)
      .attr("ry", (radius / 6) / 2)
      .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`)

    rightInnerEye
      .attr("cx", function (d) {
        return ((radius / 4) * 1);
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1);
      })
      .style("fill", "blue")
      .attr("rx", (radius / 6) / 2)
      .attr("ry", (radius / 6) / 2)
      .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`)
  }

  const setCoordAndUpdate = () => {
    coordX += 1
    update()
  }

  setInterval(setCoordAndUpdate, 500)

  const addleg = () => {
    const leg = svg.selectAll('.legSvg')
      .data(fakeData)

    leg.exit().remove()

    leg.enter().append('path')
      .classed("legSvg", true)
      .attr("y", height)
      .attr('d', curveFunc(leg1Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

    leg
      .attr("y", height)
      .attr('d', curveFunc(leg1Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

    const leg2 = svg.selectAll('.legSvg2')
      .data(fakeData)

    leg2.exit().remove()

    leg2.enter().append('path')
      .classed("legSvg2", true)
      .attr("y", height)
      .attr('d', curveFunc(leg2Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

    leg2
      .attr("y", height)
      .attr('d', curveFunc(leg2Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

    const leg3 = svg.selectAll('.legSvg3')
      .data(fakeData)

    leg3.exit().remove()

    leg3.enter().append('path')
      .classed("legSvg3", true)
      .attr("y", height)
      .attr('d', curveFunc(leg3Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

    leg3
      .attr("y", height)
      .attr('d', curveFunc(leg3Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

    const leg4 = svg.selectAll('.legSvg4')
      .data(fakeData)

    leg4.exit().remove()

    leg4.enter().append('path')
      .classed("legSvg4", true)
      .attr("y", height)
      .attr('d', curveFunc(leg4Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')

    leg4
      .attr("y", height)
      .attr('d', curveFunc(leg4Data))
      .attr('stroke', 'blue')
      .attr('fill', 'blue')
  }

  const updateLeg = () => {
    fakeData[0] += 1

    if (fakeData[0] % 2 === 0) {
      leg1Data[1].x = leg1DataX0 + offsetX
      leg1Data[0].x = leg1DataX1 + offsetX

      leg2Data[1].x = leg2DataX0 + offsetX
      leg2Data[0].x = leg2DataX1 + offsetX

      leg3Data[0].x = leg3DataX0 + offsetX
      leg3Data[1].x = leg3DataX1 + offsetX

      leg4Data[0].x = leg4DataX0 + offsetX
      leg4Data[1].x = leg4DataX1 + offsetX

    } else {
      leg1Data[1].x = leg1DataX1 + offsetX
      leg1Data[0].x = leg1DataX0 + offsetX

      leg2Data[0].x = leg2DataX0 + offsetX
      leg2Data[1].x = leg2DataX1 + offsetX

      leg3Data[1].x = leg3DataX0 + offsetX
      leg3Data[0].x = leg3DataX1 + offsetX

      leg4Data[1].x = leg4DataX0 + offsetX
      leg4Data[0].x = leg4DataX1 + offsetX
    }

    addleg()
  }

  setInterval(updateLeg, 200)

};
