// comment
var canvas = document.querySelector('canvas');

var tilemap = document.getElementById('tilemap');

var tileSize = 20;

var pelletsLeft = 0;

var mapArray = [
      [11,12,12,12,12,12,12,12,12,12,12,12,12,31,32,12,12,12,12,12,12,12,12,12,12,12,12,13],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,28,24,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,22,22,22,23,10,28,24,10,21,22,22,22,23,10,21,22,22,23,10,14],
      [18,10,28,99,99,24,10,28,99,99,99,24,10,28,24,10,28,99,99,99,24,10,28,99,99,24,10,14],
      [18,10,27,26,26,25,10,27,26,26,26,25,10,27,25,10,27,26,26,26,25,10,27,26,26,25,10,14],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,23,10,21,22,22,22,22,22,22,23,10,21,23,10,21,22,22,23,10,14],
      [18,10,27,26,26,25,10,28,24,10,27,26,26,33,34,26,26,25,10,28,24,10,27,26,26,25,10,14],
      [18,10,10,10,10,10,10,28,24,10,10,10,10,28,24,10,10,10,10,28,24,10,10,10,10,10,10,14],
      [17,16,16,16,16,37,10,28,35,22,22,23,10,28,24,10,21,22,22,36,24,10,39,16,16,16,16,15],
      [99,99,99,99,99,18,10,28,34,26,26,25,10,27,25,10,27,26,26,33,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,10,10,10,10,10,10,10,10,10,10,28,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,10,51,52,52,52,52,52,52,53,10,28,24,10,14,99,99,99,99,99],
      [12,12,12,12,12,38,10,27,25,10,58,99,99,99,99,99,99,54,10,27,25,10,40,12,12,12,12,12],
      [10,10,10,10,10,10,10,10,10,10,58,99,99,99,99,99,99,54,10,10,10,10,10,10,10,10,10,10],
      [16,16,16,16,16,37,10,21,23,10,58,99,99,99,99,99,99,54,10,21,23,10,39,16,16,16,16,16],
      [99,99,99,99,99,18,10,28,24,10,57,56,56,56,56,56,56,55,10,28,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,10,10,10,10,10,10,10,10,10,10,28,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,10,21,22,22,22,22,22,22,23,10,28,24,10,14,99,99,99,99,99],
      [11,12,12,12,12,38,10,27,25,10,27,26,26,33,34,26,26,25,10,27,25,10,40,12,12,12,12,13],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,28,24,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,22,22,22,23,10,28,24,10,21,22,22,22,23,10,21,22,22,23,10,14],
      [18,10,27,26,33,24,10,27,26,26,26,25,10,27,25,10,27,26,26,26,25,10,28,34,26,25,10,14],
      [18,10,10,10,28,24,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,28,24,10,10,10,14],
      [44,22,23,10,28,24,10,21,23,10,21,22,22,22,22,22,22,23,10,21,23,10,28,24,10,21,22,46],
      [43,26,25,10,27,25,10,28,24,10,27,26,26,33,34,26,26,25,10,28,24,10,27,25,10,27,26,45],
      [18,10,10,10,10,10,10,28,24,10,10,10,10,28,24,10,10,10,10,28,24,10,10,10,10,10,10,14],
      [18,10,21,22,22,22,22,36,35,22,22,23,10,28,24,10,21,22,22,36,35,22,22,22,22,23,10,14],
      [18,10,27,26,26,26,26,26,26,26,26,25,10,27,25,10,27,26,26,26,26,26,26,26,26,25,10,14],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [17,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,15]
    ];

canvas.width = mapArray[0].length * tileSize;
canvas.height = mapArray.length * tileSize;

//10 = Blank space or Path with pellets
//11-18 outer walls and corners clockwise from top left corner
//21-28 inner walls and corners clockwise from top left corner
//51-58 ghost box and corners clockwise from top left corner
//99 = blackspace

var c = canvas.getContext('2d');

// left, up, right, down
var directions = [true, false, false, false];
var queueMove = 0;

//Pacman initial
// x, y, dx, dy, radius
pac = new Pacman(13.5 * tileSize, 23.5 * tileSize, tileSize / 8, tileSize / 8, tileSize/2);
var dir = -10;
var pctOpen = 100;

// Pacman initial mouth
var mouthT = -1.0;
var mouthB = 1.0;

document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		//Initialize buttons
		window.addEventListener('keydown', arrowKeysLogic);
		//window.addEventListener('keyup', buttonReleaseLogic);
	}
}

function arrowKeysLogic(){
	var i = 0;
    // left, up, right, down
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
    queueMove = i;
	setDirection(i);
}

function setDirection(i)
{
	directions = [false, false, false, false];
	directions[i] = [true];
}

function pellets() {
    for (var i=0; i<mapArray.length; i++) {
        for (var j=0; j<mapArray[0].length; j++) {
            if (mapArray[i][j] == 10) {
                //pelletsLeft used later for win condition and 
                //scoring
                pelletsLeft++; 
                c.rect(j*tileSize+(tileSize/2.6), i*tileSize+(tileSize/2.6), tileSize/4, tileSize/4);
                c.fillStyle = 'yellow';
                c.fill();
                c.stroke();
            }
        }
    }
    // console.log('Pellets Left =', pelletsLeft);
}

