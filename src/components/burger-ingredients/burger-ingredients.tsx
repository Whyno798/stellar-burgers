import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/ingredientsSelectors';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import styles from '../ui/burger-ingredients/burger-ingredients.module.css';
import { TIngredient } from '../../utils/types';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(selectIngredients);

  const buns = ingredients.filter((i: TIngredient) => i.type === 'bun');

  const sauces = ingredients.filter((i: TIngredient) => i.type === 'sauce');

  const mains = ingredients.filter((i: TIngredient) => i.type === 'main');

  return (
    <section className={styles.container}>
      <h2 className='text text_type_main-medium'>Булки</h2>

      {buns.map((bun: TIngredient) => (
        <BurgerIngredient key={bun._id} ingredient={bun} count={0} />
      ))}

      <h2 className='text text_type_main-medium'>Соусы</h2>

      {sauces.map((sauce: TIngredient) => (
        <BurgerIngredient key={sauce._id} ingredient={sauce} count={0} />
      ))}

      <h2 className='text text_type_main-medium'>Начинки</h2>

      {mains.map((main: TIngredient) => (
        <BurgerIngredient key={main._id} ingredient={main} count={0} />
      ))}
    </section>
  );
};
