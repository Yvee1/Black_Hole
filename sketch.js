let h;
let p;
function setup() {
	createCanvas(windowWidth, windowHeight);
	h = new Hole();
	p = new Particle();
}

function draw() {
	background(50, 150, 150);
	h.update();
	p.update();
	h.show();
	p.show();
}

class Hole{
	constructor(){
		this.pos = createVector(width/2, height/2);
		this.posLocked = true;
		this.gravity = 0.01;
		this.r = 75;
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
	constructor(){
		this.pos = createVector(random(-200, width+200),
								random(-200, height+200));
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.alive = true;
		this.r = random(1, 20);
	}

	update(){
		// Reset acceleration
		acc.mult(0);
		// Calculate distance between particle and black hole
		let d = pos.dist(h.pos);
		// If particle too far of the screen or if in black hole set it dead
		if(this.pos.x <- 200 || this.pos.x > width + 200 ||
		   this.pos.y < -200 || this.pos.y > height + 200||
	   	   d < h.r){
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
