// comment

var scoreText = document.getElementById('score-text');

var canvas = document.querySelector('canvas');

var tilemap = document.getElementById('tilemap');

var startScreen = document.getElementById('start-screen');

var tileSize = 20;

var currentScore = 0;

var initialMap = [
      [11,12,12,12,12,12,12,12,12,12,12,12,12,31,32,12,12,12,12,12,12,12,12,12,12,12,12,13],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,28,24,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,22,22,22,23,10,28,24,10,21,22,22,22,23,10,21,22,22,23,10,14],
      [18,10,28,99,99,24,10,28,99,99,99,24,10,28,24,10,28,99,99,99,24,10,28,99,99,24,10,14],
      [18,10,27,26,26,25,10,27,26,26,26,25,10,27,25,10,27,26,26,26,25,10,27,26,26,25,10,14],
      [18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,14],
      [18,10,21,22,22,23,10,21,23,10,21,22,22,22,22,22,22,23,10,21,23,10,21,22,22,23,10,14],
      [18,10,27,26,26,25,10,28,24,10,27,26,26,33,34,26,26,25,10,28,24,10,27,26,26,25,10,14],
      [18,10,10,10,10,10,10,28,24,10,10,10,10,28,24,10,10,10,10,28,24,10,10,10,10,10,10,14],
      [17,16,16,16,16,37,10,28,35,22,22,23,99,28,24,99,21,22,22,36,24,10,39,16,16,16,16,15],
      [99,99,99,99,99,18,10,28,34,26,26,25,99,27,25,99,27,26,26,33,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,99,99,99,99,99,99,99,99,99,99,28,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,99,51,52,52,52,52,52,52,53,99,28,24,10,14,99,99,99,99,99],
      [12,12,12,12,12,38,10,27,25,99,58,99,99,99,99,99,99,54,99,27,25,10,40,12,12,12,12,12],
      [10,10,10,10,10,10,10,99,99,99,58,99,99,99,99,99,99,54,99,99,99,10,10,10,10,10,10,10,99],
      [16,16,16,16,16,37,10,21,23,99,58,99,99,99,99,99,99,54,99,21,23,10,39,16,16,16,16,16],
      [99,99,99,99,99,18,10,28,24,99,57,56,56,56,56,56,56,55,99,28,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,99,99,99,99,99,99,99,99,99,99,28,24,10,14,99,99,99,99,99],
      [99,99,99,99,99,18,10,28,24,99,21,22,22,22,22,22,22,23,99,28,24,10,14,99,99,99,99,99],
      [11,12,12,12,12,38,10,27,25,99,27,26,26,33,34,26,26,25,99,27,25,10,40,12,12,12,12,13],
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

var map = {

    cols: 28,
    rows: 31,
    array: JSON.parse(JSON.stringify(initialMap)),

    getTileId: function (row, col) {
        //return an array [TileID, col, row]
        return (this.array[row][col]);
    },

    getTileAtXY: function(x, y) {
        var col = Math.floor(x/tileSize);
        var row = Math.floor(y/tileSize);
        var tile = this.array[row][col];
        return ([tile, row, col]);
    },

    isSolidTileAtXY: function (x, y) {
        var col = Math.floor(x/tileSize);
        var row = Math.floor(y/tileSize);
        var tile = this.array[row][col];
        var isSolid = tile != 10 && tile != 99;
        return isSolid;
    },

    isPelletAtXY: function (x, y) {
        var col = Math.floor(x/tileSize);
        var row = Math.floor(y/tileSize);
        var tile = this.array[row][col];
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

var dir = -10;
var pctOpen = 100;

// Pacman initial mouth
var mouthT = -1.0;
var mouthB = 1.0;

document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		//Initialize buttons
		window.addEventListener('keydown', arrowKeysLogic);
	}
    if (document.readyState == "complete") {
        document.getElementById("slider").classList.remove('bottom');
    }
}

