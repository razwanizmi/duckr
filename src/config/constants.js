import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBemXgQdca4xTTWyblb3T-tUuQLODGctIc",
  authDomain: "raz-duckr.firebaseapp.com",
  databaseURL: "https://raz-duckr.firebaseio.com",
  projectId: "raz-duckr",
  storageBucket: "raz-duckr.appspot.com",
  messagingSenderId: "770252683934"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
