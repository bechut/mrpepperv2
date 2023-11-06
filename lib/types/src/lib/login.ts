import { ILocale } from './router';
export interface ILoginPayload {
  email: string;
  password: string;
  ip: string;
}

export interface ILoginProps extends ILocale {
  email?: string;
}
