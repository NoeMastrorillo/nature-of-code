
// Exercise 1.1

class Walker {
    constructor(mean, std) {
        this.pos = createVector(width/2, height/2);
        this.mean = mean;
        this.std = std;
    }

    step() {
        this.pos.add(createVector(randomGaussian(this.mean, this.std), randomGaussian(this.mean, this.std)));
    }

    update() {
        if (this.pos.x < 0) {
            this.pos.x += width;
        } else if (this.pos.x >= width) {
            this.pos.x -= width;
        }

        if (this.pos.y < 0) {
            this.pos.y += height;
        } else if (this.pos.y >= height) {
            this.pos.y -= height;
        }
    }

    show() {
        // stroke(0);
        // strokeWeight(1);
        circle(this.pos.x, this.pos.y, 10);
    }
}


let walker;


function setup() {
    createCanvas(800, 600);
    background(255);

    walker = new Walker(0, 3);
    walker.show();
}

function draw() {
    background(255, 10),
    walker.step();
    walker.update();
    walker.show();
}
