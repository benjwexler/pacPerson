
import getColor from './utils/getColor.js';
import getAndSetFlashing from './utils/getAndSetFlashing.js';

let fakeBodyData = [0];

const getCoordY = (offsetY, _cellWidth) => offsetY * _cellWidth;
const getCoordX = (offsetX, _cellHeight) => offsetX * _cellHeight;
const degToRadians = deg => deg * (Math.PI / 180);

export default function updateGhost(ghost, dimensions, timer) {
  let {ghostNum, ghostRadius: radius, ghostDiameter: diameter, ghostCoords: coords} = ghost;
  let isInCenter = true;
  let { cellWidth, cellHeight } = dimensions;
  let flashingAmount = getAndSetFlashing(ghost)
  let height = radius / 2;
  let offsetX = cellWidth / 2
  let offsetY = cellHeight / 2
  let color = getColor(timer, flashingAmount, ghost.color)
  let svg;
  let {coordX, coordY} = coords;
    var group = d3.select("#board").selectAll(`.group${ghostNum}`).data(fakeBodyData)

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

  return svg;
};
