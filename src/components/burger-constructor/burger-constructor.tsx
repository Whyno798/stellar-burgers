import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorItems
} from '../../services/selectors/constructorSelectors';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectConstructorBun) ?? null;

  const ingredients = useSelector(selectConstructorItems) ?? [];

  const price = useMemo(() => {
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );

    const bunPrice = bun ? bun.price * 2 : 0;

    return ingredientsPrice + bunPrice;
  }, [ingredients, bun]);

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={{
        bun,
        ingredients
      }}
      orderRequest={false}
      orderModalData={null}
      onOrderClick={() => {}}
      closeOrderModal={() => {}}
    />
  );
};
