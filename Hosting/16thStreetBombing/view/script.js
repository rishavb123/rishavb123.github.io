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

firebase.database().ref().on("value", snap => {
    data = snap.val();
    document.getElementById('t').src = "data:image/jpg;base64,"+data.image;
})

