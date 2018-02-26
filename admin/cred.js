var config = {
    apiKey: "AIzaSyCbXHJ7t2tFkevBOk_AUi0R6MEvf4qkf94",
    authDomain: "admin-website-8bbf8.firebaseapp.com",
    databaseURL: "https://admin-website-8bbf8.firebaseio.com",
    projectId: "admin-website-8bbf8",
    storageBucket: "admin-website-8bbf8.appspot.com",
    messagingSenderId: "12512271994"
};
firebase.initializeApp(config);

const iframe = document.getElementById('admin-iframe')
const iframeText = document.getElementById('admin-iframe-entry')
const adminLogin = document.getElementById('adminLogin')
const adminLogout = document.getElementById('adminLogout')
const adminEmail = document.getElementById('adminEmail')
const createAdmin = document.getElementById('createAdmin')
const addAdminEmail = document.getElementById('addAdminEmail')
const addAdminName = document.getElementById('addAdminName')
const adminPassword = document.getElementById('adminPassword')
const errorOutput = document.getElementById('error-output')
const auth = firebase.auth()

iframeText.addEventListener('keyup', e => {
    console.log(e.keyCode)
    if(e.keyCode == 13)    
        iframe.src = location.href.replace("admin",iframeText.value)
})

adminLogin.addEventListener('click', e => {
    const email = adminEmail.value
    const pass = adminPassword.value
    
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.then(e => {
        clearOutput()
    }).catch(e => {
        outputError(e)
    })
})

createAdmin.addEventListener('click', e => {
    auth.signOut()
    const promise = auth.createUserWithEmailAndPassword(addAdminEmail.value, makepassword(Math.floor(Math.random()*15)+8))
    promise.then(e => {
         auth.currentUser.updateProfile({
             displayName: addAdminName.value
         })
        auth.sendPasswordResetEmail(auth.currentUser.email)
        auth.signOut()
    }).catch(e => {
        console.log(e.message)
    })
})

adminLogout.addEventListener('click', e => {
    auth.signOut()
})

function makepassword(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function outputError(e) {
    errorOutput.innerHTML = e.message
    $('.warning').removeClass('hide')
}

function clearOutput() {
    errorOutput.innerHTML =''
    $('.warning').addClass('hide')
}

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        $('.admin-login').addClass("hide")
        $('.content').removeClass('hide')
        adminEmail.value = ""
        adminPassword.value = ""
    }
    else {
        $('.admin-login').removeClass('hide')
        $('.content').addClass('hide')
    }
})