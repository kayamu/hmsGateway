import dayjs from 'dayjs/esm';

import { IMenuSuggestions, NewMenuSuggestions } from './menu-suggestions.model';

export const sampleWithRequiredData: IMenuSuggestions = {
  id: 17485,
};

export const sampleWithPartialData: IMenuSuggestions = {
  id: 7736,
  name: 'Outdoors Kyrgyz',
  nutritionistId: 26044,
  customerId: 29639,
  notes: 'Rustic',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: IMenuSuggestions = {
  id: 17448,
  name: 'Decentralized',
  nutritionistId: 54373,
  customerId: 26816,
  menuGroupId: 71749,
  notes: 'visionary visionary Response',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewMenuSuggestions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
