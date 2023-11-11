import { ILocale } from './router';

export interface ISignUpPayload {
  email: string;
  username: string;
  password: string;
}

export interface ISignUpProps extends ILocale {
  email?: string;
}

export interface IInputProps {
  label: string;
  placeholder?: string;
}

export interface IEmailInputProps extends IInputProps {
  msg: {
    error: {
      required: string;
      invalid: string;
    };
  };
}

export interface IUsernameInputProps extends IInputProps {
  msg: {
    error: {
      required: string;
    };
  };
}

export interface IPasswordInputProps extends IInputProps {
  msg: {
    error: {
      required: string;
      len: string;
    };
  };
}
