import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/ingredientsSelectors';
import { IngredientDetailsUI } from '@ui';
import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);

  const ingredient = ingredients.find((i: TIngredient) => i._id === id);
  if (!ingredient) {
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
