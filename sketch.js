let bubbles= [];
let timer = 20;
let gameState = "title"
let score = 15;
var bubblePopSound = new Audio("pop.mp3"); 	
let sprite;
let ship;

function preload() {
	sprite = loadImage("https://cdn.glitch.com/d48bf140-5a31-4810-af2f-6ef9ae85f5c3%2F2363425d573122e2d4378a8181aca37a.png?1513103072452");
	
}

function setup() { // built-in P5.JS function -=- this runs once
	createCanvas(700, 800);
	setInterval(time, 1000);
	ship = new Hero(10, 10, 0, 0);
for(let i = 0; i<30; i++) {
	let x = random(width);
	let y = random(height);
	let r = random(10, 50);
	let b =  new Bubble(x,y,r);
	bubbles.push(b);
	}


}

function draw() { 
background(0);
winOrLose();
	if(gameState=="title") {
		showTitleScreen();
	} else if(gameState=="lose") {
		showLoseScreen();
	} else if(gameState=="win") {
		showWinScreen();
	}else{
	for(let i = 0; i < bubbles.length; i++) {
		if(bubbles[i].contains(mouseX, mouseY)) {
			bubbles.splice(i, 1);
			bubblePopSound.play();
			score--;
		}
		bubbles[i].move();
		bubbles[i].show();
	}
	timeAndScore();
	}
}
ship.show();

function timeAndScore() {
	textSize(32);	
	text("Timer: " +timer, 10, 30);
	textSize(32);
	text("Score: " +score, 10, 70);	
}

class Bubble{
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.brightness = 0;
	}
	
	changeColor(bright) {
		this.brightness = bright;
	}

	contains(px, py) {
		let d = dist(px, py, this.x, this.y);
		if(d < this.r) {
			return true;
		}else {
			return false;
		}
	}
	
	move() {
		this.x = this.x + (0);
		this.y = this.y + (10);	
		if(this.x > width) {
			this.x = 0;
		}		
		else if(this.x < 0) {
			this.x  = width;
		}
		if(this.y > height) {
			this.y = 0;
			this.x = random(0, 800);
		}		
		else if(this.y < 0) {
			this.y  = height;
		}
	}
	
	show() {
		stroke(255); // white outline
		strokeWeight(4); // line width
		fill(this.brightness, 100);
		ellipse(this.x, this.y, this.r*2, this.r*2);//draw an ellipse/circle
	}
	
}

class Hero {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	show() {
		image(spirte, ship.x, ship,y, 25, 25);
	}
}

function showTitleScreen() {
	textSize(32);
	fill("white");
	text("CLICK ANYWHERE TO PLAY", 150, 400);
}

function showLoseScreen() {
	stroke("white");
	textSize(64);
	text("YOU LOSE!", 170, 400);
}

function showWinScreen() {
	stroke("white");
	textSize(64);
	text("YOU WIN!", 190, 400);
}

function time() {
	if(timer > 0)
	timer--;
}

function mousePressed() {
	gameState="ingame";
}

function winOrLose(){
	if(timer == 0 && score > 0){
		gameState="win";
	}else if(score <= 0){
		gameState="lose";
	}
}







