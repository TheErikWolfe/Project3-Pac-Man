// comment
var canvas = document.querySelector('canvas');

canvas.width = 500;
canvas.height = 700;

var c = canvas.getContext('2d');

window.addEventListener("keypress", keyPressed);  // bind to taskInput, not addButton

function keyPressed(k) 
{
  if (k.code == 'Enter')
  {     // only if the key is "Enter"...
    addTask();    
  }
              // ...add a new task (using same handler as the button)
  return false;               // no propagation or default
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
		this.x += this.dx;
		this.draw();
		console.log("Made It: " + this.x );
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	pac.update();



}

animate();