import { IApp } from './app.reducer';
import { IAuth } from './auth.reducer';

export type IStates = IApp['state'] & IAuth['state'];
export type IActions = IApp['action'] & IAuth['action'];
