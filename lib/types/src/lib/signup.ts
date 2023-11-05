import { ILocale } from './router';
export interface ISignUpPayload {
  email: string;
  username: string;
  password: string;
}

export interface ISignUpProps extends ILocale {
  email?: string;
}
