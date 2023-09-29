let elements = document.getElementsByClassName('m');
// console.log(elements)
let element_speeds = []
let affectRadius = 100

let mouse_x = null;
var mouse_y = null;

document.addEventListener('mousemove', onMouseUpdate);

function onMouseUpdate(e) {
    // console.log(e)
    // console.log("onMouseUpdate")
    mouse_x = e.clientX;
    mouse_y = e.clientY;
}
  



function setup(){
    console.log("setup")
    let element_rects = []

    for (let i=0; i<elements.length; i++){
        let rect = elements[i].getBoundingClientRect();
        element_rects.push(rect);
        element_speeds.push({x:0, y:0});
       
    }
    
    for (let i=0; i<elements.length; i++){
        let rect = element_rects[i]
        elements[i].style.position = "absolute";
        elements[i].style.top = rect.top + 'px';
        elements[i].style.left = rect.left + 'px';
    }
}

setup()

function checkDistance(center_x, center_y){
    return ((mouse_x-center_x)**2 + (mouse_y-center_y)**2)**0.5
}

function slowSpeed(speed){
    let speed_mag = ((speed.x)**2 + (speed.y)**2)**0.5
    if (speed_mag > 0.3){
        speed.x = speed.x*0.85;
        speed.y = speed.y*0.85;
    } else {
        speed.x = 0;
        speed.y = 0;
    }
    return speed
}

var intervalID = setInterval(updateElements, 10);

function updateElements(){
    // console.log("mouse move")
    // console.log(event)
    // console.log('working')
    for (let i=0; i<elements.length; i++){ 

        // console.log(elements[i])
        let rect = elements[i].getBoundingClientRect();
        let center_x = rect.left + rect.width/2;
        let center_y = rect.top + rect.height/2;
        // let mouse_x = event.clientX;
        // let mouse_y = event.clientY

        let dist = checkDistance(center_x, center_y);

        if (dist < affectRadius) {
            // add speed 
            let x_speed = (center_x - mouse_x)*(affectRadius-dist)/40
            let y_speed = (center_y - mouse_y)*(affectRadius-dist)/40

            element_speeds[i] = {x:x_speed, y: y_speed}
        } else {
            // decrease speed
            element_speeds[i] = slowSpeed(element_speeds[i])
        }
        let screen_height = document.body.clientHeight
        let screen_width = document.body.clientWidth
        // Checking Edges of Screen
        if (rect.right >= screen_width){
            element_speeds[i].x *= -1;
            elements[i].style.left = (screen_width - rect.width) + 'px';

        } else if (rect.left <= 0) {
            element_speeds[i].x *= -1;
            elements[i].style.left = 0 + 'px';
        }

        if (rect.bottom >= screen_height){
            element_speeds[i].y *= -1;
            elements[i].style.top = (screen_height - rect.height) + 'px';

        } else if (rect.top <= 0) {
            element_speeds[i].y  *= -1;
            elements[i].style.top = 0 + 'px';
        }

        rect = elements[i].getBoundingClientRect();



        elements[i].style.top = (rect.top + element_speeds[i].y) + 'px';
        elements[i].style.left = (rect.left + element_speeds[i].x) + 'px';
        // elements[i].style.left = rect.left + 10 + 'px';

        

        // elements[i].style.top = event.clientY + 'px';
        // elements[i].style.left = event.clientX + 'px';
        
    }
}