let line_density = 20;
let t = 0;
let noise_scale = 100;
let background_c;
let line_c; 

function setup() {
  noise_scale = min(windowWidth, windowHeight)/15;
  line_density = max(windowWidth, windowHeight)/72;
  
  background_c = color("#EBE7E2");
  line_c = color("#A67B5R");

  createCanvas(windowWidth, windowHeight);
  smooth();
  background(background_c);
}

function draw() {
  background(0);
  stroke(55);
  t += 0.001;
  for (let i=0; i <= windowWidth/line_density; i++) {
    for (let j=0; j <= windowHeight/line_density; j++) {
      let nVal = noise(i/noise_scale, j/noise_scale, t);
      if (nVal > 0.5) {

        // make line /
        let bottom_left = [line_density*i, line_density*j];
        let top_right = [line_density*(i+1), line_density*(j+1)];
        line(bottom_left[0], bottom_left[1], top_right[0], top_right[1]);

      } else {

        // make line \
        let top_left = [line_density*i, line_density*(j+1)];
        let bottom_right = [line_density*(i+1), line_density*j];
        line(top_left[0], top_left[1], bottom_right[0], bottom_right[1]);
      }
      
    }
  }
}