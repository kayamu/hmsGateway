import dayjs from 'dayjs/esm';

import { INVOICETYPES } from 'app/entities/enumerations/invoicetypes.model';

import { IInvoiceTransactions, NewInvoiceTransactions } from './invoice-transactions.model';

export const sampleWithRequiredData: IInvoiceTransactions = {
  id: 39123,
};

export const sampleWithPartialData: IInvoiceTransactions = {
  id: 4609,
  statusChangedDate: dayjs('2022-11-10'),
  transactionDate: dayjs('2022-11-10'),
  type: INVOICETYPES['PAID'],
};

export const sampleWithFullData: IInvoiceTransactions = {
  id: 84936,
  statusChangedDate: dayjs('2022-11-11'),
  transactionDate: dayjs('2022-11-10'),
  type: INVOICETYPES['CANCELLED'],
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewInvoiceTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
