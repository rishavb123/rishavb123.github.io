let config = {
    apiKey: "AIzaSyCd1dNugLT94SV-uMY086QGoe8f-F7d2rk",
    authDomain: "cloudnotes-rishavb123.firebaseapp.com",
    databaseURL: "https://cloudnotes-rishavb123.firebaseio.com",
    projectId: "cloudnotes-rishavb123",
    storageBucket: "",
    messagingSenderId: "584029404493"
};
firebase.initializeApp(config);

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const errorOutput = document.getElementById('error-output');

let full = false;
    
function outputError(e) {
    errorOutput.innerHTML = e.message
    $('.warning').removeClass('hide')
}

function clearOutput() {
    errorOutput.innerHTML =''
    $('.warning').addClass('hide')
}

btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then(e => {
        clearOutput();
    }).catch(e => {
        outputError(e);
    })
})

btnSignUp.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.then(e => {
        clearOutput()
    }).then(e => {
        let user = firebase.auth().currentUser

        user.sendEmailVerification()
        
    }).catch(e => {
        outputError(e)
    });
});

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        $('.log-in').addClass("hide");
        $('.main-app').removeClass('hide');
        txtEmail.value = "";
        txtPassword.value = "";
        $('canvas').removeClass('blur');
        app();
    }
    else {
        $('.log-in').removeClass('hide');
        $('.main-app').addClass('hide');
    }
});

$('body').click(e => {
    if(e.target.tagName=='BODY')
        $('canvas').removeClass('blur');
});

let dbRef = firebase.database().ref();
let userRef;
data = [];

document.getElementById('search-bar').addEventListener('keyup', function() {
    search();
});

function search() {
    let input = document.getElementById('search-bar').value.toLowerCase();
    let li = document.getElementById('notes').getElementsByTagName('li');
    
    for(let i=0;i<li.length;i++) {
        let spans = li[i].getElementsByClassName('inside-list');
        if(spans[0].innerHTML.toLowerCase().indexOf(input)<0&&spans[1].innerHTML.toLowerCase().indexOf(input)<0) {
            li[i].classList.add('hide');
        } else {
            li[i].classList.remove('hide');
        }
                
    }
}

document.getElementById('editor').addEventListener('keyup', function() {
    
    save();
    
});

function save() {
    let edit = document.getElementById('editor');
    let index = edit.dataset.index;
    let titleInput = document.getElementById('title-input');
    let lastEditedArea = document.getElementById('editor-last-edited');
    let updatedNote = document.getElementById('updated-note');
    
    let time = curTime();
    
    lastEditedArea.innerHTML = time;
    
    userRef.child(index).set({
        
        "title": titleInput.value.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
        "note": updatedNote.value.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
        "last-edited": time
        
    });
}


function editor(index) {
    $('.editor-wrapper').removeClass('hide');
    $('.main-app').addClass('blur');
    let edit = document.getElementById('editor');
    edit.dataset.index = String(index);
    
    let dbData = data[index];
    
    let titleInput = document.getElementById('title-input');
    let lastEditedArea = document.getElementById('editor-last-edited');
    let updatedNote = document.getElementById('updated-note');

    titleInput.value = dbData["title"];
    lastEditedArea.innerHTML =dbData["last-edited"];
    updatedNote.value = dbData["note"];
    
}

function fullScreen() {
    if(!full)
        $('.editor').addClass('full');
    else
        $('.editor').removeClass('full');
    full = !full;
}

function noteDownload() {
    let titleInput = document.getElementById('title-input').value;
    let updatedNote = document.getElementById('updated-note').value;
    
    let fileName = (titleInput.split('.').length>1)? titleInput : titleInput+'.txt';
    
    let blob = new Blob([updatedNote],{type: "text/plain;charset=utf-8"});
    saveAs(blob,fileName);
}

function noteUpload() {
    let inpFile = document.getElementById("file");
    if(inpFile.files[0].type=='text/plain') {
        let fr = new FileReader();
        fr.readAsBinaryString(inpFile.files[0]);
        fr.onloadend = e => {
            let string = e.target.result;
            let titleInput = document.getElementById('title-input');
            let updatedNote = document.getElementById('updated-note');
            
            let t = '';
            
            if(inpFile.files[0].name.split('.')[inpFile.files[0].name.split('.').length-1]=='txt') {
                for(let x=0;x<inpFile.files[0].name.split('.').length-1;x++) {
                    t+=inpFile.files[0].name.split('.')[x];
                }
            } else {
                t= inpFile.files[0].name;
            }
            
            titleInput.value = t;
            updatedNote.value = string;
            
            save();
        };
    }
}

function noteDelete() {
    let entry = prompt("Are You Sure That You Want To Delete This Note? ");
    if(!isIn(properResponses, entry.toLowerCase().replace(/ /g,'')))
        return;
    let edit = document.getElementById('editor');
    let index = parseInt(edit.dataset.index);
    closeEditor();
    removeData(index);
}

function removeData(index) {
    for(let x=index;x<data.length-1;x++) {
        userRef.child(x).set(data[x+1]);
    }
    userRef.child(data.length-1).remove();
}

let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let properResponses = ["yes","totally","yup","ya","imsure","ofcourse","whynot","definitely","gladly","i'msure"];

function closeEditor() {
    $('.editor-wrapper').addClass('hide');
    $('.main-app').removeClass('blur');
    full = true;
    fullScreen();
}

function isIn(arr, item) {
    for(let a in arr) {
        if(arr[a]==item)
            return true;
    }
    return false;
}

function curTime() {
    let d = new Date();
    return d.getDate()+" "+months[parseInt(d.getMonth())]+" "+d.getFullYear()+" "+String(parseInt(d.getHours()))+":"+String(parseInt(d.getMinutes()))+":"+String(parseInt(d.getSeconds()))+":"+String(parseInt(d.getMilliseconds()));
}

function newNote() {
    let ni = data.length;
    userRef.child(ni).set({
        "title": "New Note",
        "note": "Enter Text Here",
        "last-edited": curTime()
    });
    
    editor(data.length-1);
}

function app() {
    if(firebase.auth().currentUser.emailVerified) {
        userRef = dbRef.child(firebase.auth().currentUser.uid);
        userRef.on('value', function(snap) {
            data = snap.val();
            if(data==null) {
                data = [];
            }
            
            document.getElementById('notes').innerHTML = '';
            
            for(index in data) {
                document.getElementById('notes').innerHTML+="<li class='note' onclick = 'editor("+String(index)+")'><h2 class='note-title inside-list'>"+data[index].title+"</h2><pre class='note-content inside-list'>"+data[index].note+"</pre></li>";
            }
            
            document.getElementById('notes').innerHTML+="<li class='note' onclick='newNote()'><h2 class='note-title inside-list'>New Note</h2><span class='new-note note-content inside-list'></span></li>";
            
            if(document.getElementById('search-bar').value.length!=0) {
                search();
            }
            
        })
        let innerCode = "";
        
    } else {
        document.getElementById('notes').innerHTML = '<h1 style="color: red;">PLEASE USE A VERIFIED ACCOUNT</h1>';
    }
}
