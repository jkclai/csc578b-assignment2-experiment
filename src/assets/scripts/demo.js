var mode = 0;
var modeHash = 0;

for(var i = 0; i < PID.length; i++) {
    modeHash += PID[i].charCodeAt(0);
}

var currN = 0;
var currR = 0;

var data = new DataController();

var value = new ValueController(MIN_VALUE, MAX_VALUE);

var time = new TimeController();
var cursor = new CursorController("svg#canvas-svg", 100);

function draw() {
    cleanCanvas();

    switch(mode) {
        case 0:
            if(!currN && !currR) {
                drawStart(true);
            }
            else {
                drawStart(false);
            }
            break;
        case 1:
            if(modeHash % 2 == 0) {
                drawText(value.get());
            }
            else {
                drawGraph(value.get());
            }
            break;
        case 2:
            drawStart();
            break;
        case 3:
            if(modeHash % 2 == 0) {
                drawGraph(value.get());
            }
            else {
                drawText(value.get());
            }
            break;
        case -1:
            drawEnd();
            break;
        default:
            break;
    }
}

function updateMode() {
    switch(mode) {
        case 0:
            mode = 1;
            break;
        case 1:
            if(++currR < REPETITIONS) {
                mode = 0;
            }
            else {
                if(++currN < N.length) {
                    mode = 0;
                    currR = 0;
                }
                else {
                    mode = 2;
                    currR = 0;
                    currN = 0;
                }
            }
            break;
        case 2:
            mode = 3;
            break;
        case 3:
            if(++currR < REPETITIONS) {
                mode = 2;
            }
            else {
                if(++currN < N.length) {
                    mode = 2;
                    currR = 0;
                }
                else {
                    mode = -1;
                    currR = 0;
                    currN = 0;
                }
            }
            break;
        case -1:
            break;
        default:
            break;
    }
}

function drawStart(isInit) {
    canvas.append("rect")
        .attr("x", (CANVAS_WIDTH - START_SQUARE_WIDTH) / 2)
        .attr("y", (CANVAS_HEIGHT - START_SQUARE_HEIGHT) / 2)
        .attr("width", START_SQUARE_WIDTH)
        .attr("height", START_SQUARE_HEIGHT)
        .attr("stroke", "black")
        .attr("fill", "red")
        .on("click", function(d, i){
            updateMode();

            value.set(N[currN]);

            draw();

            time.start();
            cursor.start();
        })
        .style("cursor","pointer");
    
    if(isInit) {
        canvas.append("text")
            .attr("x", 200)
            .attr("y", 250)
            .attr("font-size", "15px")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("fill", "black")
            .style("stroke", "black")
            .text("Click on the red square to start.");
    }
}

function drawText(values) {
    var repr = canvas.selectAll("g")
        .data(values)
        .enter()
        .append("g")
        .on("click", function(d, i){
            time.stop();
            cursor.stop();

            data.initEntry();
            data.setPid(PID);
            data.setMode("text");
            data.setN(currN);
            data.setR(currR);
            data.setValues(value.get());
            data.setSelectedValue(d);
            data.setTime(time.print());
            data.setCursor(cursor.print());
            data.pushEntry();

            updateMode();
            draw();
        })
        .style("cursor","pointer");

    repr.append("circle")
        .attr("cx", function(d, i) {
            return TEXT_POSITION[values.length][i].x;
        })
        .attr("cy", function(d, i) {
            return TEXT_POSITION[values.length][i].y;
        })
        .attr("r", BUBBLE_SIZE[values.length])
        .style("fill", BUBBLE_FILL_COLOUR)
        .style("stroke", BUBBLE_STROKE_COLOUR);
  
    repr.append("text")
        .attr("x", function(d, i) {
            return TEXT_POSITION[values.length][i].x;
        })
        .attr("y", function(d, i) {
            return TEXT_POSITION[values.length][i].y;
        })
        .attr("font-size", TEXT_SIZE[values.length]+"px")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("fill", TEXT_FILL_COLOUR)
        .style("stroke", TEXT_STROKE_COLOUR)
        .text(d => d)
}

function drawGraph(values) {
    var repr = canvas.selectAll("g")
        .data(values)
        .enter()
        .append("g")
        .on("click", function(d, i){
            time.stop();
            cursor.stop();

            data.initEntry();
            data.setPid(PID);
            data.setMode("graphical");
            data.setN(currN);
            data.setR(currR);
            data.setValues(value.get());
            data.setSelectedValue(d);
            data.setTime(time.print());
            data.setCursor(cursor.print());
            data.pushEntry();

            updateMode();
            draw();
        })
        .style("cursor","pointer");

    var graphScale = d3.scaleLinear()
        .domain([MIN_VALUE, MAX_VALUE])
        .range([0, CANVAS_HEIGHT]);

    repr.append("rect")
        .attr("x", function(d, i) {
            return i * (400 / values.length);
        })
        .attr("y", d => 400 - graphScale(d))
        .attr("width", CANVAS_WIDTH / values.length)
        .attr("height", d => graphScale(d))
        .style("fill", GRAPH_FILL_COLOUR)
        .style("stroke", GRAPH_STROKE_COLOUR);
}

function drawEnd() {
    canvas.append("text")
            .attr("x", 200)
            .attr("y", 200)
            .attr("font-size", "15px")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .style("fill", "black")
            .style("stroke", "black")
            .text("Thank you for your participation!");

    var button = document.getElementById("submit-button");
    button.style.display = "inline";

    button.addEventListener("click", function() {
        document.getElementById("submit-button").disabled = true;
        document.getElementById("submit-text").innerHTML = "Submitting data... (ETC: 10 seconds)<br>Please do not close this window.";

        fetch("https://script.google.com/macros/s/" + SCRIPT_ID + "/exec?callback=?", {method: "POST", mode: "no-cors", body: JSON.stringify(data.print())})
            .then(response => {
                if(localStorage.getItem("participant_id") == null) {
                    localStorage.setItem("participant_id", btoa(Math.random()));
                }
                localStorage.removeItem("participant_id");

                console.log("Success!", response);
                window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfCoDZ98X2Pb6uVdT8xZq1Sc4c-v-R0CXYahvCuYnPS2wxsdQ/viewform?usp=pp_url&entry.706711035=" + PID;
            })
            .catch(error => {
                console.error("Error!", error.message);
                document.getElementById("submit-button").disabled = false;
            });
    });
}

function cleanCanvas() {
    canvas.selectAll("*").remove();
}