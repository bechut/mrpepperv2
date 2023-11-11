import appSlice from './app';

import { IApp } from './app';

export type IReducers = IApp['state'];
export type IActions = IApp['action'];

export const slices = [appSlice];
