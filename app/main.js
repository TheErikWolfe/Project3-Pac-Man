// comment
var canvas = document.querySelector('canvas');

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

function arrowKeysLogic(){
	var i = 0;
	if (event.keyCode == 37) 
	{
		i = 0;
	}
	else if (event.keyCode == 38) 
	{
		i = 1;
	}
	else if (event.keyCode == 39) 
	{
		i = 2;
	}
	else if (event.keyCode == 40) 
	{
		i = 3;
	}
	setDirection(i);
	console.log(i);
}

function setDirection(i)
{
	directions = [false, false, false, false];
	directions[i] = [true];
}



pac = new Pacman(50,50, 3, 3, 30);

function Pacman(x, y, dx, dy, radius)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;

	this.draw = function()
	{
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = 'black';
		c.stroke();
		c.fillStyle = 'yellow';
		c.fill();
		
	}
	this.update = function()
	{
/*		if(this.x + this.radius > canvas.width || this.x - this.radius < 0)
		{
			directions = [false, false, false, false];
		}
		else if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
		{
			directions = [false, false, false, false];
		}
		else
		{
			this.move();
		}
*/
		var pad = 2.25;
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
		

		this.draw();
		//console.log("Made It: " + this.x );
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

animate();