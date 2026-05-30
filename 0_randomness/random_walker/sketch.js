
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


let walker;


function setup() {
    createCanvas(800, 600);
    background(255);

    walker = new GaussianWaler(0, 1);
    walker.show();
}

function draw() {
    walker.step();
    walker.show();
}
