let cols, rows;
let grid, next;
let unitSize = 10;
let width = 400;
let height = 400;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup() {
    frameRate(12)
    createCanvas(width, height);
    cols = width / unitSize;
    rows = height / unitSize;
    grid = make2DArray(cols, rows);
    next = make2DArray(cols, rows);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = Math.floor(Math.random() * 1.06);
        }
    }
}

function draw() {
    background(0);
    generateNext();
    grid = next;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let x = i * unitSize;
            let y = j * unitSize;
            if (grid[i][j] > 0) {
                let lifespan = grid[i][j] * 10;
                if (lifespan > 255) lifespan = 255
                fill(color(255 - lifespan, 0 + lifespan, 0));
                rect(x, y, unitSize, unitSize)
            }
        }
    }

}

function generateNext() {

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1
            }
            else if (state >= 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state === 0 ? 0 : ++state;
            }
        }
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            sum += grid[col][row] > 0 ? 1 : 0;
        }
    }
    sum -= grid[x][y] > 0 ? 1 : 0;
    return sum;
}