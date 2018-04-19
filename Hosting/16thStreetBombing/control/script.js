var config = {
    apiKey: "AIzaSyBPK589vbg8IP1wtkQiUNE1M81VwVFzQpA",
    authDomain: "r16th-street-bombing.firebaseapp.com",
    databaseURL: "https://r16th-street-bombing.firebaseio.com",
    projectId: "r16th-street-bombing",
    storageBucket: "r16th-street-bombing.appspot.com",
    messagingSenderId: "567387558311"
};
firebase.initializeApp(config);

let data = {}
let part = 0;

firebase.database().ref().on("value", snap => {
    data = snap.val();
    part = parseInt(data.part);
})

function clicked() {
    if(part!=8)
        part+=1;
    part = part%8;
    firebase.database().ref().update({part: part});
}

function end() {
    part = 8;
    firebase.database().ref().update({part: part});
}