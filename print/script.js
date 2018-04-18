var config = {
    apiKey: "AIzaSyCbBFGrK_aYRTH5feJ_pwZ1d04QCBvG1x8",
    authDomain: "services-rishavb123.firebaseapp.com",
    databaseURL: "https://services-rishavb123.firebaseio.com",
    projectId: "services-rishavb123",
    storageBucket: "services-rishavb123.appspot.com",
    messagingSenderId: "243230473513"
};
firebase.initializeApp(config);
let s =[]
let obj = {};
function getBase64(file) {
   let reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     s.push(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

function print() {
    let files = document.getElementById("input").files;
    let str = document.getElementById("text-input").value;
    s=[];
    for(let x=0;x<files.length;x++) {
        getBase64(files[x]);
    }
    
    console.log(str);
    console.log(s);
    
    obj = {
        done: false,
        text: str,
        files: s
    }
        
    push();
}

function push() {
    let r = firebase.database().ref("/Print/jobs/1");
    console.log(obj);
    r.set(obj);    
    console.log("done")
}