function arrowKeysLogic(){
	var i = 0;
    // left, up, right, down
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
    queueMove = i;
}

//setDirection Pac Man is going. Also sets Pacman's mouth position.
function setDirection(i, mTop, mBot)
{
	directions = [false, false, false, false];
	directions[i] = [true];
    mouthT = mTop;
    mouthB = mBot;
}

function scoreUpdate() {
    var pacLocation = [pac.x, pac.y];
    if (map.isPelletAtXY(pac.x, pac.y)) {
        var tileInfo = map.getTileAtXY(pac.x, pac.y);
        var row = tileInfo[1];
        var col = tileInfo[2];
        map.array[row][col] = 99;
        currentScore += 50;
        scoreText.innerHTML = "Score: " + currentScore;
    }
}

function checkGhostCollision() {
    var pacTile = map.getTileAtXY(pac.x, pac.y);
    var blinkyTile = map.getTileAtXY(blinky.x, blinky.y);

    if (pacTile[1] == blinkyTile[1] && pacTile[2]==blinkyTile[2]) {
        console.log("YOU DEAD!");
        /*deathAnimate();
        resetGame();*/
    }

}

function handlePipe() {
    if (pac.getLocation()[0] == -7.5) {
        pac.x = 567.5;
    }
    else if (pac.getLocation()[0] == 567.5) {
        pac.x = -7.5;
    }
}

function checkForWin() {
    if (currentScore % 12900 == 0) {
        resetGame();
    }
}

function resetGame() {

    map.array = JSON.parse(JSON.stringify(initialMap));
    c.clearRect(0,0,canvas.width,canvas.height);
    initialRender();

}

//put logic to check for each frame here
//seperates logic from animation.
function gameLogicUpdate() {
    scoreUpdate();
    handlePipe();
    checkForWin();
}

