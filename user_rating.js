
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
d3.csv("user_rate.csv", function(d) {
  d.rating_count_tot = +d.rating_count_tot;
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
  y.domain([0, 42000000]);

  // add the svg elements
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("rating_count_tot");

  // create the bars
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.user_rating); })
      .attr("y", function(d) { return y(d.rating_count_tot); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.rating_count_tot); });

  // add a change event handler 
  d3.select("#filter").on("change", function() {
      applyFilter(this.value);
    });


  // call this whenever the filter changes
  function applyFilter(value) {
    // filter the data
    var data = csv.filter(function(d) {return d.prime_genre === value;})

    // update the bars
    d3.selectAll(".bar")
      .data(data)
      .transition().duration(1000)
      .attr("x", function(d) { return x(d.user_rating); })
      .attr("y", function(d) { return y(d.rating_count_tot); })
      .attr("height", function(d) { return height - y(d.rating_count_tot); });

  }

});

