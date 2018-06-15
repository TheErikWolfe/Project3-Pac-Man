// comment
var canvas = document.querySelector('canvas');

var tilemap = document.getElementById('tilemap');

var tileSize = 20;

var pelletsLeft = 0;

var map = {

    cols: 28,
    rows: 31,
    array: [
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
    ],

    getTileId: function (col, row) {
        //return an array [TileID, col, row]
        return (this.array[row][col]);
    },

    getTileAtXY: function(x, y) {
        var col = Math.floor(x/tileSize);
        var row = Math.floor(y/tileSize);
        var tile = this.getTileId(col, row);
        return ([tile, row, col]);
    },

    isSolidTileAtXY: function (x, y) {
        var col = Math.floor(x/tileSize);
        var row = Math.floor(y/tileSize);
        var tile = this.getTileId(col, row);
        var isSolid = tile != 10 && tile != 99;
        return isSolid;
    },

    isPelletAtXY: function (x, y) {
        var col = Math.floor(x/tileSize);
        var row = Math.floor(y/tileSize);
        var tile = this.getTileId(col, row);
        var isPellet = tile == 10;
        return isPellet;
    }
}

canvas.width = map.array[0].length * tileSize;
canvas.height = map.array.length * tileSize;

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
		/*mTop = -1.0;
		mBot = 1.0;*/
	}
	else if (event.keyCode == 38) 
	{
		i = 1;
		/*mTop = -0.5;
		mBot = 1.5;*/
	}
	else if (event.keyCode == 39) 
	{
		i = 2;
		/*mTop = 0;
		mBot = 2.0;*/
	}
	else if (event.keyCode == 40) 
	{
		i = 3;
		/*mTop = -1.5;
		mBot = 0.5;*/
	}
    queueMove = i;
}

function setDirection(i, mTop, mBot)
{
	directions = [false, false, false, false];
	directions[i] = [true];
    mouthT = mTop;
    mouthB = mBot;
}

