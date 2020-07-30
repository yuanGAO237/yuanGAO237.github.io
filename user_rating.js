var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// create a variable that will hold the loaded data
var csv;

// load the data
d3.csv("https://raw.githubusercontent.com/yuanGAO237/yuanGAO237.github.io/master/user_rate.csv", function(d) {
  d.proportion = +d.proportion;
  return d;
}, function(error, datafile) {
  if (error) throw error;

  // put the original data in csv
  csv = datafile;

  // filter the data based on the inital value
  var data = csv.filter(function(d) { 
    var sq = d3.select("#filter").property("value");
    return d.prime_genre === sq;
  });

  // set the domains of the axes
  x.domain(data.map(function(d) { return d.user_rating; }));
  y.domain([0, 100]);

  // add the svg elements
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y));
  

  // create the bars
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.user_rating); })
      .attr("y", function(d) { return y(d.proportion); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.proportion); });

  // add a change event handler 
  d3.select("#filter").on("change", function() {
      applyFilter(this.value);
    });


  // call this whenever the filter changes
  function applyFilter(value) {
   
    // filter the data
    var data = csv.filter(function(d) {return d.prime_genre === value;})
    ////////////////
    x.domain(data.map(function(d) { return d.user_rating; }));
    //d3.selectAll(g).call(d3.axisBottom(x));
    ud.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    ud.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y));
   

  
      /////////////////////
    // update the bars
    ud.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.user_rating); })
      .attr("y", function(d) { return y(d.proportion); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.proportion); });

      //.transition().duration(1000)
      //.attr("x", function(d) { return x(d.user_rating); })
      //.attr("y", function(d) { return y(d.proportion); })
      // .attr("height", function(d) { return height - y(d.proportion); });

  }

});