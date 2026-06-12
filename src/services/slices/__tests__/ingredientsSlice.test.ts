import { ingredientsReducer, getIngredientsThunk } from '../ingredientsSlice';

describe('ingredientsSlice', () => {
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

  test('should return initial state for unknown action', () => {
    const state = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  test('should handle pending', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsThunk.pending('', undefined)
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('should handle fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsThunk.fulfilled(mockIngredients, '', undefined)
    );

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  test('should handle rejected', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsThunk.rejected(null, '', undefined)
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});
