import {
  configureStore,
  type Slice,
  type Reducer,
  AnyAction,
} from '@reduxjs/toolkit';

export class configStoreRedux<TReducer, TAction> {
  private reducers: TReducer | object = {};
  private actions: TAction | object = {};

  constructor(slices: Slice[]) {
    this.reducers = slices.reduce(
      (a, slice) => ({ ...a, [slice.name]: slice.reducer }),
      {}
    );

    this.actions = slices.reduce(
      (a, slice) => ({ ...a, [slice.name]: slice.actions }),
      {}
    );
  }

  getStore() {
    return configureStore({
      reducer: this.reducers as Reducer<TReducer, AnyAction>,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  }

  getActions() {
    return this.actions as TAction;
  }
}
