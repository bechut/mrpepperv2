import { ILocale } from './router';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginProps extends ILocale {
  email?: string;
}