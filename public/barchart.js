function main() {

    let svg = d3.select("body").append("svg")
        .attr("width", 1250)
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

    let xScale = d3.scaleLinear().domain([0, 7]).range([225, 1050]);
    let xAxis = d3.axisBottom(xScale).ticks(7).tickFormat(d => d);

    let yScale = d3.scaleBand().domain(countries).range([600, 100]);
    let yAxis = d3.axisLeft(yScale).ticks(20);

    let colorScale = d3.scaleSequential().domain([0,7])
        .interpolator(d3.interpolateGreens);

    var sequentialScale = d3.scaleSequential(d3.interpolateRainbow)
        .domain([0,7]);

    svg.selectAll("text")

    svg.append("text")
        .attr("x", 580)
        .attr("y", 650)
        .text("Count of Players with Rating > 86")

    svg.append("text")
        .attr("transform", "translate(200, 365) rotate(-90)")
        .text("Country")

    svg.append("text")
        .attr("transform", "translate(500, 75)")
        .text("Top Locations for Highest Rated Players in FIFA 21")
        .style("font-size","20px")

    svg.append("g")
        .attr("transform",`translate(${60},${600})`)
        .style("font-size","12px")
        .call(xAxis);

    svg.append("g")
        .attr("transform",`translate(${285},${0})`)
        .style("font-size","12px")
        .call(yAxis)

    d3.csv("fifa21_bar.csv").then(function (data) {
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 286)
            .attr("y", function(d, i) {
                return 580 + (i*(-25));
            })
            .attr("width", function(d) { return d.overall * 117.5; })
            .attr("height", 15)
            .attr("fill", function(d) {
                return colorScale(d.overall);
            })
            .attr("stroke", "black")

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
            .attr("transform", "translate(1100, 200)")
            .call(legend);
    });
}

main()