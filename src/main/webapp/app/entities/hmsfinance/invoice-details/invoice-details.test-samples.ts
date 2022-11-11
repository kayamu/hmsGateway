import dayjs from 'dayjs/esm';

import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';
import { PAYMENTTYPES } from 'app/entities/enumerations/paymenttypes.model';

import { IInvoiceDetails, NewInvoiceDetails } from './invoice-details.model';

export const sampleWithRequiredData: IInvoiceDetails = {
  id: 40578,
};

export const sampleWithPartialData: IInvoiceDetails = {
  id: 46607,
  contactId: 84087,
  paymentType: PAYMENTTYPES['IN'],
  totalCost: 72345,
  nutritionistEarning: 9223,
  fedaralTaxesAmount: 7613,
  fedaralTaxesPercentage: 99579,
  provintionalTaxesPercentage: 91797,
  totalTaxesAmount: 18456,
  totalTaxesPercentage: 60897,
  discountAmount: 17980,
  discountPercentage: 4519,
  addOnAmount: 13441,
  totalAmount: 46773,
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithFullData: IInvoiceDetails = {
  id: 60523,
  contactId: 95627,
  cartId: 95930,
  itemId: 34398,
  itemName: 'system',
  itemCode: 'disintermediate Corporate',
  itemType: ITEMTYPES['SERVICE'],
  paymentType: PAYMENTTYPES['IN'],
  subscriptionStartingDate: dayjs('2022-11-11'),
  subscriptionDurationWeeks: 14225,
  detailAmount: 20525,
  lineNumber: 56740,
  nutritionistId: 24272,
  totalCost: 47096,
  totalProfit: 83417,
  nutritionistEarning: 32327,
  nutritionistPercentage: 52806,
  fedaralTaxesAmount: 80156,
  fedaralTaxesPercentage: 84807,
  provintionalTaxesAmount: 82432,
  provintionalTaxesPercentage: 53585,
  totalTaxesAmount: 63706,
  totalTaxesPercentage: 60767,
  discountAmount: 19431,
  discountPercentage: 49795,
  addOnCode: 'Ball grow sensor',
  addOnAmount: 15445,
  addOnPercentage: 45094,
  totalAmount: 87319,
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewInvoiceDetails = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
