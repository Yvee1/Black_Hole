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
	let pos;
	let posLocked;
	const gravity = 1;

	constructor(){
		pos = createVector(width/2, height/2);
		posLocked = true;
	}

	update(){
		if(!posLocked){
			pos.x = mouseX;
			pos.y = mouseY;
		}
	}

	show(){
		fill(0);
		noStroke();
		ellipse(pos.x, pos.y, 150, 150);
	}
}
