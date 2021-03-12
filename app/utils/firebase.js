import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDaoba14n51UXwFyhlwqY2q4fSyx_egBzI",
  authDomain: "tripavisor-c1306.firebaseapp.com",
  projectId: "tripavisor-c1306",
  storageBucket: "tripavisor-c1306.appspot.com",
  messagingSenderId: "327989659068",
  appId: "1:327989659068:web:e8dfbf6f2112f4b88897b9",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
