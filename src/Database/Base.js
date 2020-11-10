import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBvDvtlltsrOQoYplR-WzeXH90htbp40Lg",
  authDomain: "experience-2acaa.firebaseapp.com",
  databaseURL: "https://experience-2acaa.firebaseio.com",
  projectId: "experience-2acaa",
  storageBucket: "experience-2acaa.appspot.com",
  messagingSenderId: "655957420330",
  appId: "1:655957420330:web:42e705b005cc5cccc75653",
});

export default app;

export const db = app.firestore();
