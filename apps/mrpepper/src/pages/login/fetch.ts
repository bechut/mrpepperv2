import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginPayload } from '@mrpepper/types';
import {
  getAuthInstance,
  getFirestoreInstance,
  getMessagingInstance,
} from '@mrpepper/firebase';
import { UserCredential, User } from 'firebase/auth';
import { lang } from '../../assets/languages';
import { DocumentSnapshot } from 'firebase/firestore';

export const loginAsync = createAsyncThunk(
  'login',
  async (arg: ILoginPayload) => {
    const { email, password } = arg;

    const config = {
      apiKey: import.meta.env['VITE_FIREBASE_API_KEY'] || '',
      authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'] || '',
      projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'] || '',
      storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'] || '',
      messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGE_SEND_ID'] || '',
      appId: import.meta.env['VITE_FIREBASE_APP_ID'] || '',
      measurementId: import.meta.env['VITE_MEASUREMENT_ID'] || '',
      appName: import.meta.env['VITE_FIREBASE_NAME'] || '',
    };

    const auth = await getAuthInstance(config);
    const store = await getFirestoreInstance(config);
    const messaging = await getMessagingInstance(config);
    const { getToken } = await import('firebase/messaging');
    const { updateDoc, doc, getDoc, setDoc } = await import('firebase/firestore');
    const { signInWithEmailAndPassword } = await import('firebase/auth');

    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }: UserCredential) => {
        if (!user.emailVerified) {
          throw new Error(lang.t('login:form-err-msg?email_not_verified'));
        }
        return user;
      })
      .then(async (user: User) => {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env['VITE_MESSAGE_ID'],
        }).then((x) => x);
        return { user, token };
      })
      .then(async ({ user, token }: { user: User; token: string }) => {
        return {
          session: getDoc(doc(store, 'sessions', user.uid)).then(
            (x: DocumentSnapshot) => ({
              ...x.data(),
              uid: x.id,
            })
          ),
          user,
          token,
        };
      })
      .then(
        async ({
          user,
          token,
          session,
        }: {
          user: User;
          token: string;
          session: any;
        }) => {
          const payload = {
            email: user.email,
            token: user.refreshToken,
            messagingToken: token,
            ua: window.navigator.userAgent,
            // expired: m.add(new Date(), 'hour', 1).toDate(),
            user: doc(store, 'users', user.uid),
          };
          if (session.exists) {
            await updateDoc(doc(store, 'sessions', user.uid), payload);
          } else {
            await setDoc(doc(store, 'sessions', user.uid), payload);
          }
          return user;
        }
      )
      .then(() => ({
        status: true,
        message: lang.t('login:form-success-msg?log_in_success'),
      }))
      .catch((e) => {
        const msg: { [key: string]: string } = {
          'auth/invalid-email': lang.t(
            'sign-up:form-err-msg?email_invalid'
          ),
          'auth/invalid-login-credentials': lang.t(
            'login:form-err-msg?password_invalid'
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
