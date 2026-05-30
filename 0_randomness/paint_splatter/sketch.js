// Ex 0.4

let stdSlider;
let nsplashesSlider;


function setup() {
    createCanvas(800, 600);
    background(255);

    stdSlider = createSlider(0, 100, 50);
    stdSlider.position(10, 10);
    stdSlider.changed(sliderChanged);
    nsplashesSlider = createSlider(0, 500, 100);
    nsplashesSlider.position(10, 30);
    nsplashesSlider.changed(sliderChanged);

    splash(stdSlider.value(), nsplashesSlider.value());
}

function splash(std, nsplashes) {
    let centerx = width/2;
    let centery = height/2;
    let centercol = color("red");
    for (let i = 0; i < nsplashes; i++) {
        let x = randomGaussian(centerx, std);
        let y = randomGaussian(centery, std);
        let pnorm = sqrt(pow(x-centerx, 2) + pow(y-centery, 2));
        let diam = max(0, 3*std-pnorm);
        let col = randomColorGaussian(centercol, 10);
        stroke(col);
        strokeWeight(diam/3);
        point(x, y);
    }
}

function randomColorGaussian(centercol, std) {
    return color(randomGaussian(red(centercol), std), randomGaussian(green(centercol), std), randomGaussian(blue(centercol), std));
}

function sliderChanged() {
    background(255);
    splash(stdSlider.value(), nsplashesSlider.value());
}
