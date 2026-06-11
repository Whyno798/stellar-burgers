import { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => !!state.auth.user;
export const selectAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
