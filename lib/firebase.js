// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9x3v94OOSf68ez00iOxxi92ohT75CRSM",
    authDomain: "azerisiqform.firebaseapp.com",
    projectId: "azerisiqform",
    storageBucket: "azerisiqform.firebasestorage.app",
    messagingSenderId: "891475226711",
    appId: "1:891475226711:web:f569261e11f1aeddebf312"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, addDoc, collection };

