import dayjs from 'dayjs/esm';

import { IMealIngredients, NewMealIngredients } from './meal-ingredients.model';

export const sampleWithRequiredData: IMealIngredients = {
  id: 53981,
};

export const sampleWithPartialData: IMealIngredients = {
  id: 61090,
  name: 'Jewelery teal navigate',
};

export const sampleWithFullData: IMealIngredients = {
  id: 37134,
  name: 'Accounts Unbranded',
  amount: 'multi-state deposit orchestrate',
  unit: 'Awesome Arizona',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewMealIngredients = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
