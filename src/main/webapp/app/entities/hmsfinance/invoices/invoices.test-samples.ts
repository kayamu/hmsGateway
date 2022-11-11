import dayjs from 'dayjs/esm';

import { INVOICETYPES } from 'app/entities/enumerations/invoicetypes.model';

import { IInvoices, NewInvoices } from './invoices.model';

export const sampleWithRequiredData: IInvoices = {
  id: 18587,
};

export const sampleWithPartialData: IInvoices = {
  id: 20798,
  contactId: 6276,
  contactAddressId: 75993,
  requestDate: dayjs('2022-11-11'),
  contactName: 'Group',
  invoiceDate: dayjs('2022-11-11'),
  totalCost: 20489,
  totalAmount: 56308,
  provintionalTaxesAmount: 60748,
  addOnAmount: 52697,
  message: 'Movies Card compress',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: IInvoices = {
  id: 73052,
  invoiceNumber: 'mobile compressing Djibouti',
  contactId: 44387,
  contactAddressId: 3982,
  contactBillingAdrId: 84192,
  cartId: 3552,
  type: INVOICETYPES['PAID'],
  requestDate: dayjs('2022-11-11'),
  contactName: 'process Coordinator',
  invoiceDate: dayjs('2022-11-10'),
  lastTranactionId: 33407,
  totalCost: 30196,
  totalProfit: 35654,
  totalAmount: 71652,
  totalTaxes: 81289,
  fedaralTaxesAmount: 21921,
  provintionalTaxesAmount: 78662,
  discountsAmount: 68332,
  addOnAmount: 40103,
  message: 'Forks',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewInvoices = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
