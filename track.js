// set the dimensions and margins of the graph
var margin = {top: 40, right: 40, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/yuanGAO237/yuanGAO237.github.io/master/game_top10.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.track_name; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([620000, 2200000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));
  
///////newested add 1
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Count:</strong> <span style='color:red'>" + d.rating_count_tot + "</span>";
  })
svg.call(tip);
/*var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        console.log(d)
        return "<strong>Name:</strong>" + d.prime_genre + "<br><strong>Value:</strong>" + d.count;
    });
svg.call(tip); */   
// Bars
svg.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
    .attr('class','bar')
    .attr("x", function(d) { return x(d.track_name); })
    .attr("y", function(d) { return y(d.rating_count_tot); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.rating_count_tot); })
    .attr("fill", "#69b3a2")
    .on('mouseover',tip.show)
    .on('mouseout',tip.hide)

})

svg.append('text')
.attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle") 
        .style("font-size", "16px") 
.text('Number of App by Genre')


