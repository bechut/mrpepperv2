import appSlice, { IApp } from './app';
import authSlice, { IAuth } from './auth';

export type IReducers = IApp['state'] & IAuth['state'];
export type IActions = IApp['action'] & IAuth['action'];

export const slices = [appSlice, authSlice];
