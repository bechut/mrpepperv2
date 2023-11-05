interface IInputLang {
  label: string;
  placeholder?: string;
}

export interface IEmailInput {
  lang: {
    msg_email_invalid: string;
    msg_email_empty: string;
  } & IInputLang;
}

export interface IUsernameInput {
  lang: {
    msg_username_empty: string;
  } & IInputLang;
}

export interface IPasswordInput {
    lang: {
      msg_password_empty: string;
      msg_password_length: string;
    } & IInputLang;
  }
  