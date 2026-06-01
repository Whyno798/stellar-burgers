import { FC, useMemo, useRef, useState } from 'react';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/ingredientsSelectors';

import { BurgerIngredientsUI } from '@components';
import { TIngredient, TTabMode } from '@utils-types';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(selectIngredients);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const buns = useMemo(
    () => ingredients.filter((i: TIngredient) => i.type === 'bun'),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((i: TIngredient) => i.type === 'main'),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((i: TIngredient) => i.type === 'sauce'),
    [ingredients]
  );

  const bunsRef = useRef<HTMLHeadingElement | null>(null);
  const mainsRef = useRef<HTMLHeadingElement | null>(null);
  const saucesRef = useRef<HTMLHeadingElement | null>(null);

  const onTabClick = (value: string) => {
    const tab = value as TTabMode;

    setCurrentTab(tab);

    const map: Record<TTabMode, HTMLElement | null> = {
      bun: bunsRef.current,
      main: mainsRef.current,
      sauce: saucesRef.current
    };

    map[tab]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      onTabClick={onTabClick}
      bunsRef={(node?: Element | null) => {
        bunsRef.current = node as HTMLHeadingElement | null;
      }}
      mainsRef={(node?: Element | null) => {
        mainsRef.current = node as HTMLHeadingElement | null;
      }}
      saucesRef={(node?: Element | null) => {
        saucesRef.current = node as HTMLHeadingElement | null;
      }}
      titleBunRef={bunsRef}
      titleMainRef={mainsRef}
      titleSaucesRef={saucesRef}
    />
  );
};
