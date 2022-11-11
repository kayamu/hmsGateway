import dayjs from 'dayjs/esm';

import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';

import { IItems, NewItems } from './items.model';

export const sampleWithRequiredData: IItems = {
  id: 93271,
};

export const sampleWithPartialData: IItems = {
  id: 15940,
  name: 'Kids',
  itemId: 23603,
  itemCode: 'programming Money',
  cost: 69816,
};

export const sampleWithFullData: IItems = {
  id: 68481,
  name: 'transmitting online',
  itemId: 88721,
  itemCode: 'payment Group Director',
  type: ITEMTYPES['PRODUCT'],
  explain: 'infrastructure Versatile',
  cost: 98408,
  price: 25185,
  isActive: false,
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewItems = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
