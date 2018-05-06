let config = {
    apiKey: "AIzaSyAAmdIbaOZWJJf-vXSPaCSPGXscl72T6cM",
    authDomain: "fir-99747.firebaseapp.com",
    databaseURL: "https://fir-99747.firebaseio.com",
    projectId: "fir-99747",
    storageBucket: "",
    messagingSenderId: "156319699888"
};
firebase.initializeApp(config);
let provider = new firebase.auth.GoogleAuthProvider();
let data;

function login() {
    firebase.auth().signInWithPopup(provider).catch(function(result) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('controller').style.display = 'block';
        
    })
}

$('#up').mousedown(()=>{
    push('up');
});

<<<<<<< HEAD
$('#down').mousedown(()=>{
    push('down');
});

$('#right').mousedown(()=>{
    push('right');
});

$('#left').mousedown(()=>{
    push('left');
});

$('#build').mousedown(()=>{
    push('build');
});

$('#shoot').mousedown(()=>{
    push('attack');
});

function push(s) {
    console.log(s);
}

function style(s) {
    document.getElementById('st').innerHTML+="\n"+s;
}
// Call style(".button {background-color: green;}") to make all teh button's background color green

firebase.database().ref("/game").on("value", snap => {
    data = snap.val();
})

function push(s) {
    console.log(s);
    firebase.database().ref("/game/"+/*firebase.auth().currentUser.uid*/"testid"+"/"+data[/*firebase.auth().currentUser.uid*/"testid"].length)
}
