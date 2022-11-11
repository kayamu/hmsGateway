import dayjs from 'dayjs/esm';

import { KITCHENTYPES } from 'app/entities/enumerations/kitchentypes.model';

import { ICookTransactions, NewCookTransactions } from './cook-transactions.model';

export const sampleWithRequiredData: ICookTransactions = {
  id: 40518,
};

export const sampleWithPartialData: ICookTransactions = {
  id: 17275,
  transactionDate: dayjs('2022-11-10'),
  type: KITCHENTYPES['CANCELLED'],
};

export const sampleWithFullData: ICookTransactions = {
  id: 49407,
  kitchenId: 77838,
  statusChangedDate: dayjs('2022-11-11'),
  transactionDate: dayjs('2022-11-10'),
  type: KITCHENTYPES['ONTHEWAY'],
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewCookTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
