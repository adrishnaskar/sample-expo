// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_5WcQKaIh28D6DH948WOn2MoORpL4m4U",
  authDomain: "pissoo-react.firebaseapp.com",
  projectId: "pissoo-react",
  storageBucket: "pissoo-react.appspot.com",
  messagingSenderId: "669324299486",
  appId: "1:669324299486:web:cc78aee8a640d6a0aa464f",
  measurementId: "G-4KXMM0B4W6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authKeep = getReactNativePersistence(ReactNativeAsyncStorage);

export { db }

export const auth = getAuth(app);
