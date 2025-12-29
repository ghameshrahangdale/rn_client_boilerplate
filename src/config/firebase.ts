import { initializeApp } from 'firebase/app';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfNA84PWohMp3sCFr8kPuQ9YMnLDNlfYw",
  authDomain: "client-ready-f744e.firebaseapp.com",
  projectId: "client-ready-f744e",
  storageBucket: "client-ready-f744e.firebasestorage.app",
  messagingSenderId: "533489391926",
  appId: "1:533489391926:web:28cbd02750d754a7863b97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

const auth = initializeAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { app, auth, firestore, storage };