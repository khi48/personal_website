
function inside(point, vs) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  var x = point[0], y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];

      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }

  return inside;
}


function createText(message, font, text_size, width, height) {
  // let num_points = 80000;
  let num_points = 1000;

  let random_points = [];

  let message_width = textWidth(message);
  let centering_offset = (width-message_width)/2;

  let gap = centering_offset;
  let previous_letter_gap = 0;

  let y = height/2+text_size/3;

  for (let l in message){

    let bounds = font.textBounds(message[l], 0, 0, text_size);
    // print(bounds)

    gap += previous_letter_gap;
    
    if (bounds.advance > text_size/20){
      previous_letter_gap = bounds.w + text_size/20;
    } else {
      previous_letter_gap = bounds.w + bounds.advance;
    }

  
    let text_points_extended = font.textToPoints(message[l], gap, y, text_size, {
      sampleFactor: 0.3, // changing this reduces the number of points used to compute area of text
      simplifyThreshold: 0
    });

    let text_points = [];

    for (let i=0; i<text_points_extended.length; i++){
      text_points.push([text_points_extended[i].x, text_points_extended[i].y])
    }


    for (let i=0; i<num_points*(bounds.w/50); i++){
      let point = [random(gap, gap + previous_letter_gap), random(y-bounds.h, y+text_size*1.5)];
      if (inside(point, text_points)) {
        random_points.push(point)
      }
    }
    
  }
  
  return random_points
}
