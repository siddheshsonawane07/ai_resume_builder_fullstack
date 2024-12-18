/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArtwBi-1ofmr74tRP-rlMToPf3fh7GA_s",
  authDomain: "ai-resume-builder-b7ca0.firebaseapp.com",
  projectId: "ai-resume-builder-b7ca0",
  storageBucket: "ai-resume-builder-b7ca0.firebasestorage.app",
  messagingSenderId: "28805113766",
  appId: "1:28805113766:web:dbba07effad894a575d167"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { firebaseConfig, auth, app, db, storage };