// Better performance
p5.disableFriendlyErrors = true;

let h;
let particles;

function setup() {
	createCanvas(500, 500);
	h = new Hole();
	particles = [];
	for (let i = 0; i < 150; i++){
		particles.push(new Particle(true));
	}
}

function draw() {
	background(50, 150, 150);
	particles.push(new Particle());

	// Iterate backwards over the particles
	for(let i = particles.length-1; i >= 0; i--){
		p = particles[i];
		p.update();
		if (!p.alive){
			particles.splice(i, 1);
			continue;
		}
		p.show();
	}

	h.update();
	h.show();
}

function mousePressed(){
	h.posLocked = !h.posLocked;
}

class Hole{
	constructor(){
		this.pos = createVector(width/2, height/2);
		this.posLocked = true;
		this.gravity = 1000;
		this.r = 40;
	}

	update(){
		if(!this.posLocked){
			this.pos.x = mouseX;
			this.pos.y = mouseY;
		}
	}

	show(){
		fill(0);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 2*this.r);
	}
}

class Particle{
	constructor(firstTime = false){
		// At the start particles have to be at a random spot
		if (firstTime){
			this.pos = createVector(random(0, width),
									random(0, height));
		}

		// Otherwise spawn them outside the screen at a random spot
		else{
			if (random(0,1)<0.5){
				let x = random(-50, width+50);
				if (x>=0 && x<=width){
					if (random(0,1)<0.5){
						this.pos = createVector(x, random(-50, 0));
					}
					else{
						this.pos = createVector(x, height+random(0, 50));
					}
				}

				else{
					this.pos = createVector(x, random(-50, height+50));
				}
			}

			else{
				let y = random(-50, width+50);
				if (y>=0 && y<=height){
					if (random(0,1)<0.5){
						this.pos = createVector(random(-50, 0), y);
					}
					else{
						this.pos = createVector(width+random(0, 50), y);
					}
				}

				else{
					this.pos = createVector(random(-50, width+50), y);
				}
			}
		}

		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.alive = true;
		this.r = random(1, 8);
	}

	update(){
		// Reset acceleration
		this.acc.mult(0);
		// Calculate distance between particle and black hole
		let d = this.pos.dist(h.pos);
		// If particle too far of the screen or if in black hole set it dead
		if(this.pos.x <- 50 || this.pos.x > width + 50 ||
		   this.pos.y < -50 || this.pos.y > height + 50||
	   	   d < (h.r - this.r)){
			   this.alive = false;
		   }
		// Calculate force on this object
		let force = h.gravity/(d*d);
		// Set the acceleration towards the hole
		this.acc.x = h.pos.x - this.pos.x;
		this.acc.y = h.pos.y - this.pos.y;
		// Scale it according to the force
		this.acc.normalize();
		this.acc.mult(force);

		this.vel.add(this.acc);
		this.pos.add(this.vel);
	}

	show(){
		noStroke();
		fill(255);
		ellipse(this.pos.x, this.pos.y, this.r)
	}
}
