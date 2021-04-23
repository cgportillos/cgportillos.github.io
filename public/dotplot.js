function main() {

    let svg = d3.select("body").append("svg")
        .attr("width", 1250)
        .attr("height", 700);

    let positions = [
        "GK",
        "RWB",
        "RB",
        "CB",
        "RB",
        "CB",
        "LB",
        "LWB",
        "CDM",
        "RM",
        "LM",
        "CM",
        "CAM",
        "RW",
        "LW",
        "CF",
        "ST"
    ]

    let xScale = d3.scaleLinear().domain([22, 28]).range([225, 1050]);
    let xAxis = d3.axisBottom(xScale).ticks(7).tickFormat(d => d);

    let yScale = d3.scaleBand().domain(positions).range([600, 100]);
    let yAxis = d3.axisLeft(yScale).ticks(20);

    let colorScale = d3.scaleSequential().domain([21,28])
        .interpolator(d3.interpolateGreens);

    var sequentialScale = d3.scaleSequential(d3.interpolateRainbow)
        .domain([0,7]);

    svg.selectAll("text")

    svg.append("text")
        .attr("x", 650)
        .attr("y", 650)
        .text("Average Age")

    svg.append("text")
        .attr("transform", "translate(225, 365) rotate(-90)")
        .text("Position")

    svg.append("text")
        .attr("transform", "translate(550, 75)")
        .text("Average Age per Position in FIFA 21")
        .style("font-size","20px")

    svg.append("g")
        .attr("transform",`translate(${60},${600})`)
        .style("font-size","12px")
        .call(xAxis);

    svg.append("g")
        .attr("transform",`translate(${285},${0})`)
        .style("font-size","12px")
        .call(yAxis)

    d3.csv("fifa21_dot.csv").then(function (data) {
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d, i) {
                return -2672 + d.age*135;
            })
            .attr("cy", function(d, i) {
                return 117 + (i*33.25);
            })
            .attr("r", 12)
            .attr("fill", function(d) { return colorScale(d.age); })
            .attr("stroke", "black")

        // whole chart goes away when i have this
        let legend = d3
            .legendColor()
            .title("Player Age")
            .titleWidth(150)
            .scale(colorScale)
            .cells([22, 23, 24, 25, 26, 27, 28])
            .shapeWidth(18)
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