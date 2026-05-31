import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';
import { BurgerIngredientUI } from '@ui';
import { TIngredient } from '../../utils/types';
import { Location } from 'react-router-dom';

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  count: number;
};

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  ingredient,
  count
}) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addIngredient({
        ...ingredient,
        id: crypto.randomUUID()
      })
    );
  };

  const locationState = {} as {
    background: Location;
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      handleAdd={handleAdd}
      locationState={locationState}
    />
  );
};
