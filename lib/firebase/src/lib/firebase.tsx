import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Messaging } from 'firebase/messaging';
import { FirebaseStorage } from 'firebase/storage';
import { IFirebaseConfig } from '@mrpepper/types';

export async function getAppInstance(
  firebaseConfig: IFirebaseConfig
): Promise<FirebaseApp> {
  const { initializeApp, getApp, getApps } = await import('firebase/app');
  const { appName } = firebaseConfig;

  if (getApps().length === 0 && firebaseConfig) {
    return initializeApp(firebaseConfig, appName);
  }
  return getApp(appName);
}

export async function getAuthInstance(
  firebaseConfig: IFirebaseConfig
): Promise<Auth> {
  const app = await getAppInstance(firebaseConfig);
  const { getAuth } = await import('firebase/auth');
  return getAuth(app);
}

export async function getFirestoreInstance(
  firebaseConfig: IFirebaseConfig
): Promise<Firestore> {
  const app = await getAppInstance(firebaseConfig);
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(app);
}

export async function getMessagingInstance(
  firebaseConfig: IFirebaseConfig
): Promise<Messaging> {
  const app = await getAppInstance(firebaseConfig);
  const { getMessaging } = await import('firebase/messaging');
  return getMessaging(app);
}

export async function getStorageInstance(firebaseConfig: IFirebaseConfig): Promise<FirebaseStorage> {
  const app = await getAppInstance(firebaseConfig);
  const { getStorage } = await import('firebase/storage');
  return getStorage(app);
}
