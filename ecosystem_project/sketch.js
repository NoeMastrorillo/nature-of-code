
let fishes = [];

const fwm = 80;
const fws = 10;
const fhm = 60;
const fhs = 10;

function setup() {
    createCanvas(1000, 800);

    const nfishes = random(2, 5);
    for (let i = 0; i < nfishes; i++) {
        fishes.push(new Fish(randomGaussian(fwm, fws), randomGaussian(fhm, fhs)));
    }
}

function draw() {
    background("aliceblue");

    for (const fish of fishes) {
        fish.step();
        fish.draw();
    }
}
