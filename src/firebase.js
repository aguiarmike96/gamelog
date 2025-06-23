// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYd3Ba9rkxqKIxlKL8xvx5Ybb6GnWOxaE",
  authDomain: "gamelog-66ab8.firebaseapp.com",
  projectId: "gamelog-66ab8",
  storageBucket: "gamelog-66ab8.firebasestorage.app",
  messagingSenderId: "646431864315",
  appId: "1:646431864315:web:92c6440ae05b298107875e",
  measurementId: "G-HJSHHHTE3S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
