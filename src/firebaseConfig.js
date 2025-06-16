import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Authentication
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCbH-WKNFtu5s5FVQPnrig535KSVaTec9A',
    authDomain: 'shopping-list-demo-cdec0.firebaseapp.com',
    projectId: 'shopping-list-demo-cdec0',
    storageBucket: 'shopping-list-demo-cdec0.firebasestorage.app',
    messagingSenderId: '731358085149',
    appId: '1:731358085149:web:53cba2c58c516f7f8886f4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
