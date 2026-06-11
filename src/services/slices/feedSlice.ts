import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false
};

export const getFeedsThunk = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const feedReducer = feedSlice.reducer;
