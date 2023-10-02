let jake_top;
let jake_middle;
let jake_bottom;

let jake_top_size;
let jake_middle_size;
let scale = 1;

let pos;
let top_offset;
let bottom_offset;

let mouse_angle = 0;
let step_size = 0.08;
let max_count = 300;

let g;
let fr = 30;

let start = false;

let print_count = 5;


function preload(){
  jake_top = loadImage('assets/jake_top.png')
  jake_middle = loadImage('assets/jake_middle.png')
  jake_bottom = loadImage('assets/jake_bottom.png')
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(fr);

  g = createGraphics(width, height); // contains middle and bottom as they are not changing once they are drawn

  jake_top_size = createVector(jake_top.width, jake_top.height);
  jake_middle_size = createVector(jake_middle.width, jake_middle.height);

  pos = createVector(random(75, width-75), random(150, height-150)); // defines the middle of jake
  mouse_angle = PI/2;
  
  top_offset = createVector(-1.5, (jake_top.height/2+jake_middle.height/2-0.2), ); // offset position from middle to top image
  top_offset.rotate(mouse_angle);
  bottom_offset = createVector(-6.1,63); // offset posiition from middle to bottom image

  // drawing initial jake middle and bottom (not top as this needs to change)
  g.imageMode(CENTER);
  g.image(jake_middle, pos.x, pos.y);
  g.image(jake_bottom, pos.x+bottom_offset.x, pos.y+bottom_offset.y);
}

// rotates and draws image to canvas
function imageRotateCanvas(img, x, y, ang, size_x, size_y){
  imageMode(CENTER);
  let a = ang - PI/2; // have to shift mouse_angle
  translate(x, y);
  rotate(a);
  image(img, 0, 0, size_x, size_y);
  rotate(-a);
  translate(-x, -y);
}

// rotates and draws image to specified graphics sheet
function imageRotateGraphics(graphics, img, x, y, ang, size_x, size_y){
  graphics.imageMode(CENTER);
  let a = ang - PI/2; // have to shift mouse_angle
  graphics.translate(x, y);
  graphics.rotate(a);
  graphics.image(img, 0, 0, size_x, size_y);
  graphics.rotate(-a);
  graphics.translate(-x, -y);
}


// starting 'game'
function mouseClicked() {
  start = true;
}



function draw(){
  background(255);

  // drawing jake
  imageMode(CORNER);
  image(g, 0, 0); // drawing the graphics to the screen

  // calculating the position of the top of jake, relative to the middle pos
  let top_x = pos.x + cos(mouse_angle)*top_offset.x*scale + sin(mouse_angle)*top_offset.y*scale;
  let top_y = pos.y + sin(mouse_angle)*top_offset.x*scale - cos(mouse_angle)*top_offset.y*scale;

  imageRotateCanvas(jake_top, top_x, top_y, mouse_angle, jake_top_size.x*scale, jake_top_size.y*scale); // jake_top is drawn to canvas as it changes


  // state machine
  if (!start){
    textSize(32);
    text('Click to start!', width/2, height/2);
  } else {
    let prev_pos = pos.copy();

    // make speed dependant on distance
    step_size = sqrt((mouseX-pos.x)**2 + (mouseY-pos.y)**2)*0.2/max_count;
    
    // keeping angle within -2*PI and 2*PI
    // probably not necessary, but would stop any overflow
    if (abs(mouse_angle) > 2*PI){
      mouse_angle = mouse_angle%(2*PI);
    }

    // finding angle between current pos and mouse
    let angle = atan2(pos.y-mouseY, pos.x-mouseX);

    // shifting the angle between current pos mouse into same quadrant as the current angle
    angle += 2*PI*round((mouse_angle - angle)/(2*PI));

    // splitting up angle difference to be applied over length of step
    let angle_dif = (mouse_angle-angle)/max_count;

    let count = max_count;
    while(count > 0){
      mouse_angle -= angle_dif;
      imageRotateGraphics(g, jake_middle, pos.x, pos.y, mouse_angle, jake_middle_size.x*scale, jake_middle_size.y*scale);
      pos.x -= step_size*cos(mouse_angle);
      pos.y -= step_size*sin(mouse_angle);
      count -= 1;

      // reduce size of image
      if (scale > 0.1){
        let dist = prev_pos.dist(pos);
        scale -= dist*0.00003/max_count;
      }
    } 
  }


}