function pelletsInit() {
    for (var i=0; i<map.array.length; i++) {
        for (var j=0; j<map.array[0].length; j++) {
            if (map.array[i][j] == 10) {
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
}

/*function scoreUpdate() {
    var pacLocation = [pac.x, pac.y];
    // console.log(map.isPelletAtXY(pac.x, pac.y));
    if (map.isPelletAtXY(pac.x, pac.y)) {
        var tileInfo = map.getTileAtXY(pac.x, pac.y);
        var row = tileInfo[1];
        var col = tileInfo[2];
        map.array[col][row] = 99;
    }
}*/

function Pacman(x, y, dx, dy, radius)
{	
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
    // X, Y
    //Pac-Man's current location
    this.getNextPos = function(pos, spd, rad)
    {
        return ((pos + spd + rad) - ((pos + spd + rad) % tileSize)) / tileSize;
    }
    this.getThisPos = function(pos)
    {
        return (pos - (pos % tileSize)) / tileSize;
    }       

    this.pacPos = [this.getThisPos(this.x), this.getThisPos(this.y)];
    this.nextPos = [this.getNextPos(this.x, -this.dx, this.radius), this.getThisPos(this.y)];

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
		c.fillStyle = '#fdff00';
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
			else if(map.array[this.nextPos[1]][this.nextPos[0]] != 10)
			{
                if(directions[0])
                {
                    directions[0] = false;
                }
                else if(directions[2])
                {
                    directions[2] = false;
                }
                this.x = this.pacPos[0] * tileSize + this.radius;
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
            else if(map.array[this.nextPos[1]][this.nextPos[0]] != 10 )
            {
                if(directions[1])
                {
                    console.log(this.pacPos + ', ' + this.nextPos);
                    console.log(map.array[this.nextPos[1]][this.nextPos[0]]);
                    directions[1] = false;
                    console.log(directions);
                }
                else if(directions[3])
                {
                    directions[3] = false;
                }
                this.y = this.pacPos[1] * tileSize + this.radius;
            }

		}

		
		this.move();
		if (pctOpen % 100 == 0) {
	      	dir = -dir;
	    }

		this.draw();

        if(queueMove == 0 && this.checkMove(map.array[this.getThisPos(this.y)][this.getNextPos(this.x, 0-this.dx, 0 - this.radius)]))
        {
            setDirection(0, -1.0, 1.0);
        }
        else if(queueMove == 1 && this.checkMove(map.array[this.getNextPos(this.y, 0-this.dy, 0 - this.radius)][this.getThisPos(this.x)]))
        {
            setDirection(1, -0.5, 1.5);
        }
        else if(queueMove == 2 && this.checkMove(map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)]))
        {
            setDirection(2, 0, 2.0);
        }
        else if(queueMove == 3 && this.checkMove(map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)]))
        {
            setDirection(3, -1.5, 0.5);
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
        this.pacPos[0] = this.getThisPos(this.x);
        this.pacPos[1] = this.getThisPos(this.y);

		// left up right down
		if(directions[0] && map.array[this.getThisPos(this.y)][this.getNextPos(this.x, -this.dx, -this.radius)] == 10)
		{
            this.nextPos[0] = this.getNextPos(this.x, -this.dx, -this.radius);
            this.nextPos[1] = this.getThisPos(this.y);

			this.x -= this.dx;
            this.y = this.nextPos[1] * tileSize + this.radius;
        }
		else if(directions[1] && map.array[this.getNextPos(this.y, -this.dy, -this.radius)][this.getThisPos(this.x)] == 10)
		{
            this.nextPos[1] = this.getNextPos(this.y, -this.dy, -this.radius);
            this.nextPos[0] = this.getThisPos(this.x);
            console.log('nextPos ' + this.nextPos);

            // friendly code possum is friendly
            //               :     :
            //         __    |     |    _,_
            //        (  ~~^-l_____],.-~  /
            //         \    ")\ "^k. (_,-"
            //          `>._  ' _ `\  \
            //       _.-~/'^k. (0)  ` (0
            //    .-~   {    ~` ~    ..T
            //   /   .   "-..       _.-'
            //  /    Y        .   "T
            // Y     l         ~-./l_
            // |      \          . .<'
            // |       `-.._  __,/"r'
            // l   .-~~"-.    /    I
            //  Y         Y "~[    |
            //   \         \_.^--, [
            //    \            _~> |
            //     \      ___)--~  |
            //      ^.       :     l
            //        ^.   _.j     |
            //          Y    I     |
            //          l    l     I
            //           Y    \    |    
            //            \    ^.  |
            //             \     ~-^.
            //              ^.       ~"--.,_
            //               |~-._          ~-.
            //               |    ~Y--.,_      ^.
            //               :     :     "x      \
            //                             \      \.
            //                              \      ]
            //                               ^._  .^
            //                                  ~~

			this.y -= this.dy;	
            this.x = this.nextPos[0] * tileSize + this.radius;
            console.log('y, x, ' + this.y + ', ' + this.x);

		}
		else if(directions[2] && map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)] == 10)
		{
            this.nextPos[0] = this.getNextPos(this.x, this.dx, this.radius);
            this.nextPos[1] = this.getThisPos(this.y);

			this.x += this.dx;
            this.y = this.nextPos[1] * tileSize + this.radius;
        }
		else if(directions[3] && map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)] == 10)
		{
            this.nextPos[1] = this.getNextPos(this.y, this.dy, this.radius);
            this.nextPos[0] = this.getThisPos(this.x);

            this.y += this.dy;
            this.x = this.nextPos[0] * tileSize + this.radius;
        }
    }
    this.getLocation = function() {
        return [this.x, this.y];
    }
}

function animate() 
{
	requestAnimationFrame(animate);
    //Fixed this by changing the parameters to be pacman specific
    //No longer needs to redraw the whole map.
	//c.clearRect(pac.x - (tileSize * 3 / 2), pac.y - (tileSize * 3 / 2), tileSize * 3, tileSize * 3);

    // Trying to make the 9 squares around Pacman (but still in the grid) dissapear instead of the ones not part of the grid.
    c.clearRect((pac.pacPos[0] - 1) * tileSize, (pac.pacPos[1] - 1) * tileSize, 3 * tileSize, 3 * tileSize);

    for(var i = -1; i < 2; i++)
    {
        for(var j = -1; j < 2; j++)
        {
            renderMap(pac.pacPos[1] + i, pac.pacPos[0] + j);
        }
    }

	pac.update();
    //scoreUpdate();

}

/*getTileAtXY: function(x, y) {
        var col = Math.floor(x/tileSize);
        var row = Math.floor(y/tileSize);
        var tile = this.getTileId(col, row);
        return ([tile, row, col]);
    },*/