function Pacman(x, y, dx, dy, radius)
{	
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
    // X, Y
    //Pac-Man's current location
    this.pacPos = [0, 0];

    this.nextPos = [0, 0];
    //Pac-Man's current location

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
        var oneMoreMove = true;
        
        // console.log(this.nextPos);

        //queue goes here I think
       /* if(this.moveCheck())
        {
            setDirection(queueMove);
        }
        else
        {
            this.move();
        }
*/
        this.move();
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
			else if(mapArray[this.nextPos[1]][this.nextPos[0]] != 10)
			{
                if(directions[0])
                {
                    directions[0] = false;
                }
                else if(directions[2])
                {
                    directions[2] = false;
                }
                this.x = this.pacPos[0] * tileSize + tileSize/2;
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
            else if(mapArray[this.nextPos[1]][this.nextPos[0]] != 10)
            {
                if(directions[1])
                {
                    directions[1] = false;
                }
                else if(directions[3])
                {
                    directions[3] = false;
                }
                this.y = this.pacPos[1] * tileSize + tileSize/2;
            }

		}

		
		
		if (pctOpen % 100 == 0) {
	      	dir = -dir;
	    }

		this.draw();

        if(queueMove == 0)
        {
            this.checkMove(mapArray[this.getPos2(this.y)][this.getPos1(this.x, -this.dx, this.radius)]);
        }
        else if(queueMove == 1)
        {
            this.checkMove(mapArray[this.getPos1(this.y, -this.dy, this.radius)][this.getPos2(this.x)]);
        }
        else if(queueMove == 2)
        {
            this.checkMove(mapArray[this.getPos2(this.y)][this.getPos1(this.x, this.dx, this.radius)]);
        }
        else if(queueMove == 3)
        {
            this.checkMove(mapArray[this.getPos1(this.y, this.dy, this.radius)][this.getPos2(this.x)]);
        }
	}

    this.checkMove = function(ar)
    {
        var check = false;
        if(ar == 10)
        {
            check = true;
        }
        return check;
    }

	this.move = function()
	{
        this.pacPos[0] = this.getPos2(this.x);
        this.pacPos[1] = this.getPos2(this.y);

		// left up right down
		if(directions[0] && mapArray[this.getPos2(this.y)][this.getPos1(this.x, -this.dx, this.radius)] == 10)
		{
            this.nextPos[0] = this.getPos1(this.x, -this.dx, this.radius);
            this.nextPos[1] = this.getPos2(this.y);

			this.x -= this.dx;
            this.y = this.nextPos[1] * tileSize + tileSize/2;
        }
		else if(directions[1] && mapArray[this.getPos1(this.y, -this.dy, this.radius)][this.getPos2(this.x)] == 10)
		{
            this.nextPos[1] = this.getPos1(this.y, -this.dy, this.radius);
            this.nextPos[0] = this.getPos2(this.x);

            // friendly code possum is friendly

			this.y -= this.dy;	
            this.x = this.nextPos[0] * tileSize + tileSize/2;

		}
		else if(directions[2] && mapArray[this.getPos2(this.y)][this.getPos1(this.x, this.dx, this.radius)] == 10)
		{
            this.nextPos[0] = this.getPos1(this.x, this.dx, this.radius);
            this.nextPos[1] = this.getPos2(this.y);

			this.x += this.dx;
            this.y = this.nextPos[1] * tileSize + tileSize/2;
        }
		else if(directions[3] && mapArray[this.getPos1(this.y, this.dy, this.radius)][this.getPos2(this.x)] == 10)
		{
            this.nextPos[1] = this.getPos1(this.y, this.dy, this.radius);
            this.nextPos[0] = this.getPos2(this.x);

            this.y += this.dy;  
            this.x = this.nextPos[0] * tileSize + tileSize/2;
        }

    this.getPos1 = function(pos, spd, rad)
    {
        return ((pos + spd - rad) - ((pos + spd - rad) % tileSize)) / tileSize;
    }
    this.getPos2 = function(pos)
    {
        return (pos - (pos % tileSize)) / tileSize;;
    }       
}

function animate() 
{
	requestAnimationFrame(animate);
    //Fixed this by changing the parameters to be pacman specific
    //No longer needs to redraw the whole map.
	c.clearRect(pac.x-(tileSize/2), pac.y-(tileSize/2), tileSize, tileSize);
	pac.update();

}


function initialRender()
{
    renderMap();
    pellets();
}


function renderMap() {
	for (var i = 0; i < mapArray.length; i++) {
        for (var j = 0; j < mapArray[i].length; j++) {
            // if (mapArray[i][j] === 10) {
            //     c.rect(j*tileSize, i*tileSize, tileSize, tileSize);
            //     c.fillStyle = 'red';
            //     c.fill();
            //     c.stroke();
            // }
            if (mapArray[i][j] === 11) {
                c.drawImage(tilemap, 0,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
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
            
            

            if (mapArray[i][j] === 31) {
            	//left of T -top
                c.drawImage(tilemap,80,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 32) {
            	//Right of T -top
                c.drawImage(tilemap,96,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 41) {
            	//Left of T -upside down
                c.drawImage(tilemap,80,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 42) {
            	//Right of T -upside down
                c.drawImage(tilemap,96,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 43) {
            	//Circle / left and right walls/ topleft
                c.drawImage(tilemap,112,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 44) {
            	//Circle / left and right walls/ bottomleft
                c.drawImage(tilemap,112,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 45) {
            	//Circle / left and right walls/ topright
                c.drawImage(tilemap,128,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 46) {
            	//Circle / left and right walls/ bottomright
                c.drawImage(tilemap,128,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
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
            	//point/rounded corner top right
                c.drawImage(tilemap,64,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 38) {
            	//point/rounded corner bottom right
                c.drawImage(tilemap,64,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
            if (mapArray[i][j] === 39) {
            	//point/rounded corner top left
                c.drawImage(tilemap,48,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }
             if (mapArray[i][j] === 40) {
            	//point/rounded corner bottom left
                c.drawImage(tilemap,48,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
            }





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


initialRender();
animate();
