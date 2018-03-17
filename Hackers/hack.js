const body = document.querySelector("body");
const content = document.querySelector(".content");
const hackedContent = document.querySelector(".hacked-content");
const typer = document.getElementById('type');
const hackedText = "Hi Rishav, I have finally broken through your firewalls. It took me a few hours but its done. I was getting close before, if you noticed those blackouts. Yup that was me, but anyways play the downloaded video. Its totally not a virus I am trying to install onto Q's computer and hack into his files and get things like this.";

let x=0;

function hack() {
    content.style.display = "none";
    hackedContent.style.display = "block";
    
    type();
    
    document.getElementById('vidLink').click();
    
}

function unhack() {
    content.style.display = "block";
    hackedContent.style.display = "none";    
}

function type() {
    if(x < hackedText.length) {
        typer.innerHTML+=hackedText.charAt(x)
        x++;
        setTimeout(type, 10);
    } else {
        document.getElementById('qImg').src = 'imgs/q.jpeg';
        setTimeout(remove, 1000);
    }
    
    throw "Security Breach through firewall"
}

function remove() {
    document.getElementById('qImg').style.display = 'none';
}

function display() {
    document.getElementById('qImg').style.display = 'block';
}

window.addEventListener('keydown',() => {
    
    body.style.opacity = "0";
    body.style.backgroundColor = "rgba(0,0,0,1)";
    
    setTimeout( () => {
        body.style.opacity = "1";
        body.style.backgroundColor = "rgba(0,0,0,0)";
    }, 100);
    
    throw "Security Warning, Cyber Attack on firewall"'
});

window.addEventListener('click',() => {
    
    body.style.opacity = "0";
    body.style.backgroundColor = "rgba(0,0,0,1)";
    
    setTimeout( () => {
        body.style.opacity = "1";
        body.style.backgroundColor = "rgba(0,0,0,0)";
    }, 100);
    
    throw "Security Warning, Cyber Attack on firewall"'
});


