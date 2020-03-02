import firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyBn_G8B-CoQNOugG2km0W5LLFhDy55xIZA",
    authDomain: "tenedores-ee99d.firebaseapp.com",
    databaseURL: "https://tenedores-ee99d.firebaseio.com",
    projectId: "tenedores-ee99d",
    storageBucket: "tenedores-ee99d.appspot.com",
    messagingSenderId: "40441814329",
    appId: "1:40441814329:web:dec18f5021448a73b99ce8"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
