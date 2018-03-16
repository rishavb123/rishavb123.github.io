const body = document.querySelector("body");
const content = document.querySelector(".content");
const hackedContent = document.querySelector(".hacked-content");
let counter = 0;

function hack() {
    content.style.display = "none";
    hackedContent.style.display = "block";
}

window.addEventListener('keydown',() => {
    
    body.style.opacity = "0";
    body.style.backgroundColor = "rgba(0,0,0,1)";
    
    setTimeout( () => {
        body.style.opacity = "1";
        body.style.backgroundColor = "rgba(0,0,0,0)";
    }, 100);
});