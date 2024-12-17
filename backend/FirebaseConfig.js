// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, initializeAuth, getReactNativePersistence, 
    createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpw5TAWIhAAdzTeeKCQM5GiSBdtCDpzRM",
  authDomain: "helloapp-446dd.firebaseapp.com",
  projectId: "helloapp-446dd",
  storageBucket: "helloapp-446dd.firebasestorage.app",
  messagingSenderId: "758624883833",
  appId: "1:758624883833:web:d3d9e1c11cb07cd64770a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {app, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut};