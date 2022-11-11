import dayjs from 'dayjs/esm';

import { IAllergens, NewAllergens } from './allergens.model';

export const sampleWithRequiredData: IAllergens = {
  id: 66913,
};

export const sampleWithPartialData: IAllergens = {
  id: 48922,
  name: 'Polarised withdrawal',
  detail: 'Adaptive out-of-the-box Designer',
};

export const sampleWithFullData: IAllergens = {
  id: 43802,
  name: 'Rustic Incredible Web',
  contactId: 88608,
  ingradientId: 67340,
  active: true,
  detail: 'deposit Manor',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewAllergens = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
