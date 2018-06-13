// comment
var canvas = document.querySelector('canvas');


var tilemap = document.getElementById('tilemap');
var tileSize = 16;

var mapArray = [
      [11,12,12,12,12,12,12,12,12,12,12,12,12,31,32,12,12,12,12,12,12,12,12,12,12,12,12,13],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,28,24,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,22,22,22,23,10,28,24,10,21,22,22,22,23,10,21,22,22,23,10,14],
      [18,10,28,10,10,24,10,28,10,10,10,24,10,28,24,10,28,10,10,10,24,10,28,10,10,24,10,14],
      [18,10,27,26,26,25,10,27,26,26,26,25,10,27,25,10,27,26,26,26,25,10,27,26,26,25,10,14],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,23,10,21,22,22,22,22,22,22,23,10,21,23],
      [18,10,27,26,26,25,10,28,24,10,27,26,26,33,34,26,26,25,10,28,24],
      [18,10,10,10,10,10,10,28,24,10,10,10,10,28,24,10,10,10,10,28,24],
      [17,16,16,16,16,37,10,28,35,22,22,23,10,28,24,10,21,22,22,36,24],
      [10,10,10,10,10,18,10,28,34,26,26,25,10,27,25,10,27,26,26,33,24],
      [10,10,10,10,10,18,10,28,24,10,10,10,10,10,10,10,10,10,10,28,24],
      [10,10,10,10,10,18,10,28,24,10,51,52,52,52,52,52,52,53,10,28,24],
      [12,12,12,12,12,38,10,27,25,10,58,10,10,10,10,10,10,54,10,27,25],
      [10,10,10,10,10,10,10,10,10,10,58,10,10,10,10,10,10,54,10],
      [16,16,16,16,16,37,10,21,23,10,58,10,10,10,10,10,10,54,10],
      [10,10,10,10,10,18,10,28,24,10,57,56,56,56,56,56,56,55,10],
      [10,10,10,10,10,18,10,28,24,10,10,10,10,10,10,10,10,10,10,10],
      [10,10,10,10,10,18,10,28,24,10],
      [11,12,12,12,12,38,10,27,25,10],
      [18,10,10,10,10,10,10,10,10,10],
      [18,10],
      [18,10]
    ];
//10 = Blank space or Path
//11-18 outer walls and corners clockwise from top left corner
//21-28 inner walls and corners clockwise from top left corner
//51-58 ghost box and corners clockwise from top left corner


canvas.width = 500;
canvas.height = 700;

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
	renderMap();



}

function renderMap() {
	for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray[i].length; j++) {
    
            // Check if the value is a 1, represeting a graphic should be drawn.
			if (mapArray[i][j] === 11) {
                // Draw a rectangle at i & j position * 20 pixels so that
                // our 20x20 pixel squares are correctly positioned.
//                c.fillStyle = '#38008C';
//                c.fillRect(j * 20, i * 20, 20, 20);
				//image, dx, dy
                //c.drawImage(tile1, j * 16, i * 16);

                c.drawImage(tilemap, 0,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    //			var tile = new createjs.Bitmap('media/tiles/tile1.png');
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
            
            
            




            if (mapArray[i][j] === 31) {
            	//left of T
                c.drawImage(tilemap,80,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 32) {
            	//Right of T
                c.drawImage(tilemap,96,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }


            if (mapArray[i][j] === 33) {
            	//Circle topleft
                c.drawImage(tilemap,112,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 34) {
            	//Circle topright
                c.drawImage(tilemap,96,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 35) {
            	//Circle bottomleft
                c.drawImage(tilemap,96,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 36) {
            	//Circle bottomright
                c.drawImage(tilemap,112,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }


            if (mapArray[i][j] === 37) {
            	//weird inner corner? left to down
                c.drawImage(tilemap,64,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 38) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,64,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            // if (mapArray[i][j] === 37) {
            // 	//weird inner corner? 
            //     c.drawImage(tilemap,64,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            // }
            // if (mapArray[i][j] === 38) {
            // 	//weird inner corner? up to right
            //     c.drawImage(tilemap,64,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            // }





            if (mapArray[i][j] === 51) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,0,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 52) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,16,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 53) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,32,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 54) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,32,64,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 55) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,32,80,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 56) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,16,80,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 57) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,0,80,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 58) {
            	//weird inner corner? up to right
                c.drawImage(tilemap,0,64,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
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