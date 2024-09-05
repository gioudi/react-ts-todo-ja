import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from '../../../features/auth/redux/types';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isLogged: false,
};

export const handleLogin = createAsyncThunk('auth/registerNewUser', () => {});

export const handleRegister = createAsyncThunk(
  'auth/registerNewUser',
  () => {}
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
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
        state.user = action?.payload;
        state.token = action?.payload;
        state.loading = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.error = null;
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.error = action.error.message || 'Registration failed';
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
