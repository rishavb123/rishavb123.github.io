// Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

if(innerHeight>innerWidth) {
    canvas.width = innerWidth;	
    canvas.height = innerWidth;
} else {
    canvas.width = innerHeight;	
    canvas.height = innerHeight;
}

// Variables
let mouse = {
	x: 0,
    y: 0
};

let player = new Character(20, 20,'rgba(0,0,255,1)');
let objs = [new Character(80,20,'rgba(255,0,0,1)')];
let angle = 0;
let turning = 0;


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

let shakeEvent = new Shake({threshold: 10});
shakeEvent.start();
window.addEventListener('shake', function(){
    turning = 2;
}, false);

//"Classes"

function Character(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 2;
    this.height = 2;
    this.direction = 0;
    this.health = 100;
    this.color = color;
    
    this.attack = function() {
        if(this.direction!=0)
            objs.push(new Bullet(this, this.x+.5,this.y+.5,this.direction));
        else
            objs.push(new Bullet(this, this.x+.5,this.y+.5,1));
    }
    
    this.damage = function() {
        this.health-=10;
        let spl = this.color.split(',');
        spl[3] = (this.health/100.0).toString()+")";
        this.color = "";
        for(let x=0;x<spl.length-1;x++) {
            this.color+=spl[x]+",";
        }
        this.color+=spl[spl.length-1];
    }
    
    this.update = function() {
        
        if(this.health<=0)
            return false;
        
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
        
        for(indexe in objs) {
            obj = objs[indexe];
            if(obj!=this && (obj.x + obj.width >= this.x && obj.x <= this.x + this.width) && (obj.y + obj.height >= this.y && obj.y <= this.y + this.height))
            {
                if(obj instanceof Bullet && obj.sender != this) {
                    objs.splice(indexe,1);
                    this.damage();
                }
                else if(obj instanceof Character)
                    this.damage();
            }

        }
        
        this.draw();
        return true;
    }
    
    this.draw = function() {
       
         c.fillStyle = this.color;
        c.fillRect(this.x*canvas.width/100,this.y*canvas.height/100,2*canvas.width/100,2*canvas.height/100);
    }
}

function Bullet(sender, x, y, direction) {
    
    this.sender = sender
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 1;
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
       
        c.fillStyle = this.sender.color;
        c.fillRect(this.x*canvas.width/100,this.y*canvas.height/100,canvas.width/100,canvas.height/100);

    }
    
}

//Game Function

function gameOver() {
    console.log("Game over u lose");
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    if(turning>0.001) {
        angle+=10;
        turning-=1/36.0;
    }
    
    angle = angle%360;
    
    canvas.style.transform = "rotate("+angle+"deg)";

    for(let obj in objs)
        if(!(objs[obj] instanceof Character))
            objs[obj].update();
                
    if(!player.update())
        gameOver();
    
    
    for(let obj in objs)
        if(objs[obj] instanceof Character)
            if(!objs[obj].update())
                objs.splice(obj,1);
                
    objs[0].attack();
}

animate();