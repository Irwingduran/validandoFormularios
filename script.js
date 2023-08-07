// const firebase = require("firebase");
// require("firebase/firestore");

// import firebase from "firebase/app";
// import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRXUiHZemx5L1N_ZUMjvuRruwtStLALIk",
    authDomain: "validar-formulario-3f48c.firebaseapp.com",
    projectId: "validar-formulario-3f48c",
    storageBucket: "validar-formulario-3f48c.appspot.com",
    messagingSenderId: "471264074713",
    appId: "1:471264074713:web:64a4d01451b8b98689d7c8",
    measurementId: "G-8NZPGXNSZ6"
};

// Inicial firebase 
firebase.initializeApp(firebaseConfig);

//Inizialize cloud firebase and get a reference to the service 
const db = firebase.firestore();

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault()

    //to validate name 

    let nameEntry = document.getElementById('name')
    let nameError = document.getElementById('nameError')

    if (nameEntry.value.trim() === '') {
        nameError.textContent = 'Please, input your name'
        nameError.classList.add('error-message')
    } else {
        nameError.textContent = ''
        nameError.classList.remove('error-message')
    }

    //to validate email 
    let emailEntry = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic //validation pattern
    if (!emailPattern.text(emailEntry.value)) {
        emailError.textContent = 'Please, input a email'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //to validate password 
    let passwordEntry = document.getElementById('password')
    let passwordError = document.getElementById('passwordError')
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/; // basic validation pattern
    if (!passwordPattern.test(passwordEntry.value)) {
        passwordError.textContent = 'The password you must have 8 characters, numbers, capital letters, lowcase and special characters'
        passwordError.classList.add('error-message')
    } else {
        passwordError.textContent = ''
        passwordError.classList.remove('error-message')
    }

    //if all fields are valid send forms

    if (!nameError.textContent && !emailError.textContent && !passwordError.textContent) {

        //Backend 

        db.collection("users").add({
            name: nameEntry.value,
            email: emailEntry.value,
            password: passwordEntry.value
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });


        alert('Form send with success')
        document.getElementById('form').reset();
    }

})
