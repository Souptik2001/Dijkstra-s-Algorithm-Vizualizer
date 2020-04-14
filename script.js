/*jshint esversion: 8 */

var startx = 20;
var starty = 6;
var stopx = 30;
var stopy = 9;
var c_s = 0;
var c_e = 0;
var c_w = 1;

function man() {
    alert("Welcome to Dijkstra's algorithm visualization. Read the mannual carefully ---->> ");
    alert("To start visualization lick start visualization button. For again starting vizualization first click clear board then click again start visualization.");
    alert("Click on change walls to add or remove walls also you can change the start and end positions");
    alert("          Enjoy     !          ");
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    push();
    textSize(80);
    fill(225);
    noStroke();
    text("Dijkstra's Algorithm Visualization", (width / 2) - 570, (height / 4));
    pop();
    push();
    stroke(225);
    noFill();
    rect((width / 2) - 200, (height / 4) + 40, 400, 50, 20);
    pop();
    push();
    noStroke();
    fill(225);
    textSize(20);
    text(" Start Visualization ! ", (width / 2) - 80, (height / 4) + 71);
    pop();
    push();
    stroke(225);
    noFill();
    rect((width / 2) - 100, (height / 4) + 105, 200, 30, 20);
    pop();
    push();
    noStroke();
    fill(225);
    textSize(15);
    text(" Clear Board ", (width / 2) - 50, (height / 4) + 125);
    pop();
    push();
    stroke(225);
    noFill();
    rect((width / 4) - 260, (height / 4) - 120, 100, 30, 20);
    pop();
    push();
    noStroke();
    fill(225);
    textSize(15);
    text(" Mannual ", (width / 4) - 243, (height / 4) - 100);
    pop();



    push();
    stroke(225);
    noFill();
    rect(((3 * width) / 4) - 100, ((height) / 4) - 120, 370, 30, 20);
    pop();
    push();
    noStroke();
    fill(225);
    textSize(15);
    if (c_s == 1) { ellipse(((3 * width) / 4) - 90, ((height) / 4) - 105, 5); }
    if (c_e == 1) { ellipse(((3 * width) / 4) + 35, ((height) / 4) - 105, 5); }
    if (c_w == 1) { ellipse(((3 * width) / 4) + 155, ((height) / 4) - 105, 5); }
    text("Change Start    |    Change End    |    Change walls", ((3 * width) / 4) - 83, (height / 4) - 100); //4
    pop();

    var gridHeight = height / 2;
    var gridWidth = windowWidth;
    var mesh = [];
    var n_rows = Math.floor(height / (2 * gridDim));
    var n_cols = Math.floor(width / gridDim);
    stroke(225);
    // line(20, 20, 80, 20);
    // Drawing the grid
    // Horizontal Lines

    for (var i = 0; i < Math.floor(height / 2) / gridDim; i++) {
        line(0, Math.floor((height / 2)) + (i * gridDim), width, Math.floor(height / 2) + (i * gridDim));
    }
    // Vertical Lines
    for (i = 0; i < (width) / gridDim; i++) {
        line(i * gridDim, Math.floor(height / 2), i * gridDim, height);
    }
    for (i = 0; i < wall.length; i++) {
        mark_wall(wall[i][0], wall[i][1]);
    }
    mark_start(startx, starty);
    mark_stop(stopx, stopy);
    noLoop();
}



var gridDim = 20;
// var n_rows = windowHeight / (2 * gridDim);
// var n_cols = windowWidth / gridDim;

function sleep(ms) {
    return new Promise(resolve => setInterval(resolve, ms));
}

function mark_wall(x, y) {
    // await sleep(5000);
    push();
    fill(150, 80, 200);
    stroke(0, 0, 0);
    rect(x * gridDim, (height / 2) + (y * gridDim), gridDim, gridDim);
    pop();
}