function initialRender()
{
    for (var i = 0; i < map.array.length; i++) 
    {
        for (var j = 0; j < map.array[i].length; j++) 
        {
            renderMap(i, j);
        }
    }
    pelletsInit();
}

function renderMap(i, j) 
{
    /*if (map.array[i][j] === 10) {
        c.rect(j*tileSize, i*tileSize, tileSize, tileSize);
        c.fillStyle = 'red';
        c.fill();
        c.stroke();
    }*/
    // Check if the value is a 1, represeting a graphic should be drawn.
    if (map.array[i][j] === 11) {
        c.drawImage(tilemap, 0,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
        //var tile = tilemap.getTile(column,row);
    }
    else if (map.array[i][j] === 12) {
        //top wall
        c.drawImage(tilemap,16,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 13) {
        //topright corner
        c.drawImage(tilemap,32,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 14) {
        //right wall
        c.drawImage(tilemap,32,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 15) {
        //bottomrightcorner
        c.drawImage(tilemap,32,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 16) {
        //bottom wall
        c.drawImage(tilemap,16,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 17) {
        //bottom leftcorner
        c.drawImage(tilemap,0,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 18) {
        //left wall
        c.drawImage(tilemap,0,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    


    else if (map.array[i][j] === 21) {
        //top left corner innerwall
        c.drawImage(tilemap,48,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 22) {
        //innerwall top
        c.drawImage(tilemap,64,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 23) {
        //innerwall topright corner
        c.drawImage(tilemap,144,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 24) {
        //innerwall right wall
        c.drawImage(tilemap,144,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 25) {
        //innerwall bottom right corner
        c.drawImage(tilemap,144,64,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 26) {
        //innerwall bottom wall
        c.drawImage(tilemap,64,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 27) {
        //innerwall bottom left corner
        c.drawImage(tilemap,48,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 28) {
        //innerwall left wall
        c.drawImage(tilemap,128,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    
    

    else if (map.array[i][j] === 31) {
        //left of T -top
        c.drawImage(tilemap,80,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 32) {
        //Right of T -top
        c.drawImage(tilemap,96,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 41) {
        //Left of T -upside down
        c.drawImage(tilemap,80,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 42) {
        //Right of T -upside down
        c.drawImage(tilemap,96,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 43) {
        //Circle / left and right walls/ topleft
        c.drawImage(tilemap,112,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 44) {
        //Circle / left and right walls/ bottomleft
        c.drawImage(tilemap,112,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 45) {
        //Circle / left and right walls/ topright
        c.drawImage(tilemap,128,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 46) {
        //Circle / left and right walls/ bottomright
        c.drawImage(tilemap,128,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }




    else if (map.array[i][j] === 33) {
        //Circle topleft
        c.drawImage(tilemap,112,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 34) {
        //Circle topright
        c.drawImage(tilemap,96,32,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 35) {
        //Circle bottomleft
        c.drawImage(tilemap,96,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 36) {
        //Circle bottomright
        c.drawImage(tilemap,112,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }


    else if (map.array[i][j] === 37) {
        //point/rounded corner top right
        c.drawImage(tilemap,64,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 38) {
        //point/rounded corner bottom right
        c.drawImage(tilemap,64,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 39) {
        //point/rounded corner top left
        c.drawImage(tilemap,48,0,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 40) {
        //point/rounded corner bottom left
        c.drawImage(tilemap,48,16,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }





    else if (map.array[i][j] === 51) {
        //weird inner corner? up to right
        c.drawImage(tilemap,0,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 52) {
        //weird inner corner? up to right
        c.drawImage(tilemap,16,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 53) {
        //weird inner corner? up to right
        c.drawImage(tilemap,32,48,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 54) {
        //weird inner corner? up to right
        c.drawImage(tilemap,32,64,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 55) {
        //weird inner corner? up to right
        c.drawImage(tilemap,32,80,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 56) {
        //weird inner corner? up to right
        c.drawImage(tilemap,16,80,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 57) {
        //weird inner corner? up to right
        c.drawImage(tilemap,0,80,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
    else if (map.array[i][j] === 58) {
        //weird inner corner? up to right
        c.drawImage(tilemap,0,64,16,16, j*tileSize, i*tileSize, tileSize, tileSize);
    }
}



initialRender();
animate();
