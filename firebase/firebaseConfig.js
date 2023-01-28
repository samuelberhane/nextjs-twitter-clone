import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

//  Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
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
const auth = getAuth();

export { app, db, storage, auth };
