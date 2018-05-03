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

function login() {
    firebase.auth().signInWithPopup(provider).catch(function(result) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('controller').style.display = 'block';
        
    })
}

$('#up').mousedown(()=>{
    push('up');
});

function push(s) {
    console.log(s);
    window.open("../game/index.html");
}