//ghost animation and logic goes in here
// this.draw should draw the ghost, is called from update
// this.update will update the ghost position relative to pac-mans position.
function Ghost(x, y, dx, dy)
{
    this.getThisPos = function(pos)
    {
        return (pos - (pos % tileSize)) / tileSize;
    }  

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ghostPos = [this.getThisPos(this.x), this.getThisPos(this.y)];
    //this.ghostDirection = ['left', 'up', 'right', 'down'];
    
    // draw ghost
    this.draw = function()
    {
        this.makeBody();
        this.makeEyes();
        this.makePupils();
    }

    // makes ghost body
    this.makeBody = function()
    {
        // context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
        // moveTo(x, y) and lineTo(x, y)
        //c.rect(this.x, this.y, tileSize, tileSize)
        //c.moveTo(20,100)
        c.beginPath();
        c.moveTo(this.x, this.y + tileSize / 2);
        // console.log(this.x + ', ' + this.y);
        //c.bezierCurveTo(20, 20, 200, 20, 200, 100)
        c.bezierCurveTo(this.x, this.y, this.x + tileSize, this.y, this.x + tileSize, this.y + tileSize / 2);
        c.rect(this.x, this.y + tileSize / 2, tileSize, tileSize / 3);
        //Ghostly Spikes
        c.moveTo(this.x, this.y + tileSize * 5 / 6);
        c.lineTo(this.x, this.y + tileSize);
        c.lineTo(this.x + tileSize * 1 / 4, this.y + tileSize * 5 / 6);
        //c.closePath();
        c.moveTo(this.x + tileSize / 4, this.y + tileSize * 5 / 6);
        c.lineTo(this.x + tileSize / 2, this.y + tileSize);
        c.lineTo(this.x + tileSize * 3 / 4, this.y + tileSize * 5 / 6);
        //c.closePath();
        c.moveTo(this.x + tileSize * 3 / 4, this.y + tileSize * 5 / 6);
        c.lineTo(this.x + tileSize, this.y + tileSize);
        c.lineTo(this.x + tileSize, this.y + tileSize * 5 / 6);
        c.closePath();

        c.strokeStyle = 'red';
        c.stroke();
        c.fillStyle = 'red';
        c.fill();
    }

    // Makes ghost eyes minus the pupils
    this.makeEyes = function()
    {
        //context.arc(x,y,r,sAngle,eAngle,counterclockwise); 
        // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        c.beginPath();
        c.ellipse(this.x + tileSize * 5 / 16, this.y + tileSize / 2, tileSize / 6, tileSize / 5, 0, 2*Math.PI, false)
        /*c.strokeStyle = 'black';
        c.stroke();*/
        c.fillStyle = 'white';
        c.fill();

        c.beginPath();
        c.ellipse(this.x + tileSize * 11 / 16, this.y + tileSize / 2, tileSize / 6, tileSize / 5, 0, 2*Math.PI, false)
        /*c.strokeStyle = 'black';
        c.stroke();*/
        c.fillStyle = 'white';
        c.fill();
    }

    // Makes ghost pupils
    this.makePupils = function()
    {
        //Making dem pupils
        c.beginPath();
        c.arc(this.x + tileSize * 6 / 16, this.y + tileSize / 2, tileSize/12, 0, 2 * Math.PI);
        /*c.strokeStyle = 'white';
        c.stroke();*/
        c.fillStyle = 'black';
        c.fill();

        c.beginPath();
        c.arc(this.x + tileSize * 12 / 16, this.y + tileSize / 2, tileSize/12, 0, 2 * Math.PI);
        /*c.strokeStyle = 'white';
        c.stroke();*/
        c.fillStyle = 'black';
        c.fill();
    }

    this.makeNode = function (xPos, yPos, nodeCameFrom)
    {
    //     // For each node, the cost of getting from the start node to that node.
    //     gScore := map with default value of Infinity
        this.xPos = xPos;
        this.yPos = yPos;
        this.gScore = Infinity;
        this.nodeCameFrom = nodeCameFrom;
//            this.hScore = hScore;

        //     fScore := map with default value of Infinity

//     // For the first node, that value is completely heuristic.
//     fScore[start] := heuristic_cost_estimate(start, goal)

        this.fScore = Infinity;
//     // The cost of going from start to start is zero.
//     gScore[start] := 0


    }

    // calculate distance from the destination to the current query
    this.distance = function(destX, destY, curX, curY)
    {
        return Math.sqrt(Math.pow((destX - curX), 2) + Math.pow((destY - curY), 2));
    }

    // function reconstructPath(cameFrom, current)
    this.reconstructPath = function(goToX, goToY, current)
    {

// //     totalPath := {current}
        var totalPath = [current];
// //     while current in cameFrom.Keys:

        //var i = cameFrom.length - 1;
        //console.log("Pacman: " + pac.pacPos);
        //console.log("Blinky: " + this.ghostPos)
        while(current.xPos != this.ghostPos[0] || current.yPos != this.ghostPos[1])
        {
            totalPath.push(current.nodeCameFrom);
            //console.log(totalPath);
            current = current.nodeCameFrom;
            console.log(current);
        }
        //console.log(totalPath);
            /*//console.log(cameFrom[i]+ ', ' + current);
            if(cameFrom[i].nodeCameFrom.xPos == current.xPos && cameFrom[i].nodeCameFrom.yPos == current.yPos)
            {
                totalPath.splice(0, 0, cameFrom[i]);
                //console.log("path is longer.");
                current = cameFrom[i].nodeCameFrom;
                cameFrom.slice(i, 1);
                i = cameFrom.length - 1;
            }
            i--;
        }*/  
// //         current := cameFrom[current]
// //         totalPath.append(current)
//             totalPath.push(current);
//         }
        return totalPath
    }

    this.aStar = function(goToX, goToY)
    {
        //         function A*(start, goal)
//     // The set of nodes already evaluated
//     closedSet := {}
        var closedSet = [];

        //     // The set of currently discovered nodes that are not evaluated yet.
        //     // Initially, only the start node is known.
        //     openSet := {start}
        var openSet = [];
        let firstNode = new this.makeNode(this.ghostPos[0], this.ghostPos[1], null);
        firstNode.gScore = 0;
        openSet.push(firstNode);

//     // For each node, which node it can most efficiently be reached from.
//     // If a node can be reached from many nodes, cameFrom will eventually contain the
//     // most efficient previous step.
//     cameFrom := an empty map
        var cameFrom = [];

//     // For each node, the total cost of getting from the start node to the goal
//     // by passing by that node. That value is partly known, partly heuristic.



//     while openSet is not empty
        var lowest = firstNode.fScore;
        var saveNum = 0;
        var current;
        var neighbors = [];

        while(openSet.length != 0)
        {
//         current := the node in openSet having the lowest fScore[] value
            var lowest = firstNode.fScore;
            var saveNum = 0;
            for(var i = 0; i < openSet.length; i++)
            {
                if(openSet[i].fScore < lowest)
                {
                    lowest = openSet[i].fScore;
                    saveNum = i;
                }
            }

            current = openSet[saveNum];
//         if current = goal
            if(openSet[saveNum].xPos == goToX && openSet[saveNum].yPos == goToY)
            {
//             return reconstructPath(cameFrom, current)
                return this.reconstructPath(goToX, goToY, current);
                //return cameFrom;
            }

            neighbors = [];
            for(var i = -1; i < 2; i += 2)
            {
                if(map.getTileId(openSet[saveNum].yPos + i, openSet[saveNum].xPos) == 99 
                    || map.getTileId(openSet[saveNum].yPos + i, openSet[saveNum].xPos) == 10)
                {
                    neighbors.push([openSet[saveNum].xPos, openSet[saveNum].yPos + i]);
                }
                if(map.getTileId(openSet[saveNum].yPos, openSet[saveNum].xPos + i) == 99 
                    || map.getTileId(openSet[saveNum].yPos, openSet[saveNum].xPos + i) == 10)
                {
                    neighbors.push([openSet[saveNum].xPos + i, openSet[saveNum].yPos]);
                }
            }

            // if neighbor in closedSet
//                 continue, take neighbor out        // Ignore the neighbor which is already evaluated.
            for(var i = 0; i < closedSet.length; i++)
            {
                for(var j = 0; j < neighbors.length; j++)
                {
                    if(neighbors[j][0] == closedSet[i].xPos && neighbors[j][1] == closedSet[i].yPos)
                    {
                        neighbors.splice(j, 1);
                    }
                }
            }
//         openSet.Remove(current)
            closedSet.push(openSet[saveNum]);
            openSet.splice(saveNum, 1);
//         closedSet.Add(current)
//         for each neighbor of current

            for(var i = 0; i < neighbors.length; i++)
            {
//             

//             if neighbor not in openSet  // Discover a new node
//                 openSet.Add(neighbor)
                openSet.push(new this.makeNode(neighbors[i][0], neighbors[i][1], current));
            
//             // The distance from start to a neighbor
//             //the "dist_between" function may vary as per the solution requirements.
//             tentative_gScore := gScore[current] + dist_between(current, neighbor)
                var tentative_gScore = current.gScore + this.distance(current.xPos, current.yPos, neighbors[i][0], neighbors[i][1]);
                //console.log(tentative_gScore + ', ' + openSet[openSet.length - 1].gScore)
//             if tentative_gScore >= gScore[neighbor]
                if(tentative_gScore < openSet[openSet.length - 1].gScore)
                {
//                 // This path is the best until now. Record it!
//             cameFrom[neighbor] := current
//             gScore[neighbor] := tentative_gScore

//             fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal) 
                    cameFrom.push(current);
                    openSet[openSet.length - 1].gScore = tentative_gScore;
                    openSet[openSet.length - 1].fScore = tentative_gScore + this.distance(neighbors[i][0], neighbors[i][1], goToX, goToY);

                }
//             
            }
            //console.log(cameFrom);
//     return failure



        }
    }

    this.path = [];
    this.update = function(ct)
    {
        
        // Going to attempt A* Pathing Algorithm now!
        /*if(ct == Math.round(tileSize/2))
        {
            this.path = this.aStar(pac.pacPos[0], pac.pacPos[1]);
            //console.log("updating path");
            //console.log(this.path);
        }
        else
        {
            this.x = this.path[this.path.length - 1].xPos * tileSize;
            this.y = this.path[this.path.length - 1].yPos * tileSize;
            this.path.pop();
            
        }*/
        if(ct == Math.round(tileSize/2))
        {
            this.path = this.aStar(pac.pacPos[0], pac.pacPos[1]);
            //console.log("updating path");
            this.path.pop();
            //console.log(this.path);
        }
        else if(ct != Math.round(tileSize/2) && this.path[this.path.length - 1].xPos != undefined && this.path[this.path.length - 1].yPos != undefined)
        {
            //console.log("this.path: " + this.path[this.path.length - 1].xPos + ', ' + this.path[this.path.length - 1].yPos);
            //console.log(this.path[this.path.length - 1]);
            if(this.path[this.path.length - 1].xPos * tileSize > this.x)
            {
                this.x++;
            }
            else if(this.path[this.path.length - 1].xPos * tileSize < this.x)
            {
                this.x--;
            }
            else if(this.path[this.path.length - 1].yPos * tileSize > this.y)
            {
                this.y++;
            }
            else if(this.path[this.path.length - 1].yPos * tileSize < this.y)
            {
                this.y--;
            }
            if(this.path[this.path.length - 1].yPos * tileSize == this.y && this.path[this.path.length - 1].xPos * tileSize == this.x)
            {
                this.path.pop();
                //console.log("made it pop: " + this.path);
            }
        }


        //This is the movement where the ghost can break through walls and is just trying to get to Pac-Man
        /*if((pac.x - tileSize / 2 + 1) - this.x > 0)
        {
            this.x++;
        }
        else
        {
            this.x--;
        }
        if((pac.y - tileSize / 2 + 1) - this.y > 0)
        {
            this.y++;
        }
        else
        {
            this.y--;
        }
        this.draw();
        this.ghostPos = [this.getThisPos(this.x), this.getThisPos(this.y)]; */

        

        /*var pacDirection = [(pac.x - tileSize / 2) - this.x, (pac.y - tileSize / 2) - this.y];
        if(this.y % tileSize == 0)
        {
            if(this.x % tileSize == 0)
            {
                if(pacDirection[0] > 0)
                {
                    if (map.getTileId(this.ghostPos[1], this.ghostPos[0] + 1) == 10 
                        || map.getTileId(this.ghostPos[1], this.ghostPos[0] + 1) == 99)
                    {
                        this.x += this.dx;
                    }
                }
                else if(pacDirection[0] < 0)
                {
                    if(map.getTileId(this.ghostPos[1], this.ghostPos[0] - 1) == 10 
                        || map.getTileId(this.ghostPos[1], this.ghostPos[0] - 1) == 99)
                    {
                        this.x -= this.dx;
                    }
                }
            }
            else
            {
                if(pacDirection[0] > 0)
                {
                    this.x += this.dx;
                }
                else
                {
                    this.x -= this.dx;
                }
            }
        }
        if(this.x % tileSize == 0)
        {
            if(this.y % tileSize == 0)
            {
                if(pacDirection[1] > 0)
                {
                    if(map.getTileId(this.ghostPos[1] + 1, this.ghostPos[0]) == 10 
                        || map.getTileId(this.ghostPos[1] + 1, this.ghostPos[0]) == 99)
                    {
                        this.y += this.dy;
                    }
                }
                else if(pacDirection[1] < 0) 
                {
                    if(map.getTileId(this.ghostPos[1] - 1, this.ghostPos[0]) == 10 
                        || map.getTileId(this.ghostPos[1] - 1, this.ghostPos[0]) == 99)
                    {
                        this.y -= this.dy;
                    }
                }
            }
            else
            {
                if(pacDirection[1] > 0)
                {
                    this.y += dy;
                }
                else
                {
                    this.y -= dy;
                }
            }
        }*/
        this.draw();
        this.ghostPos = [this.getThisPos(this.x), this.getThisPos(this.y)];
    }
}

