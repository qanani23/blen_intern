
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
 apiKey: "AIzaSyDvjRxsu9HeMBCZujbsFSJ-t0ZSgSp10r0",
  authDomain: "skypath-b816f.firebaseapp.com",
  projectId: "skypath-b816f",
  storageBucket: "skypath-b816f.firebasestorage.app",
  messagingSenderId: "379909131760",
  appId: "1:379909131760:web:03d8b0b97db6d2d3262135",
  measurementId: "G-L2CJXW5SJH"
};



const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);