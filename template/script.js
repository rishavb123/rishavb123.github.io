let arr = location.href.split('?')[1].split('|');

let code = document.getElementById("html").innerHTML;

let index = code.indexOf("</script>")+8;
let index2 = code.indexOf('css">')+3;

let add = "";
let styles = ""

for(let x in arr) {
    switch(x) {
        case "firebase":
            add+='<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>'
            break;
        case "jquery":
            add+='<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>'
            break;
        case "angular":
            add+='<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>';
            break;
        case "boostrap":
            styles+='<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
            break;
        
    }
}

let i ="<!DOCTYPE html>\n<html>\n" + code.substring(0,index2) + styles + code.substring(index2,index)+ add + code.substring(index)+"\n</html>"+document.getElementById('body').innerHTML;

i.replace(/</g,'&lt;').replace(/>/g,'&gt;')

console.log(i)

document.getElementById('body').innerHTML = i;

