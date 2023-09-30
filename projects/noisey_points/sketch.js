let t = 0;
let points = [];
let noise_scale = 0.01;
let num_points;
let intensity = 10.0;
let functional_width;
let functional_height;

class Point {
  constructor(position) {
    this.position = position;
    this.offset = createVector();
  }

  update(t) {
    let x = intensity * (noise(this.position.x, this.position.y, t)-0.48);
    let y = intensity * (noise(this.position.x + 100, this.position.y, t)-0.48);
    this.offset = createVector(x, y);
    this.position.add(this.offset);
  }

  show() {
    strokeWeight(1);
    stroke(127);
    point(this.position.x, this.position.y);
  }

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  smooth();
  background(0);
  num_points = windowWidth*windowHeight/800;
  let functional_width = windowWidth;
  let functional_height = windowHeight;

  for (let i=0; i < num_points; i++) {
    points.push(new Point(createVector(random(0,functional_width), random(0,functional_height))));
  }
}

function draw() {
  background(0);
  stroke(55);
  t += 0.01

  for (let i=0; i < num_points; i ++) {
    points[i].update(t);
    points[i].show();
  }
  text("Frame Count with frameRate " + 
         int(getFrameRate()), 100, 100);
}