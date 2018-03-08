const inp = document.getElementById("inp");
const logger = document.getElementById("logger");
const btn = document.getElementById("btn");
const img = document.getElementById("img");

btn.onclick = player;
inp.onkeyup = e => {
    if(e.keyCode === 13)
        player();
}


function player() {
    
    logger.innerHTML+="<p class='logged'>" + inp.value + "</p>"
    
    try {
        let audio = new Audio("audio/"+inp.value.toLowerCase()+".mp3");
        audio.play();
    } catch(e) {}
    
    try {
        img.src = "imgs/"+inp.value.toLowerCase()+".gif";
    } catch(e) {}
    
    inp.value = ""
    
}