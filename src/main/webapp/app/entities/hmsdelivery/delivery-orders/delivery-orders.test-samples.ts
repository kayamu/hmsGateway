import dayjs from 'dayjs/esm';

import { IDeliveryOrders, NewDeliveryOrders } from './delivery-orders.model';

export const sampleWithRequiredData: IDeliveryOrders = {
  id: 40377,
};

export const sampleWithPartialData: IDeliveryOrders = {
  id: 83484,
  deliveryId: 98540,
  invoiceNumber: 'bus Metal',
  contactId: 26128,
  contactAddressId: 70893,
  contactCartId: 92414,
  menuItemId: 13034,
  menuItemCode: 'wireless JSON Car',
};

export const sampleWithFullData: IDeliveryOrders = {
  id: 3287,
  deliveryId: 30065,
  invoiceNumber: 'Shirt Soft',
  contactId: 90706,
  contactName: 'indexing Practical',
  contactAddressId: 11257,
  contactCartId: 92076,
  deliveryDate: dayjs('2022-11-11'),
  requestDate: dayjs('2022-11-11'),
  menuItemId: 33990,
  menuItemName: 'virtual Bedfordshire matrix',
  menuItemCode: 'Soap Personal multi-byte',
  lineNumber: 70449,
  detail: 'Michigan Global',
  message: 'Corporate',
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewDeliveryOrders = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