function mark_cell(x, y) {
    // await sleep(5000);
    push();
    fill(225);
    stroke(0, 0, 0);
    rect(x * gridDim, (height / 2) + (y * gridDim), gridDim, gridDim);
    pop();
}

function mark_start(x, y) {
    // await sleep(5000);
    push();
    fill(0, 225, 0);
    stroke(0, 0, 0);
    rect(x * gridDim, (height / 2) + (y * gridDim), gridDim, gridDim);
    pop();
}

function mark_stop(x, y) {
    // await sleep(5000);
    push();
    fill(225, 0, 0);
    stroke(0, 0, 0);
    rect(x * gridDim, (height / 2) + (y * gridDim), gridDim, gridDim);
    pop();
}

function mark_path(x, y) {
    // await sleep(5000);
    push();
    fill(225, 225, 0);
    stroke(0, 0, 0);
    rect(x * gridDim, (height / 2) + (y * gridDim), gridDim, gridDim);
    pop();
}
var n1 = 0;

function went(visited, e) {
    for (var i = 0; i < visited.length; i++) {
        if (visited[i] == e) {
            return 1;
        }
    }
    return 0;
}

function wall_p(wall, x, y) {
    for (var i = 0; i < wall.length; i++) {
        if (wall[i][0] == x && wall[i][1] == y) {
            return "Y";
        }
    }
    return "N";
}


var r = 0;
var wall = [
    [25, 4],
    [25, 5],
    [25, 6],
    [25, 7],
    [25, 8],
    [25, 9],
    [25, 11],
    [25, 12],
];

