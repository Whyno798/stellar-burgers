import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import { useDispatch, useSelector } from '../../services/store';

import { selectIngredients } from '../../services/selectors/ingredientsSelectors';
import { selectFeedOrders } from '../../services/selectors/feedSelectors';

import {
  selectOrders,
  selectCurrentOrder
} from '../../services/selectors/ordersSelectors';

import {
  getOrderByNumberThunk,
  clearCurrentOrder
} from '../../services/slices/ordersSlice';

import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  const { number } = useParams();

  const ingredients = useSelector(selectIngredients);

  const feedOrders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectOrders);

  const currentOrder = useSelector(selectCurrentOrder);

  const orderFromStore = [...feedOrders, ...profileOrders].find(
    (item) => item.number === Number(number)
  );

  useEffect(() => {
    if (!orderFromStore && number) {
      dispatch(getOrderByNumberThunk(Number(number)));
    }

    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, number, orderFromStore]);

  const orderData = orderFromStore || currentOrder;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);

          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
