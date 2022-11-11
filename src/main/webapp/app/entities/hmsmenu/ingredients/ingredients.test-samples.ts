import dayjs from 'dayjs/esm';

import { IIngredients, NewIngredients } from './ingredients.model';

export const sampleWithRequiredData: IIngredients = {
  id: 4018,
};

export const sampleWithPartialData: IIngredients = {
  id: 90968,
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithFullData: IIngredients = {
  id: 97628,
  name: 'Toys',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewIngredients = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
