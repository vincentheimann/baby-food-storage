// src/services/firebaseApp.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDsmWLWLhSkpkdxgIGJp0NyCshZzjLBL9M",
    authDomain: "baby-food-storage.firebaseapp.com",
    projectId: "baby-food-storage",
    storageBucket: "baby-food-storage.appspot.com",
    messagingSenderId: "541548181714",
    appId: "1:541548181714:web:00b3bf47d6fce0cbac150b",
  };

const app = initializeApp(firebaseConfig);

export default app;
