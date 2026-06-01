import { RootState } from '../store';

export const selectOrders = (state: RootState) => state.orders.orders;

export const selectOrdersLoading = (state: RootState) => state.orders.loading;

export const selectOrderRequest = (state: RootState) => state.orders.request;

export const selectOrderModalData = (state: RootState) =>
  state.orders.modalData;

export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
