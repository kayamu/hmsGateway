import dayjs from 'dayjs/esm';

import { DELIVERYTYPES } from 'app/entities/enumerations/deliverytypes.model';

import { IDeliveryTransactions, NewDeliveryTransactions } from './delivery-transactions.model';

export const sampleWithRequiredData: IDeliveryTransactions = {
  id: 80611,
};

export const sampleWithPartialData: IDeliveryTransactions = {
  id: 20335,
  transactionDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: IDeliveryTransactions = {
  id: 60881,
  statusChangedDate: dayjs('2022-11-11'),
  transactionDate: dayjs('2022-11-10'),
  type: DELIVERYTYPES['ONTHEWAY'],
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewDeliveryTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
