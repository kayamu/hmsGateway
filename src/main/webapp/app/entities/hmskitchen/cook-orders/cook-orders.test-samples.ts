import dayjs from 'dayjs/esm';

import { ICookOrders, NewCookOrders } from './cook-orders.model';

export const sampleWithRequiredData: ICookOrders = {
  id: 9394,
};

export const sampleWithPartialData: ICookOrders = {
  id: 86728,
  kitchenId: 71539,
  customerId: 62139,
  customerCartId: 15083,
  menuItemName: 'SSL Lilangeni',
  menuItemCode: 'Functionality',
  mealId: 83936,
  lineNumber: 73270,
};

export const sampleWithFullData: ICookOrders = {
  id: 67078,
  kitchenId: 89258,
  customerId: 93567,
  customerCartId: 65751,
  menuItemId: 71315,
  menuItemName: 'transparent Maine Loan',
  menuItemCode: 'Chips PNG hub',
  mealId: 79766,
  lineNumber: 20282,
  requestDate: dayjs('2022-11-11'),
  message: 'Designer',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewCookOrders = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
