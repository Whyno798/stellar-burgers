jest.mock('nanoid', () => ({
  nanoid: () => 'test-id'
}));

import {
  constructorReducer,
  addIngredient,
  setBun,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../constructorSlice';

const bun = {
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
};

const mainIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 5,
  calories: 150,
  price: 80,
  image: '',
  image_large: '',
  image_mobile: '',
  id: 'ingredient-1'
};

const secondIngredient = {
  _id: '3',
  name: 'Соус',
  type: 'sauce',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 20,
  price: 10,
  image: '',
  image_large: '',
  image_mobile: '',
  id: 'ingredient-2'
};

describe('constructorSlice', () => {
  test('should return initial state for unknown action', () => {
    const state = constructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('should add bun', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun?._id).toBe(bun._id);
  });

  test('should add ingredient', () => {
    const ingredient = {
      ...mainIngredient
    };

    const state = constructorReducer(undefined, addIngredient(ingredient));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe(ingredient._id);
  });

  test('should set bun', () => {
    const state = constructorReducer(undefined, setBun(bun));

    expect(state.bun).toEqual(bun);
  });

  test('should remove ingredient', () => {
    const initialState = {
      bun: null,
      ingredients: [mainIngredient, secondIngredient]
    };

    const state = constructorReducer(
      initialState,
      removeIngredient('ingredient-1')
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toBe('ingredient-2');
  });

  test('should move ingredient up', () => {
    const initialState = {
      bun: null,
      ingredients: [mainIngredient, secondIngredient]
    };

    const state = constructorReducer(initialState, moveIngredientUp(1));

    expect(state.ingredients[0].id).toBe('ingredient-2');
    expect(state.ingredients[1].id).toBe('ingredient-1');
  });

  test('should move ingredient down', () => {
    const initialState = {
      bun: null,
      ingredients: [mainIngredient, secondIngredient]
    };

    const state = constructorReducer(initialState, moveIngredientDown(0));

    expect(state.ingredients[0].id).toBe('ingredient-2');
    expect(state.ingredients[1].id).toBe('ingredient-1');
  });

  test('should clear constructor', () => {
    const initialState = {
      bun,
      ingredients: [mainIngredient]
    };

    const state = constructorReducer(initialState, clearConstructor());

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
