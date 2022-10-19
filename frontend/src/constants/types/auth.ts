export interface ILogInForm {
  email: string;
  password: string;
  extraError?: string;
}

export interface ISignInForm {
  email: string;
  company: string;
  name: string;
  phone: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}
