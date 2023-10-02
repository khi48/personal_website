function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360.0, 100.0, 100.0, 100.0);
  smooth();
  noLoop();
}

function draw() {

  // number of the reference points
  pointNum  = floor(20);
    
  // get random location points
  points = randomPoints(pointNum, width, height);

  // draw
  background(0.0, 0.0, 0.0, 100.0);
  drawWorley(points);

}

/**
 * randomPoints : return PVector array of random location points
 */
function randomPoints(_num, _w, _h) {

  rnds = [];
  for (let i = 0; i < _num; i++) {
    rnds.push(createVector(random(_w), random(_h)));
  }
  return rnds;

}

/**
 * drawWorley : draws using the Worley noise
 */
function drawWorley(_ps) {

  range  = max(width, height);
  let nsStep = 0.001;
  let dsMult = 50.0;
  
  noStroke();
  for (let iX = 0; iX < width; iX++) {
    for (let iY = 0; iY < height; iY++) {
      // get the distance with the nearest point
      minDist = range;
      for (let i = 0; i < _ps.length; i++) {
        distance = dist(iX, iY, _ps[i].x, _ps[i].y);
        if (minDist > distance) {
          minDist = distance;
        }
      }
      // noise(distance, x, y);
      // calculate brightness with the distance
      let nVal = noise(minDist * dsMult * nsStep, iX * nsStep, iY * nsStep);
      let pBri = nVal * 100.0;

      fill(0.0, 0.0, pBri, 100.0);
      rect(iX, iY, 1.0, 1.0);
    }
  }
}