import dayjs from 'dayjs/esm';

import { IRecipies, NewRecipies } from './recipies.model';

export const sampleWithRequiredData: IRecipies = {
  id: 9845,
};

export const sampleWithPartialData: IRecipies = {
  id: 63074,
  recipe: 'Licensed Bedfordshire orchestrate',
};

export const sampleWithFullData: IRecipies = {
  id: 99194,
  name: 'Toys Savings bandwidth',
  recipe: 'invoice intuitive',
  explanation: 'Lebanon Shilling',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewRecipies = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
