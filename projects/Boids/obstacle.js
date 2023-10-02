class Obstacle {
    constructor(position) {
        this.position = position;
        this.object_size = 40;
    }

    show(){
        strokeWeight(this.object_size);
        stroke(255);
        point(this.position.x, this.position.y)
    }
}