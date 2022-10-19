type initUser = {
  id?: string;
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  uid?: string;
};

export interface AuthState {
  loading: boolean;
  provider: string;
  isAuthenticated: boolean;
  user: initUser;
  error: string;
}

export interface IUser {
  company: string;
  name: string;
  email: string;
  phone: string;
  uid: string;
}

export interface IUserForm {
  company: string;
  email: string;
  phone: string;
  name: string;
}
