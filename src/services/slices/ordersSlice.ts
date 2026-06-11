import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

import { TOrder } from '../../utils/types';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
  request: boolean;
  modalData: TOrder | null;
  currentOrder: TOrder | null;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false,
  request: false,
  modalData: null,
  currentOrder: null
};

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);

    return response.orders[0];
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setModalData: (state, action: PayloadAction<TOrder>) => {
      state.modalData = action.payload;
    },

    clearModalData: (state) => {
      state.modalData = null;
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(getOrdersThunk.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createOrder.pending, (state) => {
        state.request = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.request = false;
        state.modalData = action.payload.order as unknown as TOrder;
      })

      .addCase(createOrder.rejected, (state) => {
        state.request = false;
      })

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })

      .addCase(getOrderByNumberThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setModalData, clearModalData, clearCurrentOrder } =
  ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
