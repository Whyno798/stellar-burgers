import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { authReducer } from './slices/authSlice';
import { constructorReducer } from './slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  constructor: constructorReducer
});
