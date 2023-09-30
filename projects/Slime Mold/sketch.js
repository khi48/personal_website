class MyRBush extends RBush {
  toBBox([x, y]) { return {minX: x, minY: y, maxX: x, maxY: y}; }
  compareMinX(a, b) { return a.x - b.x; }
  compareMinY(a, b) { return a.y - b.y; }
}

var colours = [[192, 192, 0], [255, 255, 192], [255, 192, 192], [0, 128, 64], [128, 192, 64], [128, 192, 128], [64, 192, 192], [64, 128, 128], [80, 0, 192], [128, 64, 255], [160, 160, 160], [64, 64, 64], [128, 0, 128], [192, 128, 192], [192, 192, 255], [128, 128, 64]];

var leaf_list = [];
var branch_list = [];

/* small leaves, fine branches */
const branch_length = 4;
const min_distance = 5;
let max_distance = 25;
const num_leaves = 5000;

/* large leaves, large branches */
// const branch_length = 5;
// const min_distance = 4;
// const max_distance = 100;
// const num_leaves = 5;

let fr = 20;

const leaves = new MyRBush(); // each node made up of: [x, y]
var alive_branches = new MyRBush(); // each node made up of: [x, y, parent_x, parent_y, dir_x, dir_y, length, alive, colour] 

var grow_length = branch_length/4;
var last_draw = true;

var once = true;

let font;
let message = 'Slimey';
let text_size = 350;

function preload(){
  font = loadFont('assets/open-sans/OpenSans-Bold.ttf');
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(fr)
  g = createGraphics(width, height);

  textFont(font);
  textSize(text_size);
  max_distance = text_size/10


  leaf_list = createText(message, font, text_size, windowWidth, windowHeight);

  // bulk loading points into rtree
  leaves.load(leaf_list); // accepts [x, y] point

  // knn will return the points in order

}

function calculate_dir(x1, y1, x2, y2){
  let dir_x = x2-x1;
  let dir_y = y2-y1;
  let div = sqrt(dir_x**2 + dir_y**2);
  dir_x /= div;
  dir_y /= div;
  return [dir_x, dir_y];
}

function mousePressed(){
  if (last_draw){
    // find the closest leaf to try and find the 
    var closest_leaf = knn(leaves, mouseX, mouseY, 1)[0]; // return the nearest item around point
    var dir = calculate_dir(mouseX, mouseY, closest_leaf[0], closest_leaf[1]);

    alive_branches.insert([mouseX+grow_length*dir[0], mouseY+grow_length*dir[1], mouseX, mouseY, dir[0], dir[1], grow_length, 1, colours[int(random(colours.length))]]);

  }
}

function updateAliveBraches(node) {

  if (node.leaf) { // checking if it is the end array of the rbush tree
    g.strokeWeight(min_distance/5);

    for (var i = 0; i < node.children.length; i++) {

      var branch = node.children[i]


      var leaves_too_close = knn(leaves, branch[0], branch[1], null, null, min_distance);
      for (i in leaves_too_close){
        leaves.remove(leaves_too_close[i])
      }
      
      g.stroke(branch[8][0], branch[8][1], branch[8][2]);

      g.line(branch[0], branch[1], branch[2], branch[3]);

      // draw the alive_branches
      if (branch[6] <= branch_length){

        branch[6] += grow_length
        branch[0] += grow_length*branch[4]
        branch[1] += grow_length*branch[5]
      } else if (branch[7]==0){
        alive_branches.remove(branch);
      } else {
        // kill all the alive_branches, relevant ones will be revived
        branch[7] = 0
      }

      // check if any leaves are close enough to remove
      
    }
    return;
  }

  for (var i = 0; i < node.children.length; i++) {
    updateAliveBraches(node.children[i])
  }
}


function updateLeaves(node) {

  if (node.leaf) {
    noStroke();
    fill(255);

    // look at each leaf and find the closest alive_branches
    for (var i = 0; i < node.children.length; i++) {
      var leaf = node.children[i];

      // draw leaf
      circle(leaf[0], leaf[1], min_distance/4);
      
      // find the closest branch within max_distance
      var closest_branches = knn(alive_branches, leaf[0], leaf[1], null, null, max_distance); 

      // this prevents the branches that could grow towards the leaf from dying. 
      for (branch in closest_branches){
          closest_branches[branch][7] = 1;
      } 
      closest_branch = closest_branches[0];

      // pull the closest branch towards the leaf
      if (closest_branch){
        
        // check whether the branch is still growing
        if (closest_branch[6]>=branch_length){
          // calculate the direction from the current branch to the leaf
          var dir = calculate_dir(closest_branch[0], closest_branch[1], leaf[0], leaf[1]);

          // adjust the direction of the parent branch to move towards the leaf
          // (the amount which this turns could be changed).
          var weight = 0.5;
          var dir_x = weight*closest_branch[4] + (1-weight)*dir[0] + random(-0.1, 0.1);
          var dir_y = weight*closest_branch[5] + (1-weight)*dir[1] + random(-0.1, 0.1);
          var normalize = sqrt(dir_x**2 + dir_y**2);
          dir_x /= normalize;
          dir_y /= normalize;

          var new_branch_x = closest_branch[0] + grow_length*dir_x;
          var new_branch_y = closest_branch[1] + grow_length*dir_y;
          alive_branches.insert([new_branch_x, new_branch_y, closest_branch[0], closest_branch[1], dir_x, dir_y, grow_length, 1, closest_branch[8]]);
        }
      } 
    }
    return;
  }

  for (var i = 0; i < node.children.length; i++) {
    updateLeaves(node.children[i]);
  }
}

function draw() {

  stroke(255);
  strokeWeight(2);
  fill(255);

  // if there are still leaves, update the tree and draw it
  if (leaves.data.children.length > 0){
    background(0);

    updateAliveBraches(alive_branches.data)
    updateLeaves(leaves.data)
    image(g, 0, 0);


  } else {
    if (last_draw){
      background(0); 
      updateAliveBraches(alive_branches.data)
      updateLeaves(leaves.data)
      image(g, 0, 0);

      last_draw = false;
    }
    print('done');
  }

}