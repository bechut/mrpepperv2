import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { ISignUpPayload } from '@mrpepper/types';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getAuthInstance, getFirestoreInstance } from '@mrpepper/firebase';
import { lang } from '../../locales';

type IState = {
  loading: boolean;
  success: boolean;
};

const initialState: IState = { loading: false, success: false };

export const thunkSignUp = createAsyncThunk('signup', async (arg: ISignUpPayload) => {
  const { email, password, username } = arg;
  const auth = await getAuthInstance();
  const store = await getFirestoreInstance();
  const { collection, doc, setDoc } = await import('firebase/firestore');

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
      message: lang.t('sign-up:success-msg?create_account_success'),
    }))
    .catch((e) => {
      if (auth.currentUser) deleteUser(auth.currentUser);
      const msg: { [key: string]: string } = {
        'Firebase: Error (auth/email-already-in-use).': lang.t(
          'sign-up:error-msg?email_in_use'
        ),
        'auth/invalid-email': lang.t('sign-up:error-msg?email_invalid_format'),
      };
      throw new Error(
        JSON.stringify({
          status: false,
          message:
            msg[e.message] ||
            msg[e.code] ||
            e.messasge ||
            lang.t('sign-up:error-msg?unknow'),
        })
      );
    });
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    reset: (state: IState) => {
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (buider: ActionReducerMapBuilder<IState>) => {
    // addCase before addMatcher
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('pending') !== -1;
      },
      (state: IState) => {
        state.loading = true;
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('fulfilled') !== -1;
      },
      (state: IState) => {
        state.loading = true;
        state.success = true;
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('rejected') !== -1;
      },
      (state: IState) => {
        state.loading = false;
      }
    );
  },
});

export default authSlice;
