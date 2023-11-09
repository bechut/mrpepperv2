import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginPayload } from '@mrpepper/types';
import {
  getAuthInstance,
  getFirestoreInstance,
  getMessagingInstance,
} from '@mrpepper/firebase';
import { User, UserCredential } from 'firebase/auth';
import { lang } from '../../assets/languages';
import { DocumentSnapshot } from 'firebase/firestore';
import { ConfigMoment } from '@mrpepper/moment';

export const loginAsync = createAsyncThunk(
  'signup',
  async (arg: ILoginPayload) => {
    const { email, password, ip } = arg;
    const auth = await getAuthInstance();
    const store = await getFirestoreInstance();
    const messaging = await getMessagingInstance();
    const { getToken } = await import('firebase/messaging');
    const { updateDoc, doc, setDoc, getDoc } = await import(
      'firebase/firestore'
    );
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const m = new ConfigMoment('en');

    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }: UserCredential) => {
        console.log(user);
        if (!user.emailVerified) {
          throw new Error(lang.t('login:error-msg?email_not_verified'));
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
            ip,
            expired: m.add(new Date(), 'hour', 1).toDate(),
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
        message: lang.t('login:success-msg?login_success'),
      }))
      .catch((e) => {
        const msg: { [key: string]: string } = {
          'auth/invalid-email': lang.t(
            'sign-up:error-msg?email_invalid_format'
          ),
          'auth/invalid-login-credentials': lang.t(
            'login:error-msg?pasword_invalid'
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
