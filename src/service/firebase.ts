// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO5hb5dYhzhCbz9GADrdrN-uLnWgebxUk",
  authDomain: "books-base-fe14d.firebaseapp.com",
  projectId: "books-base-fe14d",
  storageBucket: "books-base-fe14d.appspot.com",
  messagingSenderId: "231802353399",
  appId: "1:231802353399:web:5b64a1a1c1c29d69ad45f2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp;
