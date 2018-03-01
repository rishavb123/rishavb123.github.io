// Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

if(innerHeight>innerWidth) {
    canvas.width = innerWidth;	
    canvas.height = innerWidth;
} else {
    canvas.width = innerHeight;	
    canvas.height = innerHeight;
}

// Variables
var mouse = {
	x: 0,
    y: 0
};

var player = new Character(20, 20);
var objs = [player];
var angle = 0;
var turning = 0;


// Event Listeners
addEventListener('mousemove', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', () => {
	if(innerHeight>innerWidth) {
        canvas.width = innerWidth;	
        canvas.height = innerWidth;
    } else {
        canvas.width = innerHeight;	
        canvas.height = innerHeight;
    }
});

addEventListener('keydown', e => {
    if(e.keyCode>=37 && e.keyCode<=40)
        player.direction = e.keyCode - 36;
    else if(e.keyCode === 32)
        player.attack();
});

var shakeEvent = new Shake({threshold: 15});
shakeEvent.start();
window.addEventListener('shake', function(){
    turning = 2;
}, false);

//"Classes"

function Character(x, y, color) {
    this.x = x;
    this.y = y;
    this.direction = 0;
    
    this.attack = function() {
        objs.push(new Bullet(this.x+.5,this.y+.5,this.direction));
    }
    
    this.update = function() {
        switch(this.direction) {
        
            case 1:
                this.x--;
                break;
            case 2:
                this.y--;
                break;
            case 3:
                this.x++;
                break;
            case 4:
                this.y++;
                break;
                
        }   
        this.draw();
    }
    
    this.draw = function() {
        c.fillRect(this.x*canvas.width/100,this.y*canvas.height/100,2*canvas.width/100,2*canvas.height/100);
    }
}

function Bullet(x, y, direction) {
    
    this.x = x;
    this.y = y;
    this.direction = direction;
    
    this.update = function() {
        
        switch(this.direction) {
        
            case 1:
                this.x-=2;
                break;
            case 2:
                this.y-=2;
                break;
            case 3:
                this.x+=2;
                break;
            case 4:
                this.y+=2;
                break;
                
        }
        
        this.draw();
    }
        
    this.draw = function() {
        c.fillRect(this.x*canvas.width/100,this.y*canvas.height/100,canvas.width/100,canvas.height/100)

    }
    
}

//Animation Loop

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    if(turning>0.001) {
        angle+=10;
        turning-=1/36.0;
    }
    
    angle = angle%360;
    
    canvas.style.transform = "rotate("+angle+"deg)";
    
    for(var obj in objs)
        objs[obj].update();
}

animate();