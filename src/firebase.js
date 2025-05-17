import { initializeApp } from 'firebase/app';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDbS--zCUVTL4Od7U1p1bzX2W8vmt5aeVA",
  authDomain: "job-portal-2dba6.firebaseapp.com",
  projectId: "job-portal-2dba6",
  storageBucket: "job-portal-2dba6.firebasestorage.app",
  messagingSenderId: "632275112567",
  appId: "1:632275112567:web:a68be6d45c79e263da6c72",
  measurementId: "G-R74M2GV8F1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const timestamp = serverTimestamp;
export { sendEmailVerification, sendPasswordResetEmail };