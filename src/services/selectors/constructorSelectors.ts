import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.constructor.ingredients;

export const selectConstructorBun = (state: RootState) => state.constructor.bun;
