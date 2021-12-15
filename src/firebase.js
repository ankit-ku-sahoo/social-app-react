import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBKHq8eDZWaImPmTC0i80duML96ogW4udg",
  authDomain: "social-a2890.firebaseapp.com",
  projectId: "social-a2890",
  storageBucket: "social-a2890.appspot.com",
  messagingSenderId: "772757147259",
  appId: "1:772757147259:web:dccf3be9ae4290133fdcde"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);