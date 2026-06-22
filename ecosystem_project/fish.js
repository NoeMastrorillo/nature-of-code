
const minspeed = 2;
const maxspeed = 3;
const xns = 0.05;
const yns = 0.005;
const ts = 0.1;

const brm = 10;
const brs = 3;
const bsm = 1.5;
const bss = 0.3;
const bim = 127;
const bis = 20;

class Fish {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = random(this.w+10, width-this.w-10);
        this.y = height/2;
        this.way = 1;
        this.alpha = 1;

        this.bubbles = [];

        this.shift = random(1, 5000);
    }

    step() {
        this.x += this.way*map(noise(xns*frameCount+1000+this.shift), 0, 1, minspeed, maxspeed);
        this.y = map(noise(yns*frameCount+this.shift), 0, 1, 20, height-20);
        this.alpha = map(sin(ts*frameCount), -1, 1, 0.6, 1);

        if (this.x >= width-this.w) {
            this.way = -1;
        } else if (this.x < this.w) {
            this.way = 1;
        }

        if (random() < 0.05) {
            let rad = abs(randomGaussian(brm, brs));
            let speed = abs(randomGaussian(bsm, bss));
            let intens = abs(randomGaussian(bim, bis));
            this.bubbles.push(new Bubble(this.noseX(), this.y-10, rad, speed, intens));
        }

        this.drawBubbles();
    }

    draw() {
        push();
        noStroke();
        translate(this.x, this.y);
        if (this.way === -1) {
            scale(-1, 1);
        }
        fill("orange");
        ellipse(0, 0, this.w, this.h);
        fill("black");
        circle(this.w/5, -this.h/5, 10);
        fill("darkOrange")
        triangle(
            -this.w*0.3, 0,
            -this.w*this.alpha, -this.h*0.4,
            -this.w*this.alpha, this.h*0.4
        );
        ellipse(this.w/2, 0, this.w/6, this.h/6)
        pop();

        this.drawBubbles();
    }

    drawBubbles() {
        for (let i = 0; i < this.bubbles.length; i++) {
            let bubble = this.bubbles[i];
            if (bubble.stop) {
                this.bubbles.splice(i, 1);
            }
            bubble.step();
            bubble.draw();
        }
    }

    noseX() {
        if (this.way === 1) {
            return this.x+this.w/2;
        } else {
            return this.x-this.w/2;
        }
    }
}


class Bubble {
    constructor(x, y, rad, speed, intens) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.ystart = y;
        this.speed = speed;
        this.intens = intens;
        this.stop = false;
    }

    draw() {
        if (!this.stop) {
            push();
            noStroke();
            fill(color(this.intens, this.intens+50, 255, 127));
            circle(this.x, this.y, this.rad);
            pop();
        }
    }

    step() {
        this.y -= this.speed;
        if (this.y <= 0) {
            this.stop = true;
        }
    }
}
