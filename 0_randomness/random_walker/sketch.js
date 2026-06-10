
class Walker {
    constructor() {
        this.x = width/2;
        this.y = height/2;
    }

    step() {
        let d = floor(random(4));
        switch (d) {
            case 0: this.x++; break;
            case 1: this.x--; break;
            case 2: this.y++; break;
            case 3: this.y--; break;
        }
    }

    update() {
        if (this.x < 0) {
            this.x = width+this.x;
        } else if (this.x >= width) {
            this.x = 0+(width-this.x);
        }

        if (this.y < 0) {
            this.y = height+this.y;
        } else if (this.y >= height) {
            this.y = 0+(height-this.y);
        }
    }

    show() {
        stroke(0);
        strokeWeight(1);
        point(this.x+0.5, this.y+0.5);
    }
}


class Walker9D extends Walker {
    constructor() {
        super();
    }

    step() {
        let xstep = floor(random(3))-1;
        let ystep = floor(random(3))-1;
        this.x += xstep;
        this.y += ystep;
    }
}


class WalkerFloat extends Walker {
    constructor() {
        super();
    }

    step() {
        let xstep = random(-1, 1);
        let ystep = random(-1, 1);
        this.x += xstep;
        this.y += ystep;
    }

    show() {
        stroke(0);
        strokeWeight(1);
        point(this.x, this.y);
    }
}

class LineWalker extends Walker {
    constructor() {
        super();
        this.prevx = this.x;
        this.prevy = this.y;
    }

    show() {
        stroke(0);
        strokeWeight(1);
        line(this.prevx, this.prevy, this.x, this.y);
        this.prevx = this.x;
        this.prevy = this.y;
    }
}


// Ex 0.1
class BiasedWalkerFloat extends WalkerFloat {
    constructor() {
        super();
    }

    step() {
        let xstep = random(-0.95, 1);
        let ystep = random(-0.95, 1);
        this.x += xstep;
        this.y += ystep;
    }
}

class BiasedWalker extends Walker {
    constructor() {
        super()
    }

    step() {
        let p = random();
        if (p < 0.4) {
            this.x++;
        } else if (p < 0.6) {
            this.x--;
        } else if (p < 0.8) {
            this.y++;
        } else {
            this.y--;
        }
    }
}


// Ex 0.3
class WalkerMouse extends Walker {
    constructor() {
        super()
    }

    step() {
        let p = random();
        if (p < 0.5) {
            let xstep = mouseX-this.x;
            let ystep = mouseY-this.y;
            this.x += xstep/abs(xstep);
            this.y += ystep/abs(ystep);
        } else {
            super.step()
        }
    }
}


// Ex 0.5
class GaussianWaler extends WalkerFloat {
    constructor(mean, std) {
        super()
        this.mean = mean;
        this.std = std;
    }

    step() {
        this.x += randomGaussian(this.mean, this.std);
        this.y += randomGaussian(this.mean, this.std);
    }
}


// Ex 0.6
class CustomWalker extends LineWalker {
    constructor(maxstep) {
        super();
        this.maxstep = maxstep;
    }

    probability(step) {
        // return -pow(step,2)/pow(this.maxstep, 2)+1;
        return step >= 0 ? -step/(this.maxstep)+1 : step/(this.maxstep)+1;
    }

    step() {
        let stepx, stepy, px, py;
        do {
            stepx = random(-this.maxstep, this.maxstep);
            stepy = random(-this.maxstep, this.maxstep);
            px = this.probability(stepx);
            py = this.probability(stepy);
        } while (random() > px && random() > py);

        this.x += stepx;
        this.y += stepy;
        console.log(stepx, stepy);
    }
}


// Ex 0.7
class PerlinWalker extends Walker {
    constructor(incr, maxstep) {
        super();
        this.incr = incr;
        this.maxstep = maxstep;
        this.xoff = 0;
        this.yoff = 1000;
    }

    step() {
        // this.x = map(noise(this.xoff), 0, 1, 0, width);
        // this.y = map(noise(this.yoff), 0, 1, 0, height);
        this.x += map(noise(this.xoff), 0, 1, -this.maxstep, this.maxstep);
        this.y += map(noise(this.yoff), 0, 1, -this.maxstep, this.maxstep);
        this.xoff += this.incr;
        this.yoff += this.incr;
    }

    show() {
        stroke(0);
        fill(127);
        circle(this.x, this.y, 20);
    }
}

let walker;


function setup() {
    createCanvas(800, 600);
    background(255);

    walker = new PerlinWalker(0.01, 10);
    walker.show();
}

function draw() {
    background(255, 10),
    walker.step();
    walker.update();
    walker.show();
}
