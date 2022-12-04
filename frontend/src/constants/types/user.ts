export type initUser = {
  id?: string;
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export interface AuthState {
  loading: boolean;
  provider: string;
  isAuthenticated: boolean;
  user: initUser;
  error: string;
}

export interface IUser {
  id?: string;
  uid: string;
  company: string;
  name: string;
  email: string;
  phone: string;
}

export interface IUserForm {
  company: string;
  email: string;
  phone: string;
  name: string;
}
