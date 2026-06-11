import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
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

export const loginUserThunk = createAsyncThunk<
  { user: TUser },
  { email: string; password: string }
>('auth/login', async (data) => await loginUserApi(data));

export const registerUserThunk = createAsyncThunk<
  { user: TUser },
  { email: string; password: string; name: string }
>('auth/register', async (data) => await registerUserApi(data));

export const updateUserThunk = createAsyncThunk<
  { user: TUser },
  { name: string; email: string; password?: string }
>('auth/update', async (data) => await updateUserApi(data));

export const checkUserAuth = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('auth/checkUser', async (_, { rejectWithValue }) => {
  try {
    const res = await getUserApi();
    return res.user;
  } catch {
    localStorage.removeItem('refreshToken');
    return rejectWithValue('Пользователь не авторизован');
  }
});

export const logoutThunk = createAsyncThunk<boolean>(
  'auth/logout',
  async () => {
    await logoutApi();

    localStorage.removeItem('refreshToken');
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

    return true;
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
        state.error = null;
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
      })

      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка выхода';
      });
  }
});

export const authReducer = authSlice.reducer;
