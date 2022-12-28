import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//  Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "twitter-clone-8fd96.firebaseapp.com",
  projectId: "twitter-clone-8fd96",
  storageBucket: "twitter-clone-8fd96.appspot.com",
  messagingSenderId: "583595697781",
  appId: "1:583595697781:web:60401b6cfbb4b1baa83a3c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
