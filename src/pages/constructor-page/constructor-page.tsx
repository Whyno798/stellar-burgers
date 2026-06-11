import { FC } from 'react';

import { useSelector, useDispatch } from '../../services/store';

import { selectIngredients } from '../../services/selectors/ingredientsSelectors';
import { selectIngredientsLoading } from '../../services/selectors/ingredientsSelectors';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

import styles from './constructor-page.module.css';
import { Preloader } from '@ui';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);

  if (isLoading) return <Preloader />;

  return (
    <main className={styles.containerMain}>
      <h1 className='text text_type_main-large mt-10 mb-5 pl-5'>
        Соберите бургер
      </h1>

      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
