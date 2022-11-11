import dayjs from 'dayjs/esm';

import { PAYMENTTYPES } from 'app/entities/enumerations/paymenttypes.model';
import { PAYMENTSTATUS } from 'app/entities/enumerations/paymentstatus.model';

import { IPayments, NewPayments } from './payments.model';

export const sampleWithRequiredData: IPayments = {
  id: 66322,
};

export const sampleWithPartialData: IPayments = {
  id: 43677,
  refNumber: 'Gorgeous',
  paymentType: PAYMENTTYPES['IN'],
  amount: 53697,
  status: PAYMENTSTATUS['WAITING'],
};

export const sampleWithFullData: IPayments = {
  id: 62746,
  refNumber: 'dynamic purple expedite',
  paymentType: PAYMENTTYPES['IN'],
  contactId: 78683,
  explanation: 'hard',
  operationDate: dayjs('2022-11-11'),
  amount: 11980,
  status: PAYMENTSTATUS['PAID'],
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewPayments = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
