const flock = [];
const obstacles = [];

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  for (let i=0; i<100; i++) {
    flock.push(new Boid(createVector(random(width), random(height))));
  }
  // for (let i=0; i<2; i++) {
  //   obstacles.push(new Obstacle(createVector(random(width), random(height))));
  // }
  
} 

function mousePressed() {
  flock.push(new Boid(createVector(mouseX, mouseY)));
}


function draw() {
  background(51);
  for (let boid of flock) {
    boid.edges();
  }


  for (let boid of flock) {
    boid.flock(flock);
  }

  for (let boid of flock) {
    boid.update();
    boid.show();
  }

  // for (let obstacle of obstacles) {
  //   obstacle.show();
  // }

}