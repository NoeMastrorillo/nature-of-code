
/* Exercise 0.10 */

const planeSize = 30;
let nrows, ncols;

const ns = 0.2;
const nl = 150;
const fcns = 0.03;
const fcr = 0.01

function setup() {
    createCanvas(800, 600, WEBGL);

    nrows = height/planeSize;
    ncols = width/planeSize;

}

function draw() {
    background(255);
    orbitControl();

    rotateX(PI/3);
    rotateZ(fcr*frameCount);
    translate(-width/2, -height/2);

    let elev, h1, h2, h3, h4;
    for (let j = 0; j < ncols; j++) {
        for (let i = 0; i < nrows; i++) {
            elev = noise(ns*j, ns*i, fcns*frameCount)
            h1 = nl*elev;
            h2 = nl*noise(ns*(j+1), ns*i, fcns*frameCount);
            h3 = nl*noise(ns*(j+1), ns*(i+1), fcns*frameCount);
            h4 = nl*noise(ns*j, ns*(i+1), fcns*frameCount);
            
            fill(map(elev, 0, 1, 100, 200));
            beginShape();
            vertex(j*planeSize, i*planeSize, h1);
            vertex((j+1)*planeSize, i*planeSize, h2);
            vertex((j+1)*planeSize, (i+1)*planeSize, h3);
            vertex(j*planeSize, (i+1)*planeSize, h4);
            endShape();

        }
    }
}