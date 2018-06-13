// comment
var canvas = document.querySelector('canvas');

var tilemap = document.getElementById('tilemap');

var tileSize = 10;

var mapArray = [
      [11,12,12,12,12,12,12,12,12,12,12,12,12,90,80,12,12,12,12,12,12,12,12,12,12,12,12,13],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,28,24,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,22,22,22,23,10,28,24,10,21,22,22,22,23,10,21,22,22,23,10,14],
      [18,10,28,10,10,24,10,28,10,10,10,24,10,28,24,10,28,10,10,10,24,10,28,10,10,24,10,14],
      [18,10,27,26,26,25,10,27,26,26,26,25,10,27,25,10,27,26,26,26,25,10,27,26,26,25,10,14],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [17,16,16,16,16,16,16,16,16,16,16,16,16,16,16,15]
    ];

canvas.width = mapArray[0].length * tileSize;
canvas.height = mapArray.length * tileSize;

//10 = Blank space or Path
//11-18 outer walls and corners clockwise from top left wall
//21-28 inner walls and corners from left to right.
//9-10 left and right T-tops

var c = canvas.getContext('2d');

// left, up, right, down
var directions = [false, false, false, false];

//Pacman initial
pac = new Pacman(tileSize * 1.5, tileSize * 6.5, tileSize / 4, tileSize / 4, tileSize);
var dir = -10;
var pctOpen = 100;

// Pacman initial mouth
var mouthT = 0;
var mouthB = 2.0;

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
		// Mouth opening stuff
		var pad = 0;
		pctOpen += dir;

		//Wall collision stuff
		var remainderX = (this.x + this.dx + this.radius) % tileSize;
		var remainderY = (this.y + this.dy) % tileSize;
		var tempX = (this.y - (this.y % tileSize)) / tileSize;
		var tempY = (this.x + this.dx - remainderX) / tileSize;

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
			else if(mapArray[tempY][tempX] != 10)
			{
				console.log("Tile " + tempY + ', ' + tempX)
				directions = [false, false, false, false];
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

function animate() 
{
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	pac.update();
	renderMap();
}

function renderMap() {
	for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray[i].length; j++) {
    
            // Check if the value is a 1, represeting a graphic should be drawn.
			if (mapArray[i][j] === 11) {
                c.drawImage(tilemap, 0,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 12) {
            	//top wall
                c.drawImage(tilemap,16,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 13) {
            	//topright corner
                c.drawImage(tilemap,32,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 14) {
            	//right wall
                c.drawImage(tilemap,32,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 15) {
            	//bottomrightcorner
                c.drawImage(tilemap,32,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 16) {
            	//bottom wall
                c.drawImage(tilemap,16,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 17) {
            	//bottom leftcorner
                c.drawImage(tilemap,0,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 18) {
            	//left wall
                c.drawImage(tilemap,0,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            


            if (mapArray[i][j] === 21) {
            	//top left corner innerwall
                c.drawImage(tilemap,48,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 22) {
            	//innerwall top
                c.drawImage(tilemap,64,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 23) {
            	//innerwall topright corner
                c.drawImage(tilemap,144,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 24) {
            	//innerwall right wall
                c.drawImage(tilemap,144,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 25) {
            	//innerwall bottom right corner
                c.drawImage(tilemap,144,64,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 26) {
            	//innerwall bottom wall
                c.drawImage(tilemap,64,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 27) {
            	//innerwall bottom left corner
                c.drawImage(tilemap,48,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 28) {
            	//innerwall left wall
                c.drawImage(tilemap,128,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            
            
            
            if (mapArray[i][j] === 90) {
            	//left of T
                c.drawImage(tilemap,80,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 80) {
            	//Right of T
                c.drawImage(tilemap,96,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            
            


        }
    }
}

/*setInterval(function() {
    c.clearRect(0, 0, canvas.width, canvas.height);
	pac.update();
  }, 500);
*/
animate();