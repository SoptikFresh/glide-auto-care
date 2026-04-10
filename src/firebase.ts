import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBKWefd3jCLvUOaf2s4MiuQvj31-4jloSM',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'jouraservis.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'jouraservis',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'jouraservis.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '178103262857',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:178103262857:web:d09c0bfbaa184bef65f058',
};


export const ADMIN_UID = import.meta.env.VITE_ADMIN_UID || 'umB4qKCJkZMrU6rWnodxQGSA2Yz1';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;