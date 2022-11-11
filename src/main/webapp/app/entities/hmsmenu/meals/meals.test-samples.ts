import dayjs from 'dayjs/esm';

import { IMeals, NewMeals } from './meals.model';

export const sampleWithRequiredData: IMeals = {
  id: 19578,
};

export const sampleWithPartialData: IMeals = {
  id: 7618,
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: IMeals = {
  id: 12580,
  name: 'Shoes Naira Terrace',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewMeals = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
