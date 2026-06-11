import { FC } from 'react';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/constructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { TConstructorIngredient } from '../../services/slices/constructorSlice';

type TBurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
};

export const BurgerConstructorElement: FC<TBurgerConstructorElementProps> = ({
  ingredient,
  index,
  totalItems
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient(ingredient.id));
  };

  const handleMoveUp = () => {
    dispatch(moveIngredientUp(index));
  };

  const handleMoveDown = () => {
    dispatch(moveIngredientDown(index));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleDelete}
    />
  );
};
