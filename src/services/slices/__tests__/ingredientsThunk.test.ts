import { ingredientsReducer } from '../ingredientsSlice';

import { getIngredientsThunk } from '../ingredientsSlice';

const mockIngredients = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

describe('ingredientsThunk', () => {
  test('pending', () => {
    const state = ingredientsReducer(undefined, {
      type: getIngredientsThunk.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled', () => {
    const state = ingredientsReducer(undefined, {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    });

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('rejected', () => {
    const state = ingredientsReducer(undefined, {
      type: getIngredientsThunk.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
