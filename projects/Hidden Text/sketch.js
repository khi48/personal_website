let paragraph = "Knock Knock!\n\nWho's There?\n\nI am\n\nI am who?\n\nYou tell me!";
let letter_list = [];
let start = false;
let text_size = 32;

let startButton;
let newTextButton;
let textArea;
let submitTextButton;

class Letter {
  constructor(letter, arranged_pos){
    this.letter = letter;
    this.arranged_pos = arranged_pos;
    this.random_pos = createVector(random(width), random(height));
    this.current_pos = this.random_pos.copy();
    this.active = false;
  }

  update(mouse_pos){

    let dist = this.arranged_pos.dist(mouse_pos);

    if (dist < 100){
      this.active = true;
    } else {
      this.active = false;
    }

    let desired_pos = this.random_pos;

    if (this.active){
      desired_pos = this.arranged_pos;
    }

    this.current_pos.x += (desired_pos.x-this.current_pos.x)*0.5;
    this.current_pos.y += (desired_pos.y-this.current_pos.y)*0.5;
  }

  draw(){
    if (this.active){
      fill(0);
    } else {
      fill(75, 75);
    }
    text(this.letter, this.current_pos.x, this.current_pos.y);
  }
}

let font;
function preload(){
  font = loadFont('assets/Helvetica.ttf');
}

function createText(){
  letter_list = [];
  let l;
  let y = 250;
  let x = width/2-200;
  for (l in paragraph) {
    print(paragraph[l])
    if (paragraph[l] == '\n'){
      x = width/2-200;
      y += text_size + text_size/10;
    } else {
      let pos = createVector(x,y)
      letter_list.push(new Letter(paragraph[l], pos));
      let bounds = font.textBounds(paragraph[l], 0, 0, text_size);
      x += bounds.w+text_size/8;
      if (x > (width-100)){
        x = width/2-200;
        y += text_size + text_size/10;
      }
    }
  }
}

function generateNewParagraph() {
  paragraph = textArea.value();
  textArea.hide();
  submitTextButton.hide();
  newTextButton.show();

  start = false;

  createText();
  drawInitialLetters();
}

function createNewText(){
  newTextButton.hide();
  textArea.show();
  submitTextButton.show();
}


function createHtmlFeatures(){
  // // start button
  // startButton = createButton('Click Here to Start!');
  // startButton.position(100, 300);
  // startButton.size(300,50);
  // startButton.mousePressed(startPushed);
  // startButton.style("font-size", "32px");
  // startButton.style("color", "black");
  // startButton.style("background-color", "Transparent"); 
  // startButton.style("border", "none"); 
  // startButton.style("outline", "none"); 

  // button to allow user to change the visible text
  newTextButton = createButton('New Text');
  newTextButton.size(100,50);
  newTextButton.position(width-newTextButton.width-20, 20);
  newTextButton.mousePressed(createNewText);
  newTextButton.style("font-size", "16px");
  newTextButton.style("color", "black");
  newTextButton.style("background-color", "#FAFAFA"); 
  newTextButton.style("border-color", "white");
  newTextButton.style("border", "1px solid"); 
  newTextButton.style("box-shadow", "0px 0px 0px transparent"); 
  // newTextButton.style("border-radius", "20px");
  newTextButton.show();

  // text area for users to type into
  textArea = createElement('textarea', '');
  textArea.position(width/2, height/2);
  textArea.style("colour", "black")
  textArea.style("border", "1px solid");
  textArea.style("font-size", "16px");
  //textArea.style("placeholder", "Your text here");
  textArea.elt.placeholder = 'Your text here';
  textArea.hide();

  // submit button to finalise text
  submitTextButton = createButton('Submit');
  submitTextButton.size(70, textArea.height);
  submitTextButton.position(width/2-submitTextButton.width, textArea.y);
  submitTextButton.mousePressed(generateNewParagraph);
  submitTextButton.style("font-size", "16px");
  submitTextButton.style("color", "black");
  submitTextButton.style("background-color", "#FAFAFA"); 
  submitTextButton.style("border-color", "white");
  submitTextButton.style("border", "1px solid"); 
  submitTextButton.style("box-shadow", "0px 0px 0px transparent"); 
  submitTextButton.hide();
}

function drawInitialLetters(){
  background(255);

  textSize(text_size);
  for (i in letter_list){
    letter_list[i].draw();
  }
  // startButton.show();
  // fill(0);
  // text('Click here to start!', 100, 300);
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  textFont(font);

  createText();
  createHtmlFeatures();
  drawInitialLetters();
}



// function startPushed(){
//   start = true;
//   startButton.hide();
// }

function draw(){

  // if (start){
  background(255);
  textSize(text_size);
  let i;
  let mouse_pos = createVector(mouseX, mouseY);
  for (i in letter_list){
    letter_list[i].update(mouse_pos);
    letter_list[i].draw();
  }
  // } 
  // at around 500 words, the frameRate drops to about 10 fps
} 
