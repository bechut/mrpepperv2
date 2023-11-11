import { IFirebaseConfig } from '@mrpepper/types';
import {
  getAppInstance,
  getAuthInstance,
  getFirestoreInstance,
  getStorageInstance,
} from './firebase';
import { getApps } from 'firebase/app';

describe('Firebase instance', () => {
  const firebaseConfig: IFirebaseConfig = {
    apiKey: process.env['VITE_FIREBASE_API_KEY'] || '',
    authDomain: process.env['VITE_FIREBASE_AUTH_DOMAIN'] || '',
    projectId: process.env['VITE_FIREBASE_PROJECT_ID'] || '',
    storageBucket: process.env['VITE_FIREBASE_STORAGE_BUCKET'] || '',
    messagingSenderId: process.env['VITE_FIREBASE_MESSAGE_SEND_ID'] || '',
    appId: process.env['VITE_FIREBASE_APP_ID'] || '',
    measurementId: process.env['VITE_MEASUREMENT_ID'] || '',
    appName: process.env['VITE_FIREBASE_NAME'] || '',
  };

  it('return firebase app instance', async () => {
    const app = await getAppInstance(firebaseConfig);
    expect(app.name).toBe(firebaseConfig.appName);
    expect(getApps().length).toBe(1);
  });

  it('return firebase firestore instance', async () => {
    const fireStore = await getFirestoreInstance(firebaseConfig);
    expect(fireStore.app.name).toBe(firebaseConfig.appName);
  });

  it('return firebase auth instance', async () => {
    const auth = await getAuthInstance(firebaseConfig);
    expect(auth.app.name).toBe(firebaseConfig.appName);
  });

  it('return firebase storage instance', async () => {
    const storage = await getStorageInstance(firebaseConfig);
    expect(storage.app.name).toBe(firebaseConfig.appName);
  });
});
