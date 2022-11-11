import dayjs from 'dayjs/esm';

import { INutriens, NewNutriens } from './nutriens.model';

export const sampleWithRequiredData: INutriens = {
  id: 73084,
};

export const sampleWithPartialData: INutriens = {
  id: 40855,
  name: 'TCP',
  fat: 20641,
};

export const sampleWithFullData: INutriens = {
  id: 54736,
  name: 'indexing optical Plastic',
  protein: 1900,
  carb: 38606,
  fat: 99978,
  kcal: 75711,
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewNutriens = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