function Pacman(x, y, dx, dy, radius)
{	
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
    // X, Y
    //Pac-Man's next location in the map array based on direction in
    this.getNextPos = function(pos, spd, rad)
    {
        return ((pos + spd + rad) - ((pos + spd + rad) % tileSize)) / tileSize;
    }
    //Pac-Man's current location in the map array
    this.getThisPos = function(pos)
    {
        return (pos - (pos % tileSize)) / tileSize;
    }       

    this.pacPos = [this.getThisPos(this.x), this.getThisPos(this.y)];
    this.nextPos = [this.getNextPos(this.x, -this.dx, this.radius), this.getThisPos(this.y)];

    this.death = function()
    {
        var fltOpen = pctOpen / 25;
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
        pctOpen -= dir;
    }

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
		// changes variable that controls Mouth opening animation
		pctOpen += dir;

		//checks Wall collision
		if(directions[0] || directions[2])
		{ 
			if(map.array[this.nextPos[1]][this.nextPos[0]] != 10 
                && map.array[this.nextPos[1]][this.nextPos[0]] != 99)
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
            if(map.array[this.nextPos[1]][this.nextPos[0]] != 10 
                && map.array[this.nextPos[1]][this.nextPos[0]] != 99 )
            {
                if(directions[1])
                {
                    directions[1] = false;
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

        // if you can move in a direction and depending on the queueMove set the direction
        if(queueMove == 0 
            && this.checkMove(map.array[this.getThisPos(this.y)][this.getNextPos(this.x, -this.dx, -this.radius)]))
        {
            setDirection(0, -1.0, 1.0);
        }
        else if(queueMove == 1 
            && this.checkMove(map.array[this.getNextPos(this.y, -this.dy, -this.radius)][this.getThisPos(this.x)]))
        {
            setDirection(1, -0.5, 1.5);
        }
        else if(queueMove == 2 
            && this.checkMove(map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)]))
        {
            setDirection(2, 0, 2.0);
        }
        else if(queueMove == 3 
            && this.checkMove(map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)]))
        {
            setDirection(3, -1.5, 0.5);
        }
	}

    this.checkMove = function(ar)
    {
        var check = false;
        if(ar == 10 || ar == 99)
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
		if(directions[0] 
            && (map.array[this.getThisPos(this.y)][this.getNextPos(this.x, -this.dx, -this.radius)] == 10 
                || map.array[this.getThisPos(this.y)][this.getNextPos(this.x, -this.dx, -this.radius)] == 99))
		{
            this.nextPos[0] = this.getNextPos(this.x, -this.dx, -this.radius);
            this.nextPos[1] = this.getThisPos(this.y);

			this.x -= this.dx;
            this.y = this.nextPos[1] * tileSize + this.radius;
        }
		else if(directions[1] 
            && (map.array[this.getNextPos(this.y, -this.dy, -this.radius)][this.getThisPos(this.x)] == 10 
                || map.array[this.getNextPos(this.y, -this.dy, -this.radius)][this.getThisPos(this.x)] == 99))
		{
            this.nextPos[1] = this.getNextPos(this.y, -this.dy, -this.radius);
            this.nextPos[0] = this.getThisPos(this.x);
            // console.log('nextPos ' + this.nextPos);

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
            // console.log('y, x, ' + this.y + ', ' + this.x);

		}
		else if(directions[2] 
            && (map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)] == 10 
                || map.array[this.getThisPos(this.y)][this.getNextPos(this.x, this.dx, this.radius)] == 99))
		{
            this.nextPos[0] = this.getNextPos(this.x, this.dx, this.radius);
            this.nextPos[1] = this.getThisPos(this.y);

			this.x += this.dx;
            this.y = this.nextPos[1] * tileSize + this.radius;
        }
		else if(directions[3] 
            && (map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)] == 10 
                || map.array[this.getNextPos(this.y, this.dy, this.radius)][this.getThisPos(this.x)] == 99))
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

