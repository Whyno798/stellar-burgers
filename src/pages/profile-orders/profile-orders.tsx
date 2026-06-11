import { FC, useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

import { getOrdersThunk } from '../../services/slices/ordersSlice';

import { selectOrders } from '../../services/selectors/ordersSelectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
