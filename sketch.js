let h;

function setup() {
	createCanvas(windowWidth, windowHeight);
	h = new Hole();
}

function draw() {
	background(50, 150, 150);
	h.update();
	h.show();
}

class Hole{
	constructor(){
		this.pos = createVector(width/2, height/2);
		this.posLocked = true;
		this.gravity = 1;
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
		ellipse(this.pos.x, this.pos.y, 150, 150);
	}
}
