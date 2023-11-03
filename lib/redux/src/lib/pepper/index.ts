import { configStoreRedux } from '../store';
import appSlice from './reducers/app.reducer';
import { IActions, IStates } from './reducers';

const initStore = new configStoreRedux<IStates, IActions>([appSlice]);

export const pepperStore = initStore.getStore();
export const pepperActions = initStore.getActions();
export type pepperRootState = ReturnType<typeof pepperStore.getState>;
export type pepperAppDispatch = typeof pepperStore.dispatch;
