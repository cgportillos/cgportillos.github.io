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
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d, i) {
                return 352 + d.hits/6;
            })
            .attr("cy", function(d, i) {
                return 117 + (i*51);
            })
            .attr("r", function(d, i) {
                var ret = 0;
                if (d.avg_potential == 72) {
                    ret = d.avg_potential/12;
                } else if (d.avg_potential == 73) {
                    ret = d.avg_potential/10;
                } else if (d.avg_potential == 74) {
                    ret = d.avg_potential/8;
                } else if (d.avg_potential == 75) {
                    ret = d.avg_potential/6;
                } else if (d.avg_potential == 76) {
                    ret = d.avg_potential/4;
                }
                return ret;
            })

            .attr("fill", function(d) { return colorScale(d.hits); })
            .attr("stroke", "black")

        // whole chart goes away when i have this
        let legend = d3
            .legendColor()
            .title("Total Purchases")
            .titleWidth(150)
            .scale(colorScale)
            .cells([1000, 2000, 3000, 4000, 5000, 6000])
            .shapeWidth(18)
            .shapeHeight(20)
            .labelFormat(d3.format(","))
            .labelAlign("middle")
            .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())

        svg
            .append("g")
            .attr("transform", "translate(1425, 200)")
            .call(legend);
    });
}

main()