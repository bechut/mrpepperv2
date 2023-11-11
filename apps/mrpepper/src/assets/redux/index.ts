import { configStoreRedux } from '@mrpepper/redux';
import { IActions, IReducers, slices } from './reducers';

export const init = new configStoreRedux<IReducers, IActions>(slices);

export const store = init.getStore();
export const actions = init.getActions();
export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;