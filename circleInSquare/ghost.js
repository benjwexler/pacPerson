
import createBorderHorizontal from './createBorderHorizontal.js';
import createBorderVertical from './createBorderVertical.js';
import { numRows, numCols } from './variables.js';

export function ghost(ghostNum, color) {
  const getCoordY = (offsetY, _cellWidth) => offsetY * _cellWidth;
  const getCoordX = (offsetX, _cellHeight) => offsetX * _cellHeight;
  const degToRadians = deg => deg * (Math.PI / 180);

  let { width: cellWidth, height: cellHeight } = d3.select('.cell').node().getBoundingClientRect();

  // let borderDataHorizontalMatrix = createBorderHorizontal(cellWidth, cellHeight, numRows, numCols);
  let borderDataVerticalMatrix = createBorderVertical(100 / numCols, 100 / numRows, numRows, numCols);
  let borderDataHorizontalMatrix = createBorderHorizontal(100 / numCols, 100 / numRows, numRows, numCols);


  const offsetX = cellWidth / 2;
  const offsetY = cellHeight / 2;
  let radius = cellHeight < cellWidth ? cellHeight / 4 : cellWidth / 4;
  radius = radius * 1.5
  const diameter = radius * 2;
  let coordX = 0;
  let coordY = 0;
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

    var group = d3.select("#crack").selectAll(`.group${ghostNum}`).data(fakeBodyData)

    group.enter()
      .append("g")
      .classed(`group${ghostNum}`, true)
      .attr('transform', `translate(${getCoordX(coordX, cellWidth)}, ${getCoordY(coordY, cellHeight)})`)

    group
      .attr('transform', `translate(${getCoordX(coordX, cellWidth)}, ${getCoordY(coordY, cellHeight)})`)

    var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(degToRadians(-90))
      .endAngle(degToRadians(90))

    var rectangle = group.selectAll(`.ghostRect${ghostNum}`)
      .data(fakeBodyData)

    rectangle.enter()
      .append("rect")
      .classed(`ghostRect${ghostNum}`, true)
      .attr("x", (radius * -1) + offsetX)
      .attr("y", 0 + offsetY)
      .attr('id', 'group')
      .attr("width", diameter)
      .attr("height", height)
      .style("fill", `${color}`)

    rectangle
      .attr("x", (radius * -1) + offsetX)
      .attr("y", 0 + offsetY)
      .attr('id', 'group')
      .attr("width", diameter)
      .attr("height", height)
      .style("fill", `${color}`)

    rectangle.exit().remove()

    const topArc = group.selectAll(`.topArc${ghostNum}`)
      .data(fakeBodyData)

    topArc.enter().append("path")
      .classed(`topArc${ghostNum}`, true)
      .attr("d", arc)
      .style("fill", `${color}`)
      .attr('transform', `translate(${offsetX}, ${offsetY + 0})`)

    topArc
      .attr("d", arc)
      .style("fill", `${color}`)
      .attr('transform', `translate(${offsetX}, ${offsetY + 0})`)

    svg = group.selectAll(`.svg${ghostNum}`)
      .data(fakeBodyData)

    svg.enter()
      .append("svg")
      .classed(`svg${ghostNum}`, true)
      .attr("height", height)
      .attr('y', height + offsetY)
      .attr("x", radius * -1)

    svg
      .attr("height", height)
      .attr('y', height + offsetY)
      .attr("x", radius * -1)

    const leftEye = group.selectAll(`.leftEye${ghostNum}`)
      .data(fakeBodyData)

    leftEye
      .enter()
      .append("ellipse")
      .classed(`leftEye${ghostNum}`, true)
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

    const leftInnerEye = group.selectAll(`.leftInnerEye${ghostNum}`)
      .data(fakeBodyData)

    leftInnerEye.enter()
      .append("ellipse")
      .classed(`leftInnerEye${ghostNum}`, true)
      .attr("cx", function (d) {
        return ((radius / 4) * -1);
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1);
      })
      .style("fill", `${color}`)
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
      .style("fill", `${color}`)
      .attr("rx", (radius / 6) / 2)
      .attr("ry", (radius / 6) / 2)
      .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`)

    const rightEye = group.selectAll(`.rightEye${ghostNum}`)
      .data(fakeBodyData)

    rightEye.enter()
      .append("ellipse")
      .classed(`rightEye${ghostNum}`, true)
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

    const rightInnerEye = group.selectAll(`.rightInnerEye${ghostNum}`)
      .data(fakeBodyData)

    rightInnerEye.enter()
      .append("ellipse")
      .classed(`rightInnerEye${ghostNum}`, true)
      .attr("cx", function (d) {
        return ((radius / 4) * 1);
      })
      .attr("cy", function (d) {
        return ((radius / 3) * -1);
      })
      .style("fill", `${color}`)
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
      .style("fill", `${color}`)
      .attr("rx", (radius / 6) / 2)
      .attr("ry", (radius / 6) / 2)
      .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`)
  }

  // let randomNumber = (Math.floor(Math.random() * 4)) + 1;
  let previousDirection;



  const setCoordAndUpdate = () => {

    const getDirection = () => {
      const randomNumber = (Math.floor(Math.random() * 4)) + 1;
      const cannotMove = {
        1: borderDataVerticalMatrix[coordX][coordY],
        2: borderDataHorizontalMatrix[coordY][coordX],
        3: borderDataVerticalMatrix[coordX + 1][coordY],
        4: borderDataHorizontalMatrix[coordY + 1][coordX],
      }

      const preventPreviousDirection = {
        1: 3,
        2: 4,
        3: 1,
        4: 2,
      };

      if (cannotMove[randomNumber].hasBorder || randomNumber === preventPreviousDirection[previousDirection]) {
        return getDirection();
      }
      const mutateInstructions = {
        1: () => coordX - 1 >= 0 ? coordX -= 1 : coordX = numCols-1,
        2: () => coordY -= 1,
        3: () => coordX + 1 < numCols ? coordX += 1 : coordX = 0,
        4: () => coordY += 1,
      };

      mutateInstructions[randomNumber]();
      previousDirection = randomNumber;
      update()

    }
    getDirection();
  }

  setInterval(setCoordAndUpdate, 400)

  const addleg = () => {
    const leg = svg.selectAll(`.legSvg${ghostNum}`)
      .data(fakeData)

    leg.exit().remove()

    leg.enter().append('path')
      .classed(`legSvg${ghostNum}`, true)
      .attr("y", height)
      .attr('d', curveFunc(leg1Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)

    leg
      .attr("y", height)
      .attr('d', curveFunc(leg1Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)

    const leg2 = svg.selectAll(`.legSvg2${ghostNum}`)
      .data(fakeData)

    leg2.exit().remove()

    leg2.enter().append('path')
      .classed(`legSvg2${ghostNum}`, true)
      .attr("y", height)
      .attr('d', curveFunc(leg2Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)

    leg2
      .attr("y", height)
      .attr('d', curveFunc(leg2Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)

    const leg3 = svg.selectAll(`.legSvg3${ghostNum}`)
      .data(fakeData)

    leg3.exit().remove()

    leg3.enter().append('path')
      .classed(`legSvg3${ghostNum}`, true)
      .attr("y", height)
      .attr('d', curveFunc(leg3Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)

    leg3
      .attr("y", height)
      .attr('d', curveFunc(leg3Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)

    const leg4 = svg.selectAll(`.legSvg4${ghostNum}`)
      .data(fakeData)

    leg4.exit().remove()

    leg4.enter().append('path')
      .classed(`legSvg4${ghostNum}`, true)
      .attr("y", height)
      .attr('d', curveFunc(leg4Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)

    leg4
      .attr("y", height)
      .attr('d', curveFunc(leg4Data))
      .attr('stroke', `${color}`)
      .attr('fill', `${color}`)
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
