
// Exercise 1.3

let position;
let velocity;

const speed = 3;
const rad = 15;

const boxlen = 400;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    position = createVector(0, 0, 0);
    velocity = createVector(random(), random(), random());
    velocity.normalize();
    velocity.mult(speed);
}

function draw() {
    background(255);

    rotateX(PI/3);
    orbitControl();

    stroke(0);
    noFill();
    box(boxlen, boxlen, boxlen);

    translate(position.x, position.y, position.z);
    noStroke(0);
    fill(0);
    sphere(2*rad);
    
    position.add(velocity);
    if (position.x-rad < -boxlen/2 || position.x+rad > boxlen/2) {
        velocity.x *= -1;
    }
    if (position.y-rad < -boxlen/2 || position.y+rad > boxlen/2) {
        velocity.y *= -1;
    }
    if (position.z-rad < -boxlen/2 || position.z+rad > boxlen/2) {
        velocity.z *= -1;
    }
}
