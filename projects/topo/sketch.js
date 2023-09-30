let map = null;
let posNoiseScale = 1/600;
let timeNoiseScale = 1/1000;
let t = 0;
let background_c;
let foreground_c;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);
  noiseDetail(5, 0.5);
  smooth();
  background_c = color("#32E1B0");
  foreground_c = color("#052E1E");
}

function calculate_colour(i, j) {
  let n = noise((i)*posNoiseScale,
    (j)*posNoiseScale, t*timeNoiseScale);

  if (n % 0.1 < 0.008) {
      return background_c;
  }

  return foreground_c;
}

function makeMap()
{
  for(let i = 0; i < width; i++)
  {
    for(let j = 0; j < height; j++)
    {
      set(i, j, calculate_colour(i, j));
    }
  }
  updatePixels();
}

function draw() {
  makeMap();
  t += 0.5;
  let fps = frameRate();
  console.log(fps);
}