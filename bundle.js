(function () {
  'use strict';

  const getCircleRadius = (dimensions) => {
    const diameter = dimensions.width < dimensions.height ? dimensions.width : dimensions.height;
    let circleRadius = diameter / 80;
    return circleRadius;
  };

  const getBorderXobj = (numRows, numCols) => {

    return [
      { y: 0, startX: 0, endX: numCols },

      { y: 1, startX: 1, endX: 3 },
      { y: 3, startX: 1, endX: 3 },

      { y: 1, startX: 4, endX: 7 },
      { y: 3, startX: 4, endX: 7 },

      { y: 1, startX: 10, endX: 13 },
      { y: 3, startX: 10, endX: 13 },

      { y: 4, startX: 12, endX: 13 },
      { y: 9, startX: 12, endX: 13 },

      { y: 6, startX: 10, endX: 12 },
      { y: 7, startX: 10, endX: 12 },

      { y: 7, startX: 0, endX: 3 },
      { y: 9, startX: 0, endX: 3 },

      { y: 10, startX: 0, endX: 3 },
      { y: 12, startX: 0, endX: 3 },

      { y: 13, startX: 1, endX: 3 },
      { y: 15, startX: 1, endX: 3 },
      { y: 16, startX: 1, endX: 3 },
      { y: 18, startX: 1, endX: 3 },


      { y: 16, startX: 4, endX: 7 },
      { y: 18, startX: 4, endX: 7 },

      { y: 16, startX: 14, endX: 16 },
      { y: 18, startX: 14, endX: 16 },

      { y: 15, startX: 6, endX: 11 },
      { y: 14, startX: 6, endX: 8 },
      { y: 14, startX: 9, endX: 11 },

      { y: 12, startX: 8, endX: 9 },

      { y: 3, startX: 8, endX: 9 },


      { y: 4, startX: 1, endX: 3 },
      { y: 6, startX: 1, endX: 3 },

      { y: 4, startX: 4, endX: 5 },
      { y: 9, startX: 4, endX: 5 },

      { y: 6, startX: 5, endX: 7 },
      { y: 7, startX: 5, endX: 7 },

      { y: 4, startX: 6, endX: 11 },
      { y: 5, startX: 6, endX: 8 },
      { y: 5, startX: 9, endX: 11 },

      { y: 7, startX: 8, endX: 9 },

      { y: 4, startX: 15, endX: 16 },

      { y: 7, startX: 14, endX: 18 },
      { y: 9, startX: 14, endX: 18 },

      { y: 10, startX: 14, endX: 18 },
      { y: 12, startX: 14, endX: 18 },


      { y: 1, startX: 14, endX: 16 },
      { y: 3, startX: 14, endX: 16 },

      { y: 4, startX: 14, endX: 16 },
      { y: 6, startX: 14, endX: 16 },

    // center box top
      { y: 8, startX: 6, endX: 8 }, 
      { y: 8, startX: 8, endX: 9, isOpening: true }, // center opening
      { y: 8, startX: 9, endX: 11 }, 



      { y: 11, startX: 6, endX: 11 },


      { y: 10, startX: 4, endX: 5 },
      { y: 15, startX: 4, endX: 5 },

      { y: 12, startX: 5, endX: 7 },
      { y: 13, startX: 5, endX: 7 },

      { y: 13, startX: 14, endX: 16 },
      { y: 15, startX: 14, endX: 16 },

      { y: 16, startX: 10, endX: 13 },
      { y: 18, startX: 10, endX: 13 },

      { y: 10, startX: 12, endX: 13 },
      { y: 15, startX: 12, endX: 13 },

      { y: 12, startX: 10, endX: 12 },
      { y: 13, startX: 10, endX: 12 },

      { y: 16, startX: 8, endX: 9 },

      { y: numRows, startX: 0, endX: numCols },
    ];
  };

  const createBorderHorizontal = (cellWidth, cellHeight, numRows, numCols) => {
    const borderXobj = getBorderXobj(numRows, numCols);
    let xAxis = 0;
    let yAxis = 0;
    const borderDataHorizontalMatrix = [];
    let arr = [];

    while ((cellWidth * xAxis) <= 100 && (cellHeight * yAxis) <= 100) {
      let hasBorder = false;
      arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis, hasBorder });
      xAxis += 1;

      if (cellWidth * xAxis > 100) {
        borderDataHorizontalMatrix.push(arr);
        arr = [];
        yAxis += 1;
        xAxis = 0;
      }
    }

    borderXobj.forEach(border => {
      const row = borderDataHorizontalMatrix[border.y];
      for (let i = border.startX; i < border.endX; i++) {
        row[i].hasBorder = true;
        row[i].isOpening = border.isOpening;
      }
    });
    return borderDataHorizontalMatrix;
  };

  const getBorderYobj = (numRows, numCols) => {
    return [
      { x: 0, startY: 0, endY: 6 },
      { x: 0, startY: 12, endY: numRows },
      { x: 3, startY: 7, endY: 8 },
      { x: 3, startY: 10, endY: 11 },
      { x: numCols, startY: 0, endY: 6 },
      { x: numCols, startY: 12, endY: numRows },
      { x: 1, startY: 1, endY: 2 },
      { x: 3, startY: 1, endY: 2 },
      { x: 1, startY: 13, endY: 14 },
      { x: 3, startY: 13, endY: 14 },
      { x: 1, startY: 16, endY: 17 },
      { x: 3, startY: 16, endY: 17 },
      { x: 4, startY: 16, endY: 17 },
      { x: 7, startY: 16, endY: 17 },
      { x: 4, startY: 1, endY: 2 },
      { x: 7, startY: 1, endY: 2 },
      { x: 8, startY: 0, endY: 2 },
      { x: 9, startY: 0, endY: 2 },
      { x: 10, startY: 1, endY: 2 },
      { x: 13, startY: 1, endY: 2 },
      { x: 13, startY: 4, endY: 8 },
      { x: 12, startY: 4, endY: 5 },
      { x: 12, startY: 7, endY: 8 },
      { x: 10, startY: 6, endY: 6 },
      { x: 8, startY: 12, endY: 13 },
      { x: 9, startY: 12, endY: 13 },
      { x: 6, startY: 14, endY: 14 },
      { x: 11, startY: 14, endY: 14 },
      { x: 4, startY: 10, endY: 14 },
      { x: 5, startY: 10, endY: 11 },
      { x: 5, startY: 13, endY: 14 },
      { x: 7, startY: 12, endY: 12 },
      { x: 14, startY: 1, endY: 2 },
      { x: 16, startY: 1, endY: 2 },
      { x: 14, startY: 4, endY: 5 },
      { x: 16, startY: 4, endY: 5 },
      { x: 14, startY: 16, endY: 17 },
      { x: 16, startY: 16, endY: 17 },
      { x: 1, startY: 4, endY: 5 },
      { x: 3, startY: 4, endY: 5 },
      { x: 4, startY: 4, endY: 8 },
      { x: 5, startY: 4, endY: 5 },
      { x: 5, startY: 7, endY: 8 },
      { x: 6, startY: 4, endY: 4 },
      { x: 7, startY: 6, endY: 6 },
      { x: 11, startY: 4, endY: 4 },
      { x: 8, startY: 5, endY: 6 },
      { x: 9, startY: 5, endY: 6 },
      { x: 6, startY: 8, endY: 10 },
      { x: 11, startY: 8, endY: 10 },
      { x: 14, startY: 7, endY: 8 },
      { x: 14, startY: 10, endY: 11 },
      { x: 14, startY: 13, endY: 14 },
      { x: 16, startY: 13, endY: 14 },
      { x: 10, startY: 16, endY: 17 },
      { x: 13, startY: 16, endY: 17 },
      { x: 13, startY: 10, endY: 14 },
      { x: 12, startY: 10, endY: 11 },
      { x: 12, startY: 13, endY: 14 },
      { x: 10, startY: 12, endY: 12 },
      { x: 8, startY: 16, endY: numRows },
      { x: 9, startY: 16, endY: numRows },
    ]

  };

  const createBorderVertical = (cellWidth, cellHeight, numRows, numCols) => {
    let xAxis = 0;
    let yAxis = 0;
    const borderDataVerticalMatrix = [];
    let arr = [];
    while ((cellWidth * xAxis) <= 100 && (cellHeight * yAxis) <= 100) {
      let hasBorder = false;
      arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, rowX: xAxis, colY: yAxis, hasBorder });
      yAxis += 1;

      if (cellHeight * yAxis > 100) {
        borderDataVerticalMatrix.push(arr);
        arr = [];
        yAxis = 0;
        xAxis += 1;
      }
    }

    const borderYobj = getBorderYobj(numRows, numCols);
    borderYobj.forEach(border => {
      const row = borderDataVerticalMatrix[border.x];
      for (let i = border.startY; i <= border.endY; i++) {
        row[i].hasBorder = true;
      }
    });

    return borderDataVerticalMatrix;
  };

  const generateNoCircleCoords = () => {

      const noCircleCoords = [];
      const addNoCircleCoords = (xStart, yStart, xEnd, yEnd) => {
        for (let x = xStart; x <= xEnd; x++) {
          for (let y = yStart; y <= yEnd; y++) {
            noCircleCoords.push({ x, y });
          }
        }

      };

      addNoCircleCoords(1, 1, 2, 2);
      addNoCircleCoords(4, 1, 6, 2);
      addNoCircleCoords(8, 0, 8, 2);
      addNoCircleCoords(10, 1, 12, 2);
      addNoCircleCoords(14, 1, 15, 2);
      addNoCircleCoords(1, 4, 2, 5);
      addNoCircleCoords(4, 4, 4, 8);
      addNoCircleCoords(5, 6, 6, 6);
      addNoCircleCoords(6, 4, 10, 4);
      addNoCircleCoords(8, 5, 8, 6);
      addNoCircleCoords(10, 6, 12, 6);
      addNoCircleCoords(12, 4, 12, 8);
      addNoCircleCoords(14, 4, 15, 5);
      addNoCircleCoords(0, 7, 2, 8);
      addNoCircleCoords(6, 8, 10, 10);
      addNoCircleCoords(14, 7, 16, 8);
      addNoCircleCoords(0, 10, 2, 11);
      addNoCircleCoords(4, 10, 4, 14);
      addNoCircleCoords(5, 12, 6, 12);
      addNoCircleCoords(6, 14, 10, 14);
      addNoCircleCoords(8, 12, 8, 13);
      addNoCircleCoords(10, 12, 12, 12);
      addNoCircleCoords(12, 10, 12, 14);
      addNoCircleCoords(14, 10, 16, 11);
      addNoCircleCoords(1, 13, 2, 14);
      addNoCircleCoords(1, 16, 2, 17);
      addNoCircleCoords(4, 16, 6, 17);
      addNoCircleCoords(8, 16, 8, 18);
      addNoCircleCoords(10, 16, 12, 17);
      addNoCircleCoords(14, 13, 15, 14);
      addNoCircleCoords(14, 16, 15, 17);

      return noCircleCoords

    };

  function getSpecialCoords(numCols) {
    return [
      { xAxis: 0, yAxis: 3 },
      { xAxis: numCols - 1, yAxis: 3 },
      { xAxis: 0, yAxis: 15 },
      { xAxis: numCols - 1, yAxis: 15 },
    ];
  }

  const createDotsData = (_cellWidth, _cellHeight, numCols) => {
    const specialCoords = getSpecialCoords(numCols);
    const rectData = [];
    const noCircleCoords = generateNoCircleCoords();
    let xAxis = 0;
    let yAxis = 0;
    let arr = [];
    let count = 0;
    while ((_cellWidth * xAxis + 1) <= 100 && (_cellHeight * yAxis + 1) <= 100) {
      count++;
      arr.push({ x: _cellWidth * xAxis, y: _cellHeight * yAxis, count });
      const shouldAddCircle = noCircleCoords.findIndex(coords => coords.x === xAxis && coords.y === yAxis);
      if (shouldAddCircle === -1) {
        rectData.push({ x: _cellWidth * xAxis, y: _cellHeight * yAxis, count, xAxis, yAxis });
      }

      xAxis += 1;
      if (_cellWidth * xAxis >= 100) {
        arr = [];
        yAxis += 1;
        xAxis = 0;
      }
    }
    specialCoords.forEach(coordPair => {
      const specialCircle = rectData.find(e => e.xAxis === coordPair.xAxis && e.yAxis === coordPair.yAxis);
      if (specialCircle) {
        specialCircle.special = true;
      }
    });
    return rectData;
  };

  const pacmanData = [
      { ratio: 750 },
      { ratio: 250 }
    ];
  const numCols = 17;
  const numRows = 19;
  const cellHeightPercentageInt = 100 / numRows;
  const cellWidthPercentageInt = 100 / numCols;
  const borderDataHorizontalMatrix = createBorderHorizontal(cellWidthPercentageInt, cellHeightPercentageInt, numRows, numCols);
  const borderDataVerticalMatrix = createBorderVertical(cellWidthPercentageInt, cellHeightPercentageInt, numRows, numCols);
  const dots = createDotsData(cellWidthPercentageInt, cellHeightPercentageInt, numCols);
  const getMainSvg = () => {
    return d3.select("#board")
      .append("svg")
      .classed("mainSvg", true)
      .attr("width", '100%')
      .attr("height", '100%')
      .style('overflow', 'visible')
  };

  const mainSvg = getMainSvg();

  const updateBoard = ({
    dimensions,
  }, dots) => {
    const {boardDimensions} = dimensions;
    const circleRadius = getCircleRadius(boardDimensions);
    var selection = d3.select("#board")
      .selectAll(".rect").data(dots, (d) => d.count)
      .attr('x', 0)
      .attr('y', 0)
      .classed('cell', true)
      .classed('rect', true)
      .attr('height', '100%')
      .attr('width', '100%');

    const circles = d3.select("#board").selectAll(".circle").data(dots, (d) => d.count)
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', d => `${!d.special ? circleRadius : circleRadius * 2}%`)
      .classed('special', d => d.special)
      .style("fill", "blue");

    selection.exit().remove();
    circles.exit()
      .remove();

    const svg = selection.enter()
      .append('svg')
      .classed('cell', true)
      .attr('x', d => `${d.x}%`)
      .attr('y', d => `${d.y}%`)
      .attr('height', `${cellHeightPercentageInt}%`)
      .attr('width', `${cellWidthPercentageInt}%`);

    svg.append("rect")
      .attr('x', 0)
      .attr('y', 0)
      .classed('rect', true)
      .attr('height', '100%')
      .attr('width', '100%');

    svg.append("circle")
      .classed("circle", true)
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', d => `${!d.special ? circleRadius : circleRadius * 2}%`)
      .classed('special', d => d.special)
      .style("fill", "blue");

   

    // document.getElementById('score').innerText = score;
  };

  const getRotateAmount = (_currentKeycode) => {
      const rotateObj = {
        1: 0,
        2: 90,
        3: 180,
        4: 270,
      };
      return rotateObj[_currentKeycode]
    };

  const updatePacman = ({
    dimensions,
    mainSvg,
    pacman,
    pacmanData,
  }) => {
    const {radius, coords, direction } = pacman;
    const {height: gridHeight, width: gridWidth} = dimensions;

    let pie;
    let pie2;
    let topPath;
    let bottomPath;
    let arc;

    const halfCircleData = [1, 2];
    
      arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius*1.5);

      pie = d3.layout.pie()
        .startAngle(.5 * Math.PI)
        .endAngle(-.5 * Math.PI)
        .value(function (d) { return d.ratio; });

      pie2 = d3.layout.pie()
        .startAngle(0.5 * Math.PI)
        .endAngle(1.5 * Math.PI)
        .value(function (d) { return d.ratio; })
        .sort(null);

      let halfCircle = mainSvg.selectAll('.halfCircle').data(halfCircleData);

      const halfCircleEnter = halfCircle
        .enter()
        .append('svg')
        .classed("halfCircle", true)
        .attr("width", '100%')
        .attr("height", '100%')
        .style('overflow', 'visible');

      const xTranslate = (coords.x * cellWidthPercentageInt) + cellWidthPercentageInt / 2;
      const yTranslate = (coords.y * cellHeightPercentageInt) + cellHeightPercentageInt / 2;

      const g = mainSvg.selectAll('g').data(halfCircleData)
        .classed("top", (d, i) => i === 0)
        .classed("bottom", (d, i) => i !== 0)
        .attr("transform", `translate(${((xTranslate) * (gridWidth / 100)).toFixed(2)}, ${((yTranslate) * (gridHeight / 100)).toFixed(2)})rotate(${getRotateAmount(direction)})`)
        .style('overflow', 'visible');

      halfCircleEnter
        .append("g")
        .classed("top", (d, i) => i === 0)
        .classed("bottom", (d, i) => i !== 0)
        .attr("transform", `translate(${((xTranslate) * (gridWidth / 100)).toFixed(2)}, ${((yTranslate) * (gridHeight / 100)).toFixed(2)})rotate(${getRotateAmount(direction)})`)
        .style('overflow', 'visible');

      halfCircle.exit().remove();
      g.exit().remove();

      topPath = d3.select("body").selectAll('.top').datum(pacmanData).selectAll("path")
        .data(pie);

      let _topPathExisting = topPath
        .attr("fill", function (d, i) { return 'red'; })
        .style("opacity", (d, i) => i === 0 ? '1' : '0')
        .attr("d", arc)
        .each(function (d) { this._current = d; });
        
      let _topPathEnter = topPath
        .enter().append("path")
        .attr("fill", function (d, i) { return 'red'; })
        .style("opacity", (d, i) => i === 0 ? '1' : '0')
        .attr("d", arc)
        .each(function (d) { this._current = d; });

      bottomPath = d3.select("body").selectAll('.bottom').datum(pacmanData).selectAll("path")
        .data(pie2);

      let _bottomPathExisting = bottomPath
        .attr("fill", function (d, i) { return 'red'; })
        .style("opacity", (d, i) => i === 0 ? '1' : '0')
        .attr("d", arc)
        .each(function (d) { this._current = d; });

      let _bottomPathEnter = bottomPath
        .enter().append("path")
        .attr("fill", function (d, i) { return 'red'; })
        .style("opacity", (d, i) => i === 0 ? '1' : '0')
        .attr("d", arc)
        .each(function (d) { this._current = d; });
  };

  const getPacmanRadius = () => {
  const circleSize = document.querySelector('.circle').getBoundingClientRect();
    let circleWidth = circleSize.width;
    let circleHeight = circleSize.height;
    let _circleDiameter = circleWidth < circleHeight ? circleWidth : circleHeight;
    // Pacman is twice the size of a normal circle so that's why the 'radius' is actually the diameter;
    return _circleDiameter;
  };

  class Ghost {
    constructor(ghostNum, color) {
      this.ghostNum = ghostNum;
      this.color = color;
      this.ghostRadius = undefined;
      this.legsDataX = undefined;
      this.flashingAmount = 0;
      this.ghostCoords = { coordX: 8, coordY: 8 };
      this.previousDirection = undefined;
    }
  }

  let ghost1 = new Ghost(1, 'purple');
  let ghost2 = new Ghost(2, 'blue');
  let ghost3 = new Ghost(3, 'green');
  let ghost4 = new Ghost(4, 'pink');

  class Ghosts {
    constructor(ghosts) {
      this.ghosts = ghosts;
      this.invincibleTimer = 0;
    }
  }

  // ghost(3, 'green');
  // ghost(4, 'pink');

  let ghosts = new Ghosts([ghost1, ghost2, ghost3, ghost4]);

  const getPacman = () => {
      return {
      coords: {
        x: 0,
        y: 0,
      },
      lives: 3,
      direction: 1,
      radius: getPacmanRadius(),
      isFacingWall: true,
    };
    };

  const keyDownListener = (pacman) => {
  window.addEventListener("keydown", (ev) => {
      let direction;
      switch (ev.keyCode) {
        case 37:
          direction = 1;
          break;
        case 38:
          direction = 2;
          break;
        case 39:
          direction = 3;
          break;
        case 40:
          direction = 4;
          break;
        default:
          direction = pacman.direction;
          break;
      }
      pacman.direction = direction;
    });
  };

  const getLegDataX = (diameter, legNum) => {
      return (diameter / 4) * legNum
    };

  const updateGhostRadius = (ghost, boardDimensions) => {
      let cellHeight = boardDimensions.height / numRows;
      let cellWidth = boardDimensions.width / numCols;
      ghost.ghostRadius = (cellHeight < cellWidth ? cellHeight / 4 : cellWidth / 4) * 1.5;
      ghost.ghostDiameter = ghost.ghostRadius * 2;
      const { ghostDiameter } = ghost;
      ghost.leg1DataX0 = getLegDataX(ghostDiameter, 1);
      ghost.leg1DataX1 = getLegDataX(ghostDiameter, 0);
      ghost.leg2DataX0 = getLegDataX(ghostDiameter, 2);
      ghost.leg2DataX1 = getLegDataX(ghostDiameter, 1);
      ghost.leg3DataX0 = getLegDataX(ghostDiameter, 3);
      ghost.leg3DataX1 = getLegDataX(ghostDiameter, 2);
      ghost.leg4DataX0 = getLegDataX(ghostDiameter, 4);
      ghost.leg4DataX1 = getLegDataX(ghostDiameter, 3);

      const {leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1} = ghost;
      ghost.legsDataX = [leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1];
    };

  const updateAllGhostRadii = (ghosts) => {
    let boardDimensions = document.getElementById("board").getBoundingClientRect();
    ghosts.forEach(ghost => {
      updateGhostRadius(ghost, boardDimensions);
    });
  };

  const getColor = (timer, flashingAmount, color) => {
     const canBeEatenColor = 'white';
      if(!timer) return color
      if(timer < 4) return !flashingAmount ? color : canBeEatenColor;
      return canBeEatenColor;
    };

  const getAndSetFlashing = (ghost) => {
      ghost.flashingAmount ? ghost.flashingAmount = 0 : ghost.flashingAmount = 1;
      return ghost.flashingAmount
    };

  let fakeBodyData = [0];

  const getCoordY = (offsetY, _cellWidth) => offsetY * _cellWidth;
  const getCoordX = (offsetX, _cellHeight) => offsetX * _cellHeight;
  const degToRadians = deg => deg * (Math.PI / 180);

  function updateGhost(ghost, dimensions, timer) {
    let {ghostNum, ghostRadius: radius, ghostDiameter: diameter, ghostCoords: coords} = ghost;
    let { cellWidth, cellHeight } = dimensions;
    let flashingAmount = getAndSetFlashing(ghost);
    let height = radius / 2;
    let offsetX = cellWidth / 2;
    let offsetY = cellHeight / 2;
    let color = getColor(timer, flashingAmount, ghost.color);
    let svg;
    let {coordX, coordY} = coords;
      var group = d3.select("#board").selectAll(`.group${ghostNum}`).data(fakeBodyData);

      group.enter()
        .append("g")
        .classed(`group${ghostNum}`, true)
        .attr('transform', `translate(${getCoordX(coordX, cellWidth)}, ${getCoordY(coordY, cellHeight)})`);

      group
        .attr('transform', `translate(${getCoordX(coordX, cellWidth)}, ${getCoordY(coordY, cellHeight)})`);

      var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(degToRadians(-90))
        .endAngle(degToRadians(90));

      var rectangle = group.selectAll(`.ghostRect${ghostNum}`)
        .data(fakeBodyData);

      rectangle.enter()
        .append("rect")
        .classed(`ghostRect${ghostNum}`, true)
        .attr("x", (radius * -1) + offsetX)
        .attr("y", 0 + offsetY)
        .attr('id', 'group')
        .attr("width", diameter)
        .attr("height", height)
        .style("fill", `${color}`);

      rectangle
        .attr("x", (radius * -1) + offsetX)
        .attr("y", 0 + offsetY)
        .attr('id', 'group')
        .attr("width", diameter)
        .attr("height", height)
        .style("fill", `${color}`);

      rectangle.exit().remove();

      const topArc = group.selectAll(`.topArc${ghostNum}`)
        .data(fakeBodyData);

      topArc.enter().append("path")
        .classed(`topArc${ghostNum}`, true)
        .attr("d", arc)
        .style("fill", `${color}`)
        .attr('transform', `translate(${offsetX}, ${offsetY + 0})`);

      topArc
        .attr("d", arc)
        .style("fill", `${color}`)
        .attr('transform', `translate(${offsetX}, ${offsetY + 0})`);

      svg = group.selectAll(`.svg${ghostNum}`)
        .data(fakeBodyData);

      svg.enter()
        .append("svg")
        .classed(`svg${ghostNum}`, true)
        .attr("height", height)
        .attr('y', height + offsetY)
        .attr("x", radius * -1);

      svg
        .attr("height", height)
        .attr('y', height + offsetY)
        .attr("x", radius * -1);

      const leftEye = group.selectAll(`.leftEye${ghostNum}`)
        .data(fakeBodyData);

      leftEye
        .enter()
        .append("ellipse")
        .classed(`leftEye${ghostNum}`, true)
        .attr("cx", ((radius / 4) * -1) + offsetX)
        .attr("cy", ((radius / 3) * -1) + offsetY)
        .style("fill", "white")
        .attr("rx", radius / 6)
        .attr("ry", radius / 4);

      leftEye
        .attr("cx", ((radius / 4) * -1) + offsetX)
        .attr("cy", ((radius / 3) * -1) + offsetY)
        .style("fill", "white")
        .attr("rx", radius / 6)
        .attr("ry", radius / 4);

      const leftInnerEye = group.selectAll(`.leftInnerEye${ghostNum}`)
        .data(fakeBodyData);

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
        .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`);

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
        .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`);

      const rightEye = group.selectAll(`.rightEye${ghostNum}`)
        .data(fakeBodyData);

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
        .attr("ry", radius / 4);

      rightEye
        .attr("cx", function (d) {
          return ((radius / 4) * 1) + offsetX;
        })
        .attr("cy", function (d) {
          return ((radius / 3) * -1) + offsetY;
        })
        .style("fill", "white")
        .attr("rx", radius / 6)
        .attr("ry", radius / 4);

      const rightInnerEye = group.selectAll(`.rightInnerEye${ghostNum}`)
        .data(fakeBodyData);

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
        .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`);

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
        .attr('transform', `translate(${cellWidth / 2}, ${cellHeight / 2})`);

    return svg;
  }

  const updateAllGhosts = (_ghosts, dimensions) => {
    const {invincibleTimer, ghosts} = _ghosts;
    return ghosts.map(ghost => {
      return updateGhost(ghost, dimensions, invincibleTimer)
    });
  };

  var curveFunc = d3.svg.area()
    .x1(function (d) { return d.x })      // Position of both line breaks on the X axis
    .y1(function (d) { return d.y })     // Y position of top line breaks
    .y0(0)
    .x0(function (d) { return d.x });

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
    let color = getColor(ghosts.invincibleTimer, flashingAmount, ghost.color);
    let offsetX = cellWidth / 2;
    let [leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1] = legsDataX;
    let leg1Data = [{ x: leg1DataX0, y: 0 }, { x: leg1DataX1, y: height }];
    let leg2Data = [{ x: leg2DataX0, y: 0 }, { x: leg2DataX1, y: height }];
    let leg3Data = [{ x: leg3DataX0, y: 0 }, { x: leg3DataX1, y: height }];
    let leg4Data = [{ x: leg4DataX0, y: 0 }, { x: leg4DataX1, y: height }];
    let fakeData = [0];

    const addleg = () => {
      const leg = svg.selectAll(`.legSvg${ghostNum}`)
        .data(fakeData);

      leg.exit().remove();

      leg.enter().append('path')
        .classed(`legSvg${ghostNum}`, true)
        .attr("y", height)
        .attr('d', curveFunc(leg1Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);

      leg
        .attr("y", height)
        .attr('d', curveFunc(leg1Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);

      const leg2 = svg.selectAll(`.legSvg2${ghostNum}`)
        .data(fakeData);

      leg2.exit().remove();

      leg2.enter().append('path')
        .classed(`legSvg2${ghostNum}`, true)
        .attr("y", height)
        .attr('d', curveFunc(leg2Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);

      leg2
        .attr("y", height)
        .attr('d', curveFunc(leg2Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);

      const leg3 = svg.selectAll(`.legSvg3${ghostNum}`)
        .data(fakeData);

      leg3.exit().remove();

      leg3.enter().append('path')
        .classed(`legSvg3${ghostNum}`, true)
        .attr("y", height)
        .attr('d', curveFunc(leg3Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);

      leg3
        .attr("y", height)
        .attr('d', curveFunc(leg3Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);

      const leg4 = svg.selectAll(`.legSvg4${ghostNum}`)
        .data(fakeData);

      leg4.exit().remove();

      leg4.enter().append('path')
        .classed(`legSvg4${ghostNum}`, true)
        .attr("y", height)
        .attr('d', curveFunc(leg4Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);

      leg4
        .attr("y", height)
        .attr('d', curveFunc(leg4Data))
        .attr('stroke', `${color}`)
        .attr('fill', `${color}`);
    };

    const update = () => {
      color = getColor(ghosts.invincibleTimer, ghost.flashingAmount, ghost.color);
      dimensions = boardInfo.dimensions;
      height = ghost.ghostRadius / 2;
      legsDataX = ghost.legsDataX;
      let [leg1DataX0, leg1DataX1, leg2DataX0, leg2DataX1, leg3DataX0, leg3DataX1, leg4DataX0, leg4DataX1] = legsDataX;

      offsetX = dimensions.cellWidth / 2;
      fakeData[0] += 1;

      if (fakeData[0] % 2 === 0) {
        leg1Data[1].x = leg1DataX0 + offsetX;
        leg1Data[0].x = leg1DataX1 + offsetX;

        leg2Data[1].x = leg2DataX0 + offsetX;
        leg2Data[0].x = leg2DataX1 + offsetX;

        leg3Data[0].x = leg3DataX0 + offsetX;
        leg3Data[1].x = leg3DataX1 + offsetX;

        leg4Data[0].x = leg4DataX0 + offsetX;
        leg4Data[1].x = leg4DataX1 + offsetX;

      } else {
        leg1Data[1].x = leg1DataX1 + offsetX;
        leg1Data[0].x = leg1DataX0 + offsetX;

        leg2Data[0].x = leg2DataX0 + offsetX;
        leg2Data[1].x = leg2DataX1 + offsetX;

        leg3Data[1].x = leg3DataX0 + offsetX;
        leg3Data[0].x = leg3DataX1 + offsetX;

        leg4Data[1].x = leg4DataX0 + offsetX;
        leg4Data[0].x = leg4DataX1 + offsetX;
      }

      addleg();
    };

    setInterval(update, 200);

  };

  const updateAllLegs = (_ghosts, boardInfo, svgs) => {
    const { ghosts } = _ghosts;
    return ghosts.map((ghost, i) => {
      return updateLegs({
        ghost, 
        boardInfo,
        svg: svgs[i],
        ghosts: _ghosts,
      })
    });
  };

  const setCoordAndUpdate = (ghost) => {
    let isInCenter = true;
    let {previousDirection, ghostCoords} = ghost;
    let {coordX, coordY} = ghostCoords;
      let newPreviousDirection;
      const getDirection = () => {
        const randomNumber = (Math.floor(Math.random() * 4)) + 1;
        const cannotMove = {
          1: borderDataVerticalMatrix[coordX][coordY],
          2: borderDataHorizontalMatrix[coordY][coordX],
          3: borderDataVerticalMatrix[coordX + 1][coordY],
          4: borderDataHorizontalMatrix[coordY + 1][coordX],
        };

        const preventPreviousDirection = {
          1: 3,
          2: 4,
          3: 1,
          4: 2,
        };

        if ((cannotMove[randomNumber].hasBorder && (!cannotMove[randomNumber].isOpening || (cannotMove[randomNumber].isOpening && !isInCenter))) || randomNumber === preventPreviousDirection[previousDirection]) {
          return getDirection();
        }

        // if (cannotMove[randomNumber].isOpening) {
        //   isInCenter = false;
        // };

        const mutateInstructions = {
          1: () => coordX - 1 >= 0 ? coordX -= 1 : coordX = numCols - 1,
          2: () => coordY -= 1,
          3: () => coordX + 1 < numCols ? coordX += 1 : coordX = 0,
          4: () => coordY += 1,
        };

        mutateInstructions[randomNumber]();
        newPreviousDirection = randomNumber;
       
    
      };
      getDirection();

      ghost.previousDirection = newPreviousDirection;
      ghostCoords.coordX = coordX;
      ghostCoords.coordY = coordY;

      return {
         coordX,
         coordY,
         previousDirection: newPreviousDirection,
       }
    };

  const setCoordsAllGhosts = (ghosts) => {
    return ghosts.forEach(ghost => {
      setCoordAndUpdate(ghost);
    });
  };

  const checkCollision = (pacmanCoords, _ghosts) => {
    const {ghosts, invincibleTimer} = _ghosts;
    if (invincibleTimer) return false;
    return ghosts.some(ghost => {
      const {ghostCoords} = ghost;
      return ghostCoords.coordX === pacmanCoords.x && ghostCoords.coordY === pacmanCoords.y
    })
  };

  const resetGhostCoords = (ghosts) => {
    ghosts.forEach(ghost => {
      ghost.ghostCoords = {coordX: 8, coordY:8};
    });
  };

  const animateSpecialDots = () => {
    const specialDots = document.querySelectorAll('.special');
    let isBright = true;
    setInterval(() => {
      isBright = !isBright;
      specialDots.forEach(dot => {
        isBright ? dot.style.opacity = 1 : dot.style.opacity = .2;
      });
    }, 300);
  };

  const updateBorders = () => {
    borderDataHorizontalMatrix.forEach(row => {
      row.forEach((piece, i) => {
        if (!piece.hasBorder) return;
        if (!row[i + 1]) { return }
        d3.select("#board").append("line")
          .attr("x1", `${piece.x}%`)
          .attr("y1", `${piece.y}%`)
          .attr("x2", `${row[i + 1].x}%`)
          .attr("y2", `${piece.y}%`)
          .attr("stroke-width", 5)
          .attr("stroke", !piece.isOpening ? "#C7CC56" : 'red');
      });
    });

    borderDataVerticalMatrix.forEach(row => {
      row.forEach((piece, i) => {
        if (!piece.hasBorder) return;
        if (!row[i + 1]) { return }
        d3.select("#board").append("line")
          .attr("x1", `${piece.x}%`)
          .attr("y1", `${piece.y}%`)
          .attr("x2", `${piece.x}%`)
          .attr("y2", `${row[i + 1].y}%`)
          .attr("stroke-width", 5)
          .attr("stroke", "#C7CC56");
      });
    });
  };

  var domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
  };

  const getBoardDimensions = (numCols, numRows, ) => {
    let boardDimensions = document.getElementById("board").getBoundingClientRect();
    let cellHeight = boardDimensions.height / numRows;
    let cellWidth = boardDimensions.width / numCols;

    return {
      boardDimensions,
      cellHeight,
      cellWidth,
    }
  };

  domReady(function () {
    const updateBoardDimensionsOnResize = (boardInfo, numCols, numRows) => {
      window.addEventListener("resize", () => {
        boardInfo.dimensions = getBoardDimensions(numCols, numRows);
        updateAllGhostRadii(ghosts.ghosts);
      });
    };
    let lives = 3;
    let score = 0;
    let shouldUpdateBoard = false;
    let invincibleInterval;

    const createInterval = () => {
      let { invincibleTimer } = ghosts;
      invincibleTimer < 0 ? invincibleTimer = 0 : invincibleTimer += 5;
      invincibleInterval = setInterval(function () {
        invincibleTimer -= 1;
        if (invincibleTimer <= 0) {
          invincibleTimer = 0;
          ghosts.invincibleTimer = invincibleTimer;
          clearInterval(invincibleInterval);
        }

        ghosts.invincibleTimer = invincibleTimer;
      }, 1000);
      ghosts.invincibleTimer = invincibleTimer;
    };

    updateAllGhostRadii(ghosts.ghosts);
    let dimensions = getBoardDimensions(numCols, numRows);
    let boardInfo = { dimensions };
    updateBoardDimensionsOnResize(boardInfo, numCols, numRows);
    updateBoard(boardInfo, dots);
    updateBorders();
    animateSpecialDots();
    let pacman = getPacman();

    keyDownListener(pacman);

    updatePacman({
      mainSvg,
      pacman,
      dimensions: boardInfo.dimensions.boardDimensions,
      pacmanData,
    });

    window.addEventListener("resize", () => {
      pacman.radius = getPacmanRadius();
      updateBoard(boardInfo, dots);
    });

    const updateCoords = () => {
      const { x, y } = pacman.coords;

      switch (pacman.direction) {
        case 1:
          if (borderDataVerticalMatrix[x][y].hasBorder) return pacman.isFacingWall = true;
          pacman.isFacingWall = false;
          pacman.coords.x -= 1;
          if (pacman.coords.x < 0) pacman.coords.x = numCols;
          break;
        case 2:
          if (borderDataHorizontalMatrix[y][x].hasBorder) return pacman.isFacingWall = true;
          pacman.isFacingWall = false;
          pacman.coords.y -= 1;
          break;
        case 3:
          if (borderDataVerticalMatrix[x + 1][y].hasBorder) return pacman.isFacingWall = true;
          pacman.isFacingWall = false;
          pacman.coords.x += 1;
          if (pacman.coords.x >= numCols) pacman.coords.x = 0;
          break
        case 4:
          if (borderDataHorizontalMatrix[y + 1][x].hasBorder) return pacman.isFacingWall = true;
          pacman.isFacingWall = false;
          pacman.coords.y += 1;
          break;
      }

      const indexToRemove = dots.findIndex(element => element.xAxis === pacman.coords.x && element.yAxis === pacman.coords.y);
      if (indexToRemove !== -1) {
        shouldUpdateBoard = true;
        if (!dots[indexToRemove].special) {
          score++;

        } else {
          score += 10;
          clearInterval(invincibleInterval);
          createInterval();
        }
        dots.splice(indexToRemove, 1);
      } else {
        shouldUpdateBoard = false;
      }
    };

    let svgs = updateAllGhosts(ghosts, boardInfo.dimensions);
    updateAllLegs(ghosts, boardInfo, svgs);

    let wasCollisionDetected = false;
    let ghostsCanMove = true;

    setInterval(() => {
      if(!dots.length) return alert("CONGRATS! YOU WON!");
      ghostsCanMove = !ghostsCanMove;
      if (wasCollisionDetected) {
        alert("OVER");
        lives -= 1;
        if (!lives) {
          alert("YOU LOST");
          return location.reload();
        }
        document.getElementById('lives').innerText = lives;
        resetGhostCoords(ghosts.ghosts);
        ghosts.invincibleTimer = 0;
        return wasCollisionDetected = false;
      }

      if (ghostsCanMove) {
        setCoordsAllGhosts(ghosts.ghosts);
        updateAllGhosts(ghosts, boardInfo.dimensions);
      }

      updateCoords();

      if (shouldUpdateBoard && !pacman.isFacingWall) {
        updateBoard(boardInfo, dots);
        document.getElementById('score').innerText = score;
      }

      if (pacman.isFacingWall || pacmanData[1].ratio <= 0) {
        pacmanData[1].ratio = 250;
      } else {
        pacmanData[1].ratio -= 126;
      }

      updatePacman({
        mainSvg,
        pacman,
        dimensions: boardInfo.dimensions.boardDimensions,
        pacmanData,
      });

      wasCollisionDetected = checkCollision(pacman.coords, ghosts);

    }, 175);
  });

}());
