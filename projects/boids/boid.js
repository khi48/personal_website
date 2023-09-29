class Boid {
    constructor(position) {
        this.max_speed = 4;
        this.max_acc = 0.05;

        this.position = position;
        this.velocity = createVector(random(-width, width), random(-height, height));
        this.velocity.setMag(this.max_speed);
        this.acceleration = createVector();

        this.algin_affect_distance = 25;        
        this.cohesion_affect_distance = 25;
        this.seperation_affect_distance = 25;
        // this.obstacle_affect_distance = 25;

        this.align_strength = 2;
        this.cohesion_strength = 0.1;
        this.seperation_strength = 0.8;
        // this.obstacle_strength = 3;
    }

    find_neighbours(boids) {
        let align_neighbours = [];
        let cohesion_neighbours = [];
        let seperation_neighbours = [];
        for (const boid of boids) {
            if (boid != this) {
                let d = dist(
                    this.position.x,
                    this.position.y,
                    boid.position.x,
                    boid.position.y
                );
                if (d < this.algin_affect_distance) {
                    align_neighbours.push(boid);
                }
                if (d < this.cohesion_affect_distance) {
                    cohesion_neighbours.push(boid);
                }
                if (d < this.seperation_affect_distance) {
                    seperation_neighbours.push(boid);
                }
            }
        }
        return [align_neighbours, cohesion_neighbours, seperation_neighbours];
    }

    align(neighbours) {
        let desired_vel = createVector();
        let steering_force = createVector();
        if (neighbours.length > 0) {

            for (const boid of neighbours) {
                desired_vel.add(boid.velocity);
            }
            
            desired_vel.div(neighbours.length);
            desired_vel.setMag(this.max_speed);
            steering_force = p5.Vector.sub(desired_vel, this.velocity);
            steering_force.limit(this.max_acc);
        }
        return steering_force;
    }

    cohesion(neighbours) {
        let desired_pos = createVector();
        let steering_force = createVector();
        if (neighbours.length > 0) {

            for (const boid of neighbours) {
                desired_pos.add(boid.position);
            }
            
            desired_pos.div(neighbours.length);
            steering_force = desired_pos.sub(this.position);
            steering_force.limit(this.max_speed);
            steering_force.sub(this.velocity);
            steering_force.limit(this.max_acc);
            
        }
        return steering_force;
    }

    seperation(neighbours) {
        let steering_force = createVector();
        if (neighbours.length > 0) {

            for (const boid of neighbours) {
                let diff_direction = p5.Vector.sub(this.position, boid.position);
                let diff_mag = diff_direction.mag();
                diff_direction.normalize();
                steering_force.add(diff_direction.div(Math.pow(diff_mag, 2)));
            }
            steering_force.div(neighbours.length);
            steering_force.setMag(this.max_speed);
            steering_force.sub(this.velocity);
            steering_force.setMag(this.max_acc);
        }
        return steering_force;
    }

    // avoid_obstacles(obstacles) {
    //     let steering_force = createVector();
    //     if (obstacles.length > 0) {
    //         for (const obstacle of obstacles) {
    //             let d = p5.Vector.sub(obstacle.position, this.position);
    
    //             if (d.mag() < this.obstacle_affect_distance) {
    //                 steering_force.add(d.mult(-1));
    //                 steering_force.setMag(this.max_acc);
    //             }   
    //         }
    //     }
        
    //     return steering_force;
    // }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }
    
    flock(boids, obstacles) {
        const [align_neighbours, cohesion_neighbours, seperation_neighbours] = this.find_neighbours(boids);
        let align_force = this.align(align_neighbours);
        let cohesion_force = this.cohesion(cohesion_neighbours);
        let seperation_force = this.seperation(seperation_neighbours);
        // let obstacle_force = this.avoid_obstacles(obstacles);

        // if (obstacle_force > 0) {
        //     this.acceleration.add(obstacle_force.mult(this.obstacle_strength));
        // } else {
        this.acceleration.add(align_force.mult(this.align_strength));
        this.acceleration.add(cohesion_force.mult(this.cohesion_strength));
        this.acceleration.add(seperation_force.mult(this.seperation_strength));
        // }

    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.max_speed);
        this.position.add(this.velocity);
        this.acceleration.set(0,0);
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}