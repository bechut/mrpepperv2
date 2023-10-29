import { configureStore } from '@reduxjs/toolkit';

import { appSlice } from './reducers';

export const reduxStore = configureStore({
  reducer: {
    appSlice: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const actions = {
  appSlice: appSlice.actions,
};

export const thunks = {};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
