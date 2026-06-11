import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';

import {
  selectConstructorBun,
  selectConstructorItems
} from '../../services/selectors/constructorSelectors';

import { selectIsAuth } from '../../services/selectors/authSelectors';

import {
  selectOrderRequest,
  selectOrderModalData
} from '../../services/selectors/ordersSelectors';

import { createOrder, clearModalData } from '../../services/slices/ordersSlice';

import { clearConstructor } from '../../services/slices/constructorSlice';

import { BurgerConstructorUI } from '../ui/burger-constructor/burger-constructor';

import { TConstructorIngredient } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorItems);

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const price = useMemo(() => {
    const ingredientsPrice = (ingredients ?? []).reduce(
      (sum, item) => sum + item.price,
      0
    );

    const bunPrice = bun ? bun.price * 2 : 0;

    return ingredientsPrice + bunPrice;
  }, [ingredients, bun]);

  const handleOrderClick = async () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (!bun || ingredients.length === 0) return;

    const ids = [
      bun._id,
      ...ingredients.map((i: TConstructorIngredient) => i._id),
      bun._id
    ];

    const resultAction = await dispatch(createOrder(ids));

    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(clearConstructor());
    }
  };

  const closeOrderModal = () => {
    dispatch(clearModalData());
  };

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={{ bun, ingredients }}
      orderRequest={orderRequest}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
