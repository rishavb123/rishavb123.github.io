let config = {
    apiKey: "AIzaSyCbXHJ7t2tFkevBOk_AUi0R6MEvf4qkf94",
    authDomain: "admin-website-8bbf8.firebaseapp.com",
    databaseURL: "https://admin-website-8bbf8.firebaseio.com",
    projectId: "admin-website-8bbf8",
    storageBucket: "admin-website-8bbf8.appspot.com",
    messagingSenderId: "12512271994"
  };
  firebase.initializeApp(config);

let dog

firebase.database().ref().on('value', snap => {
    dog = snap.val()['data']
});

document.getElementById('btn').onclick = () => {
    document.getElementById('styleElement').innerHTML+=document.getElementById('css-input').value;
    document.getElementById('css-input').value = ''
}