const firebaseConfig = {
    apiKey: "AIzaSyDtmhGi_r2FDNHLcsfqNjm_K8TYGGIiMv8",
    authDomain: "popballoon-f0ccf.firebaseapp.com",
    projectId: "popballoon-f0ccf",
    storageBucket: "popballoon-f0ccf.appspot.com",
    messagingSenderId: "855781325646",
    appId: "1:855781325646:web:b6b4c8a5d5df97fafcfc1f"
};
firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const firestore = firebase.firestore();
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

document.getElementById('loginwithgmail').addEventListener('click', GoogleLogin);
document.getElementById('logOut').addEventListener('click', LogoutUser);

var provider = new firebase.auth.GoogleAuthProvider();


function GoogleLogin() {
    console.log('login btn call')
    firebase.auth().signInWithPopup(provider).then(res => {
        showUserDetails(res.user);
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('level1').style.display = 'block';
        console.log(res.user)

    }).catch(e => {
        console.log(e)
    })

}
function showUserDetails(user) {
    document.getElementById('userDetails').innerHTML = `<img src"${user.photoURL} style=width:10%> <p>Name: ${user.displayName}</p> <p>Email: ${user.email}</p>`;



}

function LogoutUser() {
   
    firebase.auth().signOut().then(() => {
        document.getElementById('login').style.display = 'block';
        document.getElementById('level1').style.display = 'none';

    }).catch((e) => {
        console.log(e)
    })
}


let popped = 0;
var startgame = false;
var score = 0;
var life = 5;
function signup() {
    document.getElementById("create").style.display = "none";
    document.getElementById("login").style.display = "block";
}
function createacc() {
    document.getElementById("create").style.display = "block";
    document.getElementById("login").style.display = "none";

}
function login() {
    document.getElementById("level1").style.display = "block";
    document.getElementById("login").style.display = "none";


}
function stop() {
    startgame = false;
}
function start() {
    startgame = true
}
document.addEventListener('mouseover', (e) => {
    if (startgame) {
        if (e.target.className === "balloon_red") {
            e.target.style.backgroundColor = "#ededed";
            e.target.textContent = "POP!";
            popped++;
            score++;
            document.getElementById("score").innerHTML = score;
            removeEvent(e);
            checkpop();
        }
        else {
            if (e.target.className === "balloon") {

                checklife();
            }
        }
    }
});

function removeEvent(e) {
    e.target.removeEventListener('mouseover', function () {

    })
};
function checklife() {
    life--;
    document.getElementById("life").innerHTML = life;
    if (life === 0) {
        alert("you lost the game")
        var answer = prompt("Can you restart the game then type yes")
        console.log(answer)
        if (answer.toLowerCase === "yes") {
            life = 5
            score = 0
        }
    }
}
function checkpop() {
    if (popped === 15) {
        alert("Go to next level")
        let gallery = document.querySelector('#balloon-gallery');
        gallery.innerHTML = '';
    }
};