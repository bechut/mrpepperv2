import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignUpPayload } from '@mrpepper/types';
import { getAuthInstance, getFirestoreInstance } from '@mrpepper/firebase';
import { UserCredential, User } from 'firebase/auth';
import { lang } from '../../assets/languages';

export const signupAsync = createAsyncThunk(
  'signup',
  async (arg: ISignUpPayload) => {
    const { email, password, username } = arg;

    const config = {
        apiKey: import.meta.env['VITE_FIREBASE_API_KEY'] || '',
        authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'] || '',
        projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'] || '',
        storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'] || '',
        messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGE_SEND_ID'] || '',
        appId: import.meta.env['VITE_FIREBASE_APP_ID'] || '',
        measurementId: import.meta.env['VITE_MEASUREMENT_ID'] || '',
        appName: import.meta.env['VITE_FIREBASE_NAME'] || '',
    }

    const auth = await getAuthInstance(config);
    const store = await getFirestoreInstance(config);
    const { collection, doc, setDoc } = await import('firebase/firestore');
    const {
      createUserWithEmailAndPassword,
      updateProfile,
      sendEmailVerification,
      signOut,
      deleteUser,
    } = await import('firebase/auth');

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (credential: UserCredential) => {
        const user = credential.user;
        await updateProfile(user, {
          displayName: username,
        });
        return user;
      })
      .then(async (user: User) => {
        await setDoc(doc(collection(store, 'users'), user.uid), {
          email,
          displayName: username,
          photoURL: '',
          avatar: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return user;
      })
      .then((user: User) => sendEmailVerification(user))
      .then(async () => await signOut(auth))
      .then(() => ({
        status: true,
        message: lang.t('sign-up:form-success-msg?create_account_success'),
      }))
      .catch((e) => {
        if (auth.currentUser) deleteUser(auth.currentUser);
        const msg: { [key: string]: string } = {
          'Firebase: Error (auth/email-already-in-use).': lang.t(
            'sign-up:form-err-msg?email_in_use'
          ),
          'auth/invalid-email': lang.t(
            'sign-up:form-err-msg?email_invalid'
          ),
        };
        throw new Error(
          JSON.stringify({
            status: false,
            message:
              msg[e.message] ||
              msg[e.code] ||
              e.message ||
              lang.t('sign-up:error-msg?unknow'),
          })
        );
      });
  }
);
