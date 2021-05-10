function main() {

    let svg = d3.select("body").append("svg")
        .attr("width", 1980)
        .attr("height", 700);

    let countries = [
        "Belgium",
        "Netherlands",
        "Portugal",
        "Italy",
        "Germany",
        "Argentina",
        "Brazil",
        "Spain",
        "France",
        "England"
    ]

    let tooltip = d3.select("body").append("div").attr("class", "toolTipBar2");

    let xScale = d3.scaleLinear().domain([1000, 6000]).range([460, 1335]);
    let xAxis = d3.axisBottom(xScale).ticks(14).tickFormat(d => d);

    let yScale = d3.scaleBand().domain(countries).range([600, 100]);
    let yAxis = d3.axisLeft(yScale).ticks(10);

    let colorScale = d3.scaleSequential().domain([1000,6000])
        .interpolator(d3.interpolateGreens);

    var sequentialScale = d3.scaleSequential(d3.interpolateRainbow)
        .domain([0,7]);

    svg.selectAll("text")

    svg.append("text")
        .attr("x", 900)
        .attr("y", 650)
        .text("Total Purchases")

    svg.append("text")
        .attr("transform", "translate(420, 365) rotate(-90)")
        .text("Country")

    svg.append("text")
        .attr("transform", "translate(810, 75)")
        .text("Popular Players bought Per Country")
        .style("font-size","20px")

    svg.append("g")
        .attr("transform",`translate(${60},${600})`)
        .style("font-size","12px")
        .call(xAxis);

    svg.append("g")
        .attr("transform",`translate(${520},${0})`)
        .style("font-size","12px")
        .call(yAxis)

    d3.csv("fifa21_bubble.csv").then(function (data) {
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 521)
            .attr("y", function(d, i) {
                return 112 + (i*(50));
            })
            .attr("width", function(d) { return -175 + d.hits/5.6; })
            .attr("height", 25)
            .attr("fill", function(d) {
                return colorScale(d.hits);
            })
            .attr("stroke", "black")
            .on("mouseover", function(event, d){
                tooltip
                    .style("left", event.pageX + "px")
                    .style("top", event.pageY + "px")
                    .style("display", "inline-block")
                    .html("<br>" + "Total Country Purchases: " + d.hits
                        + "<br>" + "Top Player: " + d.name
                        + "<br>" + "Purchases: " + d.tophits
                        + "<br>" + "Rating: " + d.overall
                        + "<br>" + "Position: " + d.position
                        + "<br>" + "Team: " + d.team);
            })
            .on("mouseout", function() { tooltip.style("display", "none"); });

        // whole chart goes away when i have this
        let legend = d3
            .legendColor()
            .title("Total Purchases")
            .titleWidth(150)
            .scale(colorScale)
            .cells([1000, 2000, 3000, 4000, 5000, 6000])
            .shapeWidth(18)
            .orient('vertical')
            .shapeHeight(20)
            .labelFormat(d3.format(","))
            .labelAlign("middle");
        svg
            .append("g")
            .attr("transform", "translate(1475, 200)")
            .call(legend);
    });
}

main()