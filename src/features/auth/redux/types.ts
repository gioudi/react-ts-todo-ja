export interface AuthState {
  user: null | User;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLogged: boolean;
}

export interface User {
  id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}