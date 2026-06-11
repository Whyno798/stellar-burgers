import { RootState } from '../store';

export const selectConstructorState = (state: RootState) =>
  state.burgerConstructor;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.ingredients;
