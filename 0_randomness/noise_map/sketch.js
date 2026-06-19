
/* Exercises 0.8 & 0.9 */

let octavesSlider;
let falloffSlider;
let noiseScaleSlider;
let timeScaleSlider;

function setup() {
    createCanvas(200, 200);

    octavesSlider = createSlider(1, 16, 4, 1);
    octavesSlider.position(10, 10);

    falloffSlider = createSlider(0, 1, 0.5, 0.01);
    falloffSlider.position(10, 30);

    noiseScaleSlider = createSlider(0, 0.1, 0.015, 0.001);
    noiseScaleSlider.position(10, 50);

    timeScaleSlider = createSlider(0, 0.1, 0.01, 0.001);
    timeScaleSlider.position(10, 70);
}

function draw() {
    noiseDetail(octavesSlider.value(), falloffSlider.value());

    loadPixels();

    let idx, nx, ny, bright;
    let ns = noiseScaleSlider.value();
    let ts = timeScaleSlider.value()
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            nx = ns*x;
            ny = ns*y;
            nt = ts*frameCount;

            idx = (y * width + x) * 4;
            pixels[idx] = 255 * noise(nx, ny, nt);
            pixels[idx+1] = 255 * noise(nx+1000, ny+1000, nt);
            pixels[idx+2] = pixels[idx+1];
            pixels[idx+3] = 255;
        }
    }

    updatePixels();
}
