import { configureStore } from '@reduxjs/toolkit';

import { appSlice, authSlice, thunkSignUp } from './reducers';

export const reduxStore = configureStore({
  reducer: {
    appSlice: appSlice.reducer,
    authSlice: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const actions = {
  appSlice: appSlice.actions,
  authSlice: authSlice.actions,
};

export const thunks = {
  auth: {
    signup: thunkSignUp
  }
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
