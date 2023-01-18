// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF6wXzq7qtkWQ46ACAIOLybe5Y52qAcZQ",
  authDomain: "personal-blog-2766e.firebaseapp.com",
  projectId: "personal-blog-2766e",
  storageBucket: "personal-blog-2766e.appspot.com",
  messagingSenderId: "314376698101",
  appId: "1:314376698101:web:7ce708f8172da6acbfadbc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