var aStarCt = Math.round(tileSize / 2);

/*function deathAnimate() 
{
    if(pctOpen != 0)
    {
        requestAnimationFrame(deathAnimate);
    }
    //Fixed this by changing the parameters to be pacman specific
    //No longer needs to redraw the whole map.

    // Trying to make the 9 squares around Pacman (but still in the grid) dissapear instead of the ones not part of the grid.
    c.clearRect((pac.pacPos[0] - 1) * tileSize, (pac.pacPos[1] - 1) * tileSize, 3 * tileSize, 3 * tileSize);
    c.clearRect((blinky.ghostPos[0] - 1) * tileSize, (blinky.ghostPos[1] - 1) * tileSize, 3 * tileSize, 3 * tileSize);
    for(var i = -1; i < 2; i++)
    {
        for(var j = -1; j < 2; j++)
        {
            renderMap(pac.pacPos[1] + i, pac.pacPos[0] + j);
            renderMap(blinky.ghostPos[1] + i, blinky.ghostPos[0] + j);
        }
    }
    pac.death();

}*/

function animate() 
{
	requestAnimationFrame(animate);
    //Fixed this by changing the parameters to be pacman specific
    //No longer needs to redraw the whole map.

    // Trying to make the 9 squares around Pacman (but still in the grid) dissapear instead of the ones not part of the grid.
    c.clearRect((pac.pacPos[0] - 1) * tileSize, (pac.pacPos[1] - 1) * tileSize, 3 * tileSize, 3 * tileSize);
    c.clearRect((blinky.ghostPos[0] - 1) * tileSize, (blinky.ghostPos[1] - 1) * tileSize, 3 * tileSize, 3 * tileSize);
    for(var i = -1; i < 2; i++)
    {
        for(var j = -1; j < 2; j++)
        {
            renderMap(pac.pacPos[1] + i, pac.pacPos[0] + j);
            renderMap(blinky.ghostPos[1] + i, blinky.ghostPos[0] + j);
        }
    }
    pac.update();
    blinky.update(aStarCt);
    // if(aStarCt == Math.round(tileSize / 2))
    // {
    //     aStarCt = 0;
    // }
    // else
    // {
    //     aStarCt++;
    // }
    
	
    gameLogicUpdate();
    checkGhostCollision();

}

function initialRender()
{
    for (var i = 0; i < map.array.length; i++) 
    {
        for (var j = 0; j < map.array[i].length; j++) 
        {
            renderMap(i, j);
        }
    }
    pac = new Pacman(13.5 * tileSize, 23.5 * tileSize, tileSize / 8, tileSize / 8, tileSize/2);
    blinky = new Ghost(12 * tileSize, 11 * tileSize, tileSize / 16, tileSize / 16);
}

function renderMap(i, j) 
{
    //pellets
    if (map.array[i][j] === 10) {
        c.beginPath();
        c.rect(j*tileSize+(tileSize/2.6), i*tileSize+(tileSize/2.6), tileSize/4, tileSize/4);
        c.fillStyle = 'yellow';
        c.fill();
    }
    // Check if the value is a 1, represeting a graphic should be drawn.
    else if (map.array[i][j] === 11) {
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


function startGame() {
    initialRender();
    animate();
    startScreen.style.display="none";
}