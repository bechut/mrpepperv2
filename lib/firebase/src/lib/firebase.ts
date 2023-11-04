import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Messaging } from 'firebase/messaging';
import { FirebaseStorage } from 'firebase/storage';

export async function getAppInstance(): Promise<FirebaseApp> {
  const { initializeApp, getApp, getApps } = await import('firebase/app');
  const env = import.meta.env;
  const appName = env['VITE_FIREBASE_NAME'];

  if (getApps().length === 0) {
    const firebaseConfig = {
      apiKey: env['VITE_FIREBASE_API_KEY'],
      authDomain: env['VITE_FIREBASE_AUTH_DOMAIN'],
      projectId: env['VITE_FIREBASE_PROJECT_ID'],
      storageBucket: env['VITE_FIREBASE_STORAGE_BUCKET'],
      messagingSenderId: env['VITE_FIREBASE_MESSAGE_SEND_ID'],
      appId: env['VITE_FIREBASE_APP_ID'],
      measurementId: env['VITE_MEASUREMENT_ID'],
    };
    return initializeApp(firebaseConfig, appName);
  }
  return getApp(appName);
}

export async function getAuthInstance(): Promise<Auth> {
  const app = await getAppInstance();
  const { getAuth } = await import('firebase/auth');
  return getAuth(app);
}

export async function getFirestoreInstance(): Promise<Firestore> {
  const app = await getAppInstance();
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(app);
}

export async function getMessagingInstance(): Promise<Messaging> {
  const app = await getAppInstance();
  const { getMessaging } = await import('firebase/messaging');
  return getMessaging(app);
}

export async function getStorageInstance(): Promise<FirebaseStorage> {
  const app = await getAppInstance();
  const { getStorage } = await import('firebase/storage');
  return getStorage(app);
}
