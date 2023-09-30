let jake_top;
let jake_middle;
let jake_bottom;

let middle_offset;
let mid_x;
let mid_y; 
let bottom_offset;

let start_pos;
let pos;
let prev_pos;
let angle;
let top_offset = [12, 12];

let g;
let fr = 30;

let start = false;


function preload(){
  jake_top = loadImage('assets/jake_top.png')
  jake_middle = loadImage('assets/jake_middle.png')
  jake_bottom = loadImage('assets/jake_bottom.png')
}

function setup(){
  createCanvas(displayWidth, displayHeight);
  background(255);
  frameRate(fr);

  g = createGraphics(width, height);

  mid_x = 1.5;
  mid_y = jake_top.height/2+jake_middle.height/2-0.5

  middle_offset = createVector(mid_x, mid_y);
  bottom_offset = createVector(-4.5, jake_top.height/2+jake_middle.height+jake_bottom.height/2-1);

  pos = createVector(400, 500);
  prev_pos = pos.copy().add(middle_offset);

  g.imageMode(CENTER);
  g.image(jake_middle, pos.x+middle_offset.x, pos.y+middle_offset.y);
  g.image(jake_bottom, pos.x+bottom_offset.x, pos.y+bottom_offset.y);

  angle = -PI/2
}

function update(){
  prev_pos = pos.copy();

  angle = atan2(mouseY-pos.y, mouseX-pos.x);
  top_velocity = sqrt((mouseX-pos.x)**2 + (mouseY-pos.y)**2)*0.2;

  pos.x += top_velocity*cos(angle);
  pos.y += top_velocity*sin(angle);

  middle_offset.x = cos(angle)*mid_x + sin(angle)*mid_y;
  middle_offset.y = sin(angle)*mid_x + cos(angle)*mid_y;
}

function imageRotate(canvas, img, p, a){
  print('rotate img')
  print(p)
  if (canvas){
    canvas.imageMode(CENTER);
    a += PI/2;
    canvas.translate(p.x, p.y);
    canvas.rotate(a);
    canvas.image(img, 0, 0);
    canvas.rotate(-a);
    canvas.translate(-p.x, -p.y);
  } else {
    imageMode(CENTER);
    a += PI/2;
    translate(p.x, p.y);
    rotate(a);
    image(img, 0, 0);
    rotate(-a);
    translate(-p.x, -p.y);

  }
}

function mouseClicked() {
  start = true;
}

function draw(){
  background(255);

  imageMode(CORNER);
  image(g, 0, 0);

  imageRotate(null, jake_top, pos, angle);

  if (!start){
    textSize(32);
    text('Click to start!', width/2, height/2);
    print('not started')
  } else {
    let step = createVector(cos(angle), sin(angle)).mult(0.1);
    let dist = prev_pos.dist(pos)
    //let count = 0;
    while( dist > 0){
      dist -= step.mag();
      prev_pos.add(step);
      imageRotate(g, jake_middle, prev_pos, angle);
    }

    update();
  }

}