var p = 0;
async function dijksta(x, y, xe, ye) {
    var n_rows = Math.floor(height / (2 * gridDim));
    var n_cols = Math.floor(width / gridDim);
    // console.log(n_rows * n_cols);
    var visited = [];
    // print(wall[0][0]);
    // mark_wall(wall[0][0], wall[0][1]);
    for (var z = 0; z < wall.length; z++) {
        mark_wall(wall[z][0], wall[z][1]);
    }
    var point = x;
    var pointe = xe;
    if (y != 0) {
        point = (y * n_cols) + x;
    }
    if (ye != 0) {
        pointe = (ye * n_cols) + xe;
    }
    console.log("Point: ");
    console.log(point);
    console.log(pointe);
    // console.log(point);
    fill(225);
    // mark_cell(Math.floor(point / n_cols), (point % n_cols));
    var table = [];
    // for (var i = 0; i < (n_rows * n_cols); i++) {
    //     var temp = [];
    //     for (var j = 0; j < 3; j++) {
    //         temp.push(null);
    //     }
    //     table.push(temp);
    // }
    for (var i = 0; i < 3; i++) {
        var temp = [];
        for (var j = 0; j < ((n_rows + 1) * (n_cols + 1)); j++) {
            temp.push(null);
        }
        // console.log(temp.length);
        table.push(temp);
        // console.log(table[i].length);
    }
    // console.log(table[0].length);
    var n = 0;
    for (i = 0; i < ((n_rows + 1) * (n_cols + 1)); i++) {
        table[0][i] = n;
        table[1][i] = 999999999999999;
        n++;
        // console.log(n);
    }
    // console.log(table[0][23]);
    // Setting the tart point distance as 0
    // console.log(point);
    table[1][point] = 0;
    // console.log(visited.length);
    // console.log(table[0].length);
    fill(225);
    mark_start(x, y);
    mark_stop(xe, ye);
    while (visited.length != table[0].length) {
        console.log("Again");
        p = 0;
        var min_ = 9999999999;
        var min_i;
        // console.log(went(visited, 0));
        for (i = 0; i < table[1].length; i++) {
            // console.log(went(visited, i));
            if (min_ > table[1][i] && table[1][i] != null && went(visited, i) == 0) {
                console.log("Pick");
                p = 1;
                min_i = i;
                min_ = table[1][i];
            }
        }
        if (p == 0) { alert("All paths blocked. Can't reach to target"); break; }
        // console.log(min_);
        // console.log(min_i);
        // console.log(visited.length);
        // mark_cell((min_i % n_cols), Math.floor(min_i / n_cols));
        if (min_i == pointe) {
            console.log("Break");
            var prev_cell = min_i;
            while (prev_cell != point) {
                mark_path((table[2][prev_cell] % n_cols), Math.floor(table[2][prev_cell] / n_cols));
                await sleep(6);
                prev_cell = table[2][prev_cell];
            }
            mark_start(x, y);
            break;
        } // We found our target point
        visited.push(min_i);
        // console.log(wall_p((min_i % n_cols) + 1, Math.floor(min_i / n_cols)));
        // console.log("----");
        // console.log((min_i % n_cols) + 1);
        // console.log(Math.floor(min_i / n_cols));
        // console.log("----");
        if (((min_i) % n_cols) + 1 < (n_cols + 1) && min_ + 1 < table[1][min_i + 1] && went(visited, min_i + 1) == 0 && wall_p(wall, (min_i % n_cols) + 1, Math.floor(min_i / n_cols)) == "N") {
            // console.log("Yo1");
            table[1][min_i + 1] = min_ + 1; // It will be the edge weight in real graph problem
            table[2][min_i + 1] = min_i; // Entering its parent
            mark_cell((min_i % n_cols) + 1, Math.floor(min_i / n_cols));
        }
        await sleep(2);
        if (((min_i) % n_cols) - 1 > -1 && min_ + 1 < table[1][min_i - 1] && went(visited, min_i - 1) == 0 && wall_p(wall, ((min_i - 1) % n_cols), Math.floor(min_i / n_cols)) == "N") {
            // console.log("Yo2");
            table[1][min_i - 1] = min_ + 1;
            table[2][min_i - 1] = min_i; // Entering its parent
            mark_cell(((min_i - 1) % n_cols), Math.floor(min_i / n_cols));
        }
        await sleep(2);
        // console.log(Math.floor((min_i + n_cols) / n_cols));
        if (Math.floor((min_i + n_cols) / n_cols) < (n_rows + 1) && min_ + 1 < table[1][min_i + n_cols] && went(visited, (min_i + n_cols)) == 0 && wall_p(wall, ((min_i + n_cols) % n_cols), Math.floor((min_i + n_cols) / n_cols)) == "N") {
            // console.log("Yo3");
            table[1][min_i + n_cols] = min_ + 1;
            table[2][min_i + n_cols] = min_i; // Entering its parent
            mark_cell(((min_i + n_cols) % n_cols), Math.floor((min_i + n_cols) / n_cols));
        }
        await sleep(2);
        // console.log(Math.floor((min_i - n_cols) / n_cols));
        // console.log(table[1][min_i - n_cols]);
        // console.log((min_ + 1));
        // console.log(went(visited, min_i + n_cols));
        if (Math.floor((min_i - n_cols) / n_cols) > -1 && (min_ + 1) < table[1][min_i - n_cols] && went(visited, min_i - n_cols) == 0 && wall_p(wall, ((min_i - n_cols) % n_cols), Math.floor((min_i - n_cols) / n_cols)) == "N") {
            // console.log("Yo4");
            table[1][min_i - n_cols] = min_ + 1;
            table[2][min_i - n_cols] = min_i; // Entering its parent
            mark_cell(((min_i - n_cols) % n_cols), Math.floor((min_i - n_cols) / n_cols));
        }
        await sleep(1);
        mark_stop(xe, ye);
        // console.log(min_);
        // console.log(Math.min(table[1]));
    }
    mark_stop(xe, ye);
    r = 0;
}
var v = 1;


