// comment
var canvas = document.querySelector('canvas');

// temporary canvas size 
canvas.width = 300;
canvas.height = 300;

var c = canvas.getContext('2d');

// left, up, right, down
var directions = [false, false, false, false];

document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		//Initialize buttons
		window.addEventListener('keydown', arrowKeysLogic);
		//window.addEventListener('keyup', buttonReleaseLogic);
	}
}
var mouthT = 0;
var mouthB = 2.0;
function arrowKeysLogic(){
	var i = 0;
	if (event.keyCode == 37) 
	{
		i = 0;
		mouthT = -1.0;
		mouthB = 1.0;
	}
	else if (event.keyCode == 38) 
	{
		i = 1;
		mouthT = -0.5;
		mouthB = 1.5;
	}
	else if (event.keyCode == 39) 
	{
		i = 2;
		mouthT = 0;
		mouthB = 2.0;
	}
	else if (event.keyCode == 40) 
	{
		i = 3;
		mouthT = .5;
		mouthB = 2.5;
	}
	setDirection(i);
}

function setDirection(i)
{
	directions = [false, false, false, false];
	directions[i] = [true];
}



pac = new Pacman(50,50, 3, 3, 30);
var dir = -10;
var pctOpen = 100;


function Pacman(x, y, dx, dy, radius)
{	
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;

	this.draw = function()
	{
		var fltOpen = pctOpen / 100;

		c.beginPath();

		// Pacman Body and mouth
		c.arc(this.x, this.y, this.radius, (mouthT + fltOpen * 0.2) * Math.PI, (mouthB - fltOpen * 0.2) * Math.PI);
		c.lineTo(this.x, this.y);
    	c.closePath();

    	// Pacman 
		c.strokeStyle = 'black';
		c.stroke();
		c.fillStyle = 'yellow';
		c.fill();

		
	}
	this.update = function()
	{
		var pad = 0;
		pctOpen += dir;
		if(directions[0] || directions[2])
		{
			if(this.x + this.radius + pad > canvas.width)
			{
				directions[2] = false;
			}
			else if(this.x - this.radius - pad < 0)
			{
				directions[0] = false;
			}
		}
		else if( directions[1] || directions[3])
		{
			if(this.y + this.radius + pad > canvas.height)
			{
				directions[3] = false;
			}
			else if(this.y - this.radius - pad < 0)
			{
				directions[1] = false;
			}
		}
		this.move();
		
		if (pctOpen % 100 == 0) {
	      	dir = -dir;
	    }

		

		this.draw();
	}

	this.move = function()
	{
		// left up right down
		if(directions[0])
		{
			this.x -= this.dx;
		}
		else if(directions[1])
		{
			this.y -= this.dy;		
		}
		else if(directions[2])
		{
			this.x += this.dx;
		}
		else if(directions[3])
		{
			this.y += this.dy;
		}
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	pac.update();



}

/*setInterval(function() {
    c.clearRect(0, 0, canvas.width, canvas.height);
	pac.update();
  }, 500);
*/
animate();