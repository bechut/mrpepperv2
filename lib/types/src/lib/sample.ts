import { ILocale } from './router';

export interface ISample {
  sample?: string;
}

export interface ISampleProps extends ILocale {
  sample?: string;
}
