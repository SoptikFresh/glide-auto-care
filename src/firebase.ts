import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection } from 'firebase/firestore';

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

// Firestore functions for admin data
export const saveContactToFirestore = async (contact: { Adresa: string; Email: string; Telefon: string }) => {
  const docRef = doc(db, 'Služby', 'Contact');
  await setDoc(docRef, contact);
};

export const saveOpeningHoursToFirestore = async (hours: { Weekdays: string; Saturday: string; Sunday: string }) => {
  const docRef = doc(db, 'Služby', 'Opening Hours');
  await setDoc(docRef, hours);
};

export const saveServicesToFirestore = async (services: Array<{ Cena: string; Název: string; Popis: string; Čas: string }>) => {
  const docRef = doc(db, 'Služby', 'Services');
  await setDoc(docRef, { services });
};

export const loadContactFromFirestore = async () => {
  const docRef = doc(db, 'Služby', 'Contact');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as { Adresa: string; Email: string; Telefon: string } : null;
};

export const loadOpeningHoursFromFirestore = async () => {
  const docRef = doc(db, 'Služby', 'Opening Hours');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as { Weekdays: string; Saturday: string; Sunday: string } : null;
};

export const loadServicesFromFirestore = async () => {
  const docRef = doc(db, 'Služby', 'Services');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as { services: Array<{ Cena: string; Název: string; Popis: string; Čas: string }> }).services : null;
};

// Debug function to check Firestore data
export const debugFirestoreData = async () => {
  console.log("=== Firestore Debug ===");

  try {
    // Test basic connection
    console.log("Testing Firebase connection...");
    console.log("DB object exists:", !!db);
    console.log("DB app exists:", !!db?.app);

    // Test reading Contact
    console.log("Reading Contact document...");
    const contactDoc = await getDoc(doc(db, 'Služby', 'Contact'));
    console.log("Contact exists:", contactDoc.exists());
    if (contactDoc.exists()) {
      console.log("Contact data:", contactDoc.data());
    }

    // Test reading Hours
    console.log("Reading Hours document...");
    const hoursDoc = await getDoc(doc(db, 'Služby', 'Opening Hours'));
    console.log("Hours exists:", hoursDoc.exists());
    if (hoursDoc.exists()) {
      console.log("Hours data:", hoursDoc.data());
    }

    // Test reading Services
    console.log("Reading Services document...");
    const servicesDoc = await getDoc(doc(db, 'Služby', 'Services'));
    console.log("Services exists:", servicesDoc.exists());
    console.log("Services document ref:", servicesDoc.ref.path);
    if (servicesDoc.exists()) {
      const data = servicesDoc.data();
      console.log("Services raw data:", data);
      console.log("Services data type:", typeof data);
      if (data) {
        console.log("Services data keys:", Object.keys(data));
        console.log("Services.services:", data.services);
        console.log("Services.services type:", typeof data.services);
        console.log("Services.services isArray:", Array.isArray(data.services));
        if (Array.isArray(data.services)) {
          console.log("Services.services length:", data.services.length);
          if (data.services.length > 0) {
            console.log("First service item:", data.services[0]);
          }
        }
      }
    } else {
      console.log("❌ Services document does not exist!");
    }
  } catch (error) {
    console.error("❌ Debug error:", error);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);
    console.error("❌ Error stack:", error.stack);
  }

  console.log("=== End Debug ===");
};

export default app;