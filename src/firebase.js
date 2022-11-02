// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAncOBvhxeWc7sezn8i4vs2EhRAetMRjVA",
  authDomain: "flipsure-d1182.firebaseapp.com",
  projectId: "flipsure-d1182",
  storageBucket: "flipsure-d1182.appspot.com",
  messagingSenderId: "185484988372",
  appId: "1:185484988372:web:827b794fafa453eb1b1041",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
