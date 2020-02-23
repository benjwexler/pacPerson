
import getColor from './utils/getColor.js';

var curveFunc = d3.svg.area()
  .x1(function (d) { return d.x })      // Position of both line breaks on the X axis
  .y1(function (d) { return d.y })     // Y position of top line breaks
  .y0(0)
  .x0(function (d) { return d.x })

const updateLegs = ({
  svg,
  ghost,
  boardInfo,
  ghosts,
}) => {
  let { ghostNum, flashingAmount } = ghost;
  let height = ghost.ghostRadius / 2;
  let legsDataX = ghost.legsDataX;
  let dimensions = boardInfo.dimensions;
  let { cellWidth } = dimensions;
  let color = getColor(ghosts.invincibleTimer, flashingAmount, ghost.color)
  let offsetX = cellWidth / 2
  let [leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1] = legsDataX;
  let leg1Data = [{ x: leg1DataX0, y: 0 }, { x: leg1DataX1, y: height }]
  let leg2Data = [{ x: leg2DataX0, y: 0 }, { x: leg2DataX1, y: height }]
  let leg3Data = [{ x: leg3DataX0, y: 0 }, { x: leg3DataX1, y: height }]
  let leg4Data = [{ x: leg4DataX0, y: 0 }, { x: leg4DataX1, y: height }]
  let fakeData = [0];

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

  const update = () => {
    color = getColor(ghosts.invincibleTimer, ghost.flashingAmount, ghost.color)
    dimensions = boardInfo.dimensions;
    height = ghost.ghostRadius / 2;
    legsDataX = ghost.legsDataX;
    let [leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1] = legsDataX;

    offsetX = dimensions.cellWidth / 2
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

  setInterval(update, 200)

};

export default updateLegs;