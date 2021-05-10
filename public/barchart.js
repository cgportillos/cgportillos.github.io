function main() {

    let svg = d3.select("body").append("svg")
        .attr("width", 1980)
        .attr("height", 700);

    let countries = [
        "Netherlands",
        "Korea Republic",
        "Gabon",
        "Egypt",
        "Denmark",
        "Croatia",
        "Costa Rica",
        "Uruguay",
        "Slovenia",
        "Senegal",
        "Portugal",
        "Poland",
        "England",
        "Italy",
        "Belgium",
        "Argentina",
        "Spain",
        "Germany",
        "Brazil",
        "France"
    ]

    let xScale = d3.scaleLinear().domain([0, 7]).range([460, 1335]);
    let xAxis = d3.axisBottom(xScale).ticks(7).tickFormat(d => d);

    let yScale = d3.scaleBand().domain(countries).range([600, 100]);
    let yAxis = d3.axisLeft(yScale).ticks(20);

    let tooltip = d3.select("body").append("div").attr("class", "toolTipBar");

    let colorScale = d3.scaleSequential().domain([0,7])
        .interpolator(d3.interpolateYlOrBr);

    // d3.interpolateRgb(a, b)

    var sequentialScale = d3.scaleSequential(d3.interpolateRainbow)
        .domain([0,7]);

    svg.selectAll("text")

    svg.append("text")
        .attr("x", 850)
        .attr("y", 650)
        .text("Count of Players with Rating > 86")

    svg.append("text")
        .attr("transform", "translate(420, 365) rotate(-90)")
        .text("Country")

    svg.append("text")
        .attr("transform", "translate(735, 75)")
        .text("Top Locations for Highest Rated Players in FIFA 21")
        .style("font-size","20px")

    svg.append("g")
        .attr("transform",`translate(${60},${600})`)
        .style("font-size","12px")
        .call(xAxis);

    svg.append("g")
        .attr("transform",`translate(${520},${0})`)
        .style("font-size","12px")
        .call(yAxis)

    d3.csv("fifa21_bar.csv").then(function (data) {
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 521)
            .attr("y", function(d, i) {
                return 580 + (i*(-25));
            })
            .attr("width", function(d) { return d.overall * 124.5; })
            .attr("height", 15)
            .attr("fill", function(d) {
                return colorScale(d.overall);
            })
            .attr("stroke", "black")
            .on("mouseover", function(event, d){
                tooltip
                    .style("left", event.pageX + "px")
                    .style("top", event.pageY + "px")
                    .style("display", "inline-block")
                    .html("<br>" + "Top Player: " + d.player
                        + "<br>" + "Rating: " + d.rating
                        + "<br>" + "Position: " + d.position
                        + "<br>" + "Team: " + d.team);
            })
            .on("mouseout", function() { tooltip.style("display", "none"); });

        // whole chart goes away when i have this
        let legend = d3
            .legendColor()
            .title("Count of Players")
            .titleWidth(150)
            .scale(colorScale)
            .cells([1, 2, 3, 4, 5, 6, 7])
            .shapeWidth(18)
            .orient('horizontal')
            .shapeHeight(20)
            .labelFormat(d3.format(","))
            .labelAlign("middle");
        svg
            .append("g")
            .attr("transform", "translate(1425, 200)")
            .call(legend);
    });
}

main()