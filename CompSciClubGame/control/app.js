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

firebase.database().ref("/game").on("value", snap => {
    data = snap.val();
})

function push(s) {
    console.log(s);
    firebase.database().ref("/game/"+/*firebase.auth().currentUser.uid*/"testid"+"/"+data[/*firebase.auth().currentUser.uid*/"testid"].length)
}