function mouseClicked() {
    if (mouseY < (height / 2)) {
        if (mouseX >= ((width / 2) - 200) && mouseX <= ((width / 2) + 200) && mouseY >= ((height / 4) + 40) && mouseY <= ((height / 4) + 90) && v == 1) {
            v = 0;
            r = 1;
            dijksta(startx, starty, stopx, stopy);

        }
        if (mouseX >= ((width / 2) - 100) && mouseX <= ((width / 2) + 100) && mouseY >= ((height / 4) + 105) && mouseY <= ((height / 4) + 135) && r == 0) {
            v = 1;
            setup();
        }
        if (mouseX >= (width / 4) - 260 && mouseX <= ((width / 4) - 160) && mouseY >= (height / 4) - 120 && mouseY <= ((height / 4) - 90)) {
            console.log("Mannual");
            man();
        }
        if (mouseX >= ((3 * width) / 4) - 100 && mouseX <= (((3 * width) / 4) + 270) && mouseY >= ((height) / 4) - 120 && mouseY <= (((height) / 4) - 90) && r == 0) {
            if (mouseX >= ((3 * width) / 4) - 100 && mouseX <= ((3 * width) / 4) + 23) {
                c_s = 1;
                c_w = 0;
                c_e = 0;
            }
            if (mouseX >= ((3 * width) / 4) + 24 && mouseX <= ((3 * width) / 4) + 144) {
                c_s = 0;
                c_w = 0;
                c_e = 1;
            }
            if (mouseX >= ((3 * width) / 4) + 145 && mouseX <= ((3 * width) / 4) + 270) {
                c_s = 0;
                c_w = 1;
                c_e = 0;
            }
            setup();
        }
    }
    if (mouseY >= (height / 2)) {
        // console.log(Math.floor(mouseX / gridDim));
        // console.log(Math.floor((mouseY - (height / 2)) / gridDim));
        if (c_w == 1) {
            temp = [];
            if (wall_p(wall, Math.floor(mouseX / gridDim), Math.floor((mouseY - (height / 2)) / gridDim)) == "N") {
                temp.push(Math.floor(mouseX / gridDim));
                temp.push(Math.floor((mouseY - (height / 2)) / gridDim));
                wall.push(temp);
                console.log(wall[wall.length - 1]);
                console.log(wall);
            } else {
                if (wall_p(wall, Math.floor(mouseX / gridDim), Math.floor((mouseY - (height / 2)) / gridDim)) == "Y") {
                    // for (var i = 0; i < wall.length; i++) {
                    //     if (wall[i][0] == Math.floor(mouseX / gridDim) && wall[i][1] == Math.floor((mouseY - (height / 2)) / gridDim)) {
                    //         delete wall[i];
                    //     }
                    // }
                    // delete wall[1];
                    for (var i = 0; i < wall.length; i++) {
                        if (wall[i][0] == Math.floor(mouseX / gridDim) && wall[i][1] == Math.floor((mouseY - (height / 2)) / gridDim)) {
                            temp1 = [];
                            temp2 = [];
                            temp1 = wall.slice(0, i);
                            temp2 = wall.slice((i + 1), wall.length);
                            wall = [];
                            for (var j = 0; j < temp1.length; j++) {
                                wall.push(temp1[j]);
                            }
                            for (j = 0; j < temp2.length; j++) {
                                wall.push(temp2[j]);
                            }
                            console.log(wall);
                        }
                    }

                }
            }
        }
        if (c_s == 1) {
            startx = Math.floor(mouseX / gridDim);
            starty = Math.floor((mouseY - (height / 2)) / gridDim);
        }
        if (c_e == 1) {
            stopx = Math.floor(mouseX / gridDim);
            stopy = Math.floor((mouseY - (height / 2)) / gridDim);
        }
        setup();
    }
}



function draw() {
    var gridHeight = height / 2;
    var gridWidth = width;
    var mesh = [];
    var n_rows = Math.floor(height / (2 * gridDim));
    var n_cols = Math.floor(width / gridDim);

    // console.log(n_rows);
    // console.log(n_cols);

    // mark_cell(n_cols, n_rows);

    // mark_cell(n1, 0);
    // n1++;
    // console.log(n1);
}