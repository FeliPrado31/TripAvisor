import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbSIYABK6Uz5FVKWXFBKB3UJG3q9Y6SD0",
  authDomain: "simple-web-92750.firebaseapp.com",
  projectId: "simple-web-92750",
  storageBucket: "simple-web-92750.appspot.com",
  messagingSenderId: "861413458080",
  appId: "1:861413458080:web:1da63564752681f9dc89c5",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
