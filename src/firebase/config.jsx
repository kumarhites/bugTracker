import firebase from 'firebase/app'
import 'firebase/firestore'
import  'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBxZkSIgdSp9lvsJAmLitRYh1PUXIW_5J0",
    authDomain: "bugtracker-dbc33.firebaseapp.com",
    projectId: "bugtracker-dbc33",
    storageBucket: "bugtracker-dbc33.appspot.com",
    messagingSenderId: "543193641199",
    appId: "1:543193641199:web:004fe2163976f69c476b1a"
};

//initialize firebase 
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export {projectFirestore, projectAuth, timestamp, projectStorage}