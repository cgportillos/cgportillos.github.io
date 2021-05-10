function main() {

    let svg = d3.select("body").append("svg")
        .attr("width", 1980)
        .attr("height", 600);

    // shortcut to creating tickmark found at: https://ghenshaw-work.medium.com/customizing-axes-in-d3-js-99d58863738b
    let x = d3.scaleLinear().domain([16, 44]).range([460, 1335]);
    let xaxis = d3.axisBottom(x).ticks(20).tickFormat(d => d);

    let tooltip = d3.select("body").append("div").attr("class", "toolTipBox");

    svg.append("text")
        .attr("transform", "translate(950, 440)")
        .attr("x", 0)
        .attr("y", 0)
        .text("Age");

    svg.append("text")
        .attr("transform", "translate(815, 125)")
        .text("Average Age of Players in FIFA 21")
        .style("font-size","20px")

    d3.csv('fifa21_box.csv').then(function (data) {

        let max = d3.max(data, function(d) { return d.age;} );
        let min = d3.min(data, function(d) { return d.age;} );
        let q1 = d3.quantile(data, 0.25, function(d) { return d.age;})
        let median = d3.median(data,function(d) { return d.age;})
        let q3 = d3.quantile(data, 0.75, function(d) { return d.age;})

        let x = svg.append("g")
        x.attr("transform",`translate(49,375)`)
            .call(xaxis);

        svg.append("line")
            .attr("x1", min*31.77)
            .attr("x2", min*31.77)
            .attr("y1", 260)
            .attr("y2", 360)
            .attr("stroke", "black")

        svg.append("line")
            .attr("x1", 540)
            .attr("x2", 1353)
            .attr("y1", 310)
            .attr("y2", 310)
            .attr("stroke", "black")

        svg.append("rect")
            .attr("x", 728)
            .attr("y", 260)
            .attr("width", (q1+q3)*4.1)
            .attr("height", 100)
            .attr("fill", '#002776')
            .attr("stroke", "black")
            .on("mouseover", function(event, d){
                tooltip
                    .style("left", event.pageX + "px")
                    .style("top", event.pageY + "px")
                    .style("display", "inline-block")
                    .html("<br>" + "Min: " + min
                        + "<br>" + "Q1: " + q1
                        + "<br>" + "Median: " + median
                        + "<br>" + "Q3: " + q3
                        + "<br>" + "Max: " + max);
            })
            .on("mouseout", function() { tooltip.style("display", "none"); });

        svg.append("line")
            .attr("x1", max*31.45)
            .attr("x2", max*31.45)
            .attr("y1", 260)
            .attr("y2", 360)
            .attr("stroke", "black")

        svg.append("line")
            .attr("x1", median*31.6)
            .attr("x2", median*31.6)
            .attr("y1", 260)
            .attr("y2", 360)
            .attr("stroke", "black")
    });
}

main()