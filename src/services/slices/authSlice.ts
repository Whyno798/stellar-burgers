import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

type AuthState = {
  user: TUser | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => await loginUserApi(data)
);

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; name: string }) =>
    await registerUserApi(data)
);

export const updateUserThunk = createAsyncThunk(
  'auth/update',
  async (data: { name: string; email: string; password?: string }) =>
    await updateUserApi(data)
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();

      return response.user;
    } catch (error) {
      localStorage.removeItem('refreshToken');

      return rejectWithValue('Пользователь не авторизован');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка входа';
      })

      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка регистрации';
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка обновления пользователя';
      })

      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
        state.isAuthChecked = true;
      });
  }
});

export const authReducer = authSlice.reducer;
