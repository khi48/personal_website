class Character{
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.radius = 5;
    this.update();
    // this.direction = direction;
    // this.x_change = 0;
    // this.y_change = 0;
  }

  update(){
    this.direction = atan2(mouseY - this.y, mouseX - this.x);

    this.x_change = this.radius*cos(this.direction);
    this.y_change = this.radius*sin(this.direction);
  }

  draw_face(){
    //line(this.x+x_change, this.y+y_change, this.x-x_change, this.y-y_change);
    g.imageMode(CENTER);
    g.image(character_img, this.x, this.y);
  }

  draw_eyes(){
    imageMode(CENTER);
    image(eyes_img, this.x+this.x_change, this.y+this.y_change)

  }
}

var character_list = [];
var size;
var spacing;
var padding_x;
var padding_y;

var character_img;
var eyes_img;

var cursor_size_x;
var cursor_size_y;
var cursor_img;
var cursor_angle = 0;

var buffer_length = 5;
var x_buffer = new Array(buffer_length).fill(0);
var y_buffer = new Array(buffer_length).fill(0);

var prev_x;
var prev_y;

var fr = 30;
var g;

function preload(){
  character_img = loadImage('assets/newspaper_man_115.png');
  eyes_img = loadImage('assets/eyes_115.png');
  cursor_img = loadImage('assets/money_48.png');
}

function setup() {
  // put setup code here
  createCanvas(displayWidth, displayHeight-75);
  g = createGraphics(width, height);

  print(height)
  background(255);
  frameRate(fr);

  size = character_img.width;
  spacing = size*1.25;
  padding_x = character_img.width/2;
  padding_y = character_img.height/2;


  cursor_size_x = cursor_img.width;
  cursor_size_y = cursor_img.height;

  prev_x = mouseX;
  prev_y = mouseY

  //character_img.resize(size,size);
  //eyes_img.resize(size, size);
  //fly_img.resize(cursor_size, cursor_size);

  noCursor();

  let i = 0;
  let x_dir = round(width/spacing) + 1;
  print(width/spacing)
  let j = 0;
  let y_dir = round(height/spacing);

  for (i=0; i<x_dir; i++){
    for (j=0; j<y_dir; j++){
      character_list.push(new Character(i*spacing+padding_x, j*spacing+padding_y));
    }
  }

  for (i=0; i<character_list.length; i++){
    character_list[i].update()
    character_list[i].draw_face()
  }
}

function rotate_and_draw_image(img, x, y, img_width, img_height, angle){
  imageMode(CENTER);
  translate(x+img_width/2, y+img_width/2);
  rotate(angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-angle);
  translate(-(x+img_width/2), -(y+img_width/2));
  imageMode(CORNER);
}

function draw() {
  background(255);

  image(g, 0, 0);

  let i = 0;
  for (i=0; i<character_list.length; i++){
    //if ((((mouseX-compass_list[i].x)**2 + (mouseY-compass_list[i].y)**2)**(1/2))<radius){
    character_list[i].update()
    //}
    character_list[i].draw_eyes()
  }


  x_buffer.push(mouseX);
  x_buffer.shift();

  y_buffer.push(mouseY);
  y_buffer.shift();


  let x_sum = x_buffer.reduce((previous, current) => current += previous);
  let x_avg = x_sum / x_buffer.length;
  let y_sum = y_buffer.reduce((previous, current) => current += previous);
  let y_avg = y_sum / y_buffer.length;


  if ((mouseX != x_avg) && (mouseY != y_avg)) { 
    cursor_angle = atan2(mouseY - y_avg, mouseX - x_avg);
  }


  //angle_avg = (angle_avg - PI/2 + PI*2) % (PI*2);
  // if (angle_avg < 0){
  //   angle_avg = angle_avg + PI*2
  // }

  // print(angle_avg-PI/2);
  rotate_and_draw_image(cursor_img, mouseX-cursor_size_x/2, mouseY-cursor_size_y/2, cursor_img.width, cursor_img.height, cursor_angle - PI/2);

}