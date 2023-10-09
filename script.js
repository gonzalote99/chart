var margin = {top: 30, right: 30, bottom: 30, left: 30 },
width = 450 - margin.left - margin.right;
height = 450  - margin.top - margin.bottom;

var svg = d3.select('#my_dataviz')
.append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)
.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')' );


var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"];

var x = d3.scaleBand()
.range([0, width])
.domain(myGroups)
.padding(0.01)
svg.append('g')
.attr('transform', 'translate(0,' + height + ')')
.call(d3.axisBottom(x))


var y = d3.scaleBand()
.range([height ,0])
.domain(myVars)
.padding(0.01)
svg.append('g')
.call(d3.axisLeft(y))


var myColor = d3.scaleLinear()
.range(['white', '#69b3a2'])
.domain([1, 100])

d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv', function(data) {
  var tooltip = d3.select('#my_dataviz')
  .append('div')
  .style('opacity', 0)
  .attr('class', 'tooltip')
  .style('background-color', 'white')
  .style('border', 'solid')
  .style('border-width', '2px')
  .style('border-radius', '5px')
  .style('padding', '5px')

  var mouseover = function(d) {
    tooltip
    .style('opacity', 1)
    d3.select(this)
    .style('stroke', 'black')
    .style('opacity', 1)



  }

  var mousemove = function(d) {
    tooltip
    .html('value of <br> cell is: ' + d.value)
    .style('left', (d3.mouse(this)[0] +70) + 'px')
    .style('top', (d3.mouse(this)[1] ) + 'px')

  }

  var mouseleave = function(d) {
    tooltip
    .style('opacity', 0)
    d3.select(this)
    .style('stroke', 'none')
    .style('opacity', 0.8)
  }


  svg.selectAll()
  .data(data, function(d) {return d.group+':'+d.variable;})
  .enter()
  .append('rect')
   .attr('x', function(d) {return x(d.group)}) 
   .attr('y', function(d) {return y(d.variable)}) 
   .attr('width', x.bandwidth())
   .attr('height', y.bandwidth())
   .style('fill', function(d) {return myColor(d.value)})
   .on('mouseover', mouseover)
   .on('mousemove', mousemove)
   .on('mouseleave', mouseleave)


})





