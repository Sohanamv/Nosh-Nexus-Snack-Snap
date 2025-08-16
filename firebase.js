// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// eslint-disable-next-line no-unused-vars
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzcTxUSjexnaxmwB-tv0sQUgoLpLaTasI",
  authDomain: "snacksnap-1453d.firebaseapp.com",
  projectId: "snacksnap-1453d",
  storageBucket: "snacksnap-1453d.appspot.com",
  messagingSenderId: "1084544125210",
  appId: "1:1084544125210:web:588ecb0a4f3420a1d644a3",
  measurementId: "G-59EVH6CZ95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const db =getFirestore(app);