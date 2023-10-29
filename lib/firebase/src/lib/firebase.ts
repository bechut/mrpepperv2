import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getMessaging, Messaging } from 'firebase/messaging';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const env = import.meta.env;
const appName = env['VITE_FIREBASE_NAME'];

const firebaseConfig = {
  apiKey: env['VITE_FIREBASE_API_KEY'],
  authDomain: env['VITE_FIREBASE_AUTH_DOMAIN'],
  projectId: env['VITE_FIREBASE_PROJECT_ID'],
  storageBucket: env['VITE_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: env['VITE_FIREBASE_MESSAGE_SEND_ID'],
  appId: env['VITE_FIREBASE_APP_ID'],
  measurementId: env['VITE_MEASUREMENT_ID'],
};
export const app = initializeApp(firebaseConfig, appName);
export const auth: Auth = getAuth(app);
export const store: Firestore = getFirestore(app);
export const messaging: Messaging = getMessaging(app);
export const storage: FirebaseStorage = getStorage(app);
