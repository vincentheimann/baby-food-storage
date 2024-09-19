// /src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (replace with your actual config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDsmWLWLhSkpkdxgIGJp0NyCshZzjLBL9M",
  authDomain: "baby-food-storage.firebaseapp.com",
  projectId: "baby-food-storage",
  storageBucket: "baby-food-storage.appspot.com",
  messagingSenderId: "541548181714",
  appId: "1:541548181714:web:00b3bf47d6fce0cbac150b",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
