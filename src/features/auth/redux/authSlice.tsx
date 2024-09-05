import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, User, LoginPayload } from './types';
import apiClient from '../../../api';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isLogged: false,
};



export const handleLogin = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  const response = await apiClient.post('/login', payload); 
  return response.data;
});

export const handleRegister = createAsyncThunk('auth/register', async (payload: LoginPayload) => {
  const response = await apiClient.post('/register', payload);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLogged = false;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogged = true;
        state.loading = false;
        localStorage.setItem('authToken', action.payload.token);
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.loading = false;
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogged = true;
        state.loading = false;
        localStorage.setItem('authToken', action.payload.token);
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.error = action.error.message || 'Registration failed';
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
