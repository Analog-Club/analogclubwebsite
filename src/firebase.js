// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOCRJSFxftALInbURLtLn2TlM9-ncNy9U",
  authDomain: "analogclub-c2630.firebaseapp.com",
  projectId: "analogclub-c2630",
  storageBucket: "analogclub-c2630.firebasestorage.app",
  messagingSenderId: "846448406799",
  appId: "1:846448406799:web:6bef965907ed3e3775ce7a",
  measurementId: "G-57R54CT1C1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);