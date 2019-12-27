// Fire when DOM is available
let svg;
let cellHeight = 100 / 10;
let cellWidth = 100 / 10;
let data = [{
  x: '50%',
  y: '50%',

}];

let rectData = [];

let rectMatrice = [];

const circleDiameter = cellWidth < cellHeight ? cellWidth : cellHeight

let circleRadius = circleDiameter / 2
var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

const createRectData = () => {
  let xAxis = 0;
  let yAxis = 0;

  let arr = []

  const width = cellWidth * xAxis;
  let count = 0;
  while ((cellWidth * xAxis + 1) <= 100 && (cellHeight * yAxis + 1) <= 100) {
    count++

    rectData.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })
    arr.push({ x: cellWidth * xAxis, y: cellHeight * yAxis, count })

    xAxis += 1
    if (cellWidth * xAxis >= 100) {
      rectMatrice.push(arr);
      arr = [];
      yAxis += 1
      xAxis = 0
    }

  }

  // console.log('rectMatrice', rectMatrice)

}

createRectData()


domReady(function () {


  const elementSize = document.getElementById("crack").getBoundingClientRect();
  const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;
  circleRadius = diameter / 40
  svg = d3.select("#crack");

  window.addEventListener("resize", () => {
    const elementSize = document.getElementById("crack").getBoundingClientRect();
    const diameter = elementSize.width < elementSize.height ? elementSize.width : elementSize.height;
    circleRadius = diameter / 40
    update()
  });



  const update = () => {



    // create every row
    var g = d3.select("#crack").selectAll("g")
      .data(rectMatrice)


    g.enter().append("g");

    // g.exit().remove()

    var svg = g.selectAll("g svg")
      .data(function (d) { return d; })


    const svgEnter = svg.enter();
    
    const blah = svgEnter.append("svg")
      .attr('x', d => `${d.x}%`)
      .attr('y', d => `${d.y}%`)
      .attr('height', `${cellHeight}%`)
      .attr('width', `${cellWidth}%`)
      // .on("mouseenter", function (e, i, j) {
      //   console.log('e', e)
      //   console.log('i', i)
      //   console.log('j', j)

      //   const elementInMatrix = rectMatrice[j]

      //   if (elementInMatrix[i]) {
      //     console.log('elementInMatrix[i]', elementInMatrix[i])
      //     elementInMatrix.splice(i, 1)
      //     console.log('rectMatrice', rectMatrice)
      //   }
      //   // update()

      //   // rectData.splice(indexToRemove, 1);
      //   // const indexToRemove = rectData.findIndex(element => element.count === e.count)
      //   // if (indexToRemove !== -1) {
      //   //   rectData.splice(indexToRemove, 1);
      //   // }

      //   update();
      // })


      blah.append('rect')
      .attr('x', d => 0)
      .attr('y', d => 0)
      .attr('height', '100%')
      .attr('width', '100%')

       blah.append("circle")
        .attr('cx', d => '50%')
        .attr('cy', d => '50%')
        .attr('r', d => `${circleRadius}%`)
        .style("fill", "blue")
        .on("mouseenter", function (e, i, j, b) {
          console.log('e', e)
          console.log('i', i)
          console.log('j', j)
          update()
        })


        const circle = svg.selectAll("circle")
        .data(rectMatrice, (d, i, j) => {
          console.log('d', d)
          console.log('i', i)
        })
        
        // .data(rectMatrice, (d, i, j) => {
        //   // console.log(d[i], 'd', d, 'i', i) 
        //   // || 
        //   // console.log('d[0].count', d[i].count)
        //   // console.log('d', d)
        //   // return d
        //   // console.log('d[i].count', d[i].count)
        //   // console.log('d[i]', d[i])
        //   // console.log('d[i][j].count', d[i].count)
        //   // console.log('d', d)
        //   // console.log('d[i].count', d[i].count)
        //   // console.log('rectMatrtice', rectMatrice)
        //   console.log('d', d)
        //   console.log('i', i)
        //   console.log('j', j)
        //   // if(d[i]) {
        //   //   return d[i].count
        //   // }
        //   return d[i].count
        // })
        
      // .attr('cx', d => '50%')
      // .attr('cy', d => '50%')
      // .attr('r', d => `${circleRadius}%`)
      // .style("fill", "blue")

      // circle.enter()
      // .append("circle")
      // .attr('cx', d => '50%')
      // .attr('cy', d => '50%')
      // .attr('r', d => `${circleRadius}%`)
      // .style("fill", "blue")
      // .on("click", function (e, i, j, b) {
      //   // console.log('this', this)
      //   console.log('e', e)
      //   console.log('i', i)
      //   console.log('j', j)

      // })
        // console.log('b', b)

      //   // e.splice(j, 1)

      //   // const elementInMatrix = rectMatrice[i]

      //   // if (elementInMatrix[i]) {
      //   //   // console.log('elementInMatrix[i]', elementInMatrix[i])
      //   //   elementInMatrix.splice(j, 1)
      //   //   // console.log('rectMatrice', rectMatrice)
      //   // }

      //   // rectMatrice[i] = elementInMatrix
      //   // update()

      //   // rectData.splice(indexToRemove, 1);
      //   const indexToRemove = e.findIndex(element => element.count === j)
      //   if (indexToRemove !== -1) {
      //     e.splice(indexToRemove, 1);
      //   }

      //   update();
      // })
      // .exit().remove()

      circle.exit().remove()
      



    // svg.append("rect")
    // .attr('x', d => 0)
    // .attr('y', d => 0)
    // .attr('height', '100%')
    // .attr('width', '100%')

    // var rect = g.selectAll('rect')
    // .data(function (d, i) { console.log('rect', d)
    //   return d[i]; })

    // svg.append('rect')
    // .attr('x', d => 0)
    // .attr('y', d => 0)
    // .attr('height', '100%')
    // .attr('width', '100%')

    // svg.exit().remove();

    // var circle = svg.selectAll('circle')
    // .data(function (d) { 
    //   // console.log('circle d', d)
    //   return d.count; })

    //   circle.exit().remove



        // circle.enter().append("circle")
        // .attr('cx', d => '50%')
        // .attr('cy', d => '50%')
        // .attr('r', d => `${circleRadius}%`)
        // .style("fill", "blue")

    //     circle.exit()
    // .style("fill", "yellow")
    // .transition()
    // .style("opacity", 0)
    // .delay(25)
    // .remove();

    //   const circles = d3.select("#crack").selectAll("g svg circle").data(rectData, (d) => d.count)
    // .attr('cx', d => '50%')
    // .attr('cy', d => '50%')
    // .attr('r', d => `${circleRadius}%`)
    // .style("fill", "blue")

    //   circles.exit()
    // .style("fill", "yellow")
    // .transition()
    // .style("opacity", 0)
    // .delay(25)
    // .remove();

    // svg.append("rect")
    // .data(rectData, (d) => console.log('d', d) || d.count)
    //   attr('x', d => 0)
    // .attr('y', d => 0)
    // .attr('height', '100%')
    // .attr('width', '100%')

    //   var selection = d3.select("#crack")
    //     .selectAll("rect").data(rectData, (d) => d.count)

    //   const circles = d3.select("#crack").selectAll("circle").data(rectData, (d) => d.count)
    //     .attr('cx', d => '50%')
    //     .attr('cy', d => '50%')
    //     .attr('r', d => `${circleRadius}%`)
    //     .style("fill", "blue")

    //   selection.exit().remove();
    //   circles.exit()
    //   .style("fill", "yellow")
    //   .transition()
    //   .style("opacity", 0)
    //   .delay(25)
    //   .remove();


    // const svg = selection.enter()
    //   .append('svg')
    //   .attr('x', d => `${d.x}%`)
    //   .attr('y', d => `${d.y}%`)
    //   .attr('height', `${cellHeight}%`)
    //   .attr('width', `${cellWidth}%`)
    //   .on("mouseenter", function (e, i, j) {
    //     console.log('j', j)
    //     const indexToRemove = rectData.findIndex(element => element.count === e.count)
    //     if (indexToRemove !== -1) {
    //       rectData.splice(indexToRemove, 1);
    //     }

    //     update();
    //   })


    // svg.append("rect")
    //   .attr('x', d => 0)
    //   .attr('y', d => 0)
    //   .attr('height', '100%')
    //   .attr('width', '100%')

    // svg.append("circle")
    //   .attr('cx', d => '50%')
    //   .attr('cy', d => '50%')
    //   .attr('r', d => `${circleRadius}%`)
    //   .style("fill", "blue")
  }
  update()


});