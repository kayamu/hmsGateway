import dayjs from 'dayjs/esm';

import { DETAILTYPES } from 'app/entities/enumerations/detailtypes.model';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

import { ISubItems, NewSubItems } from './sub-items.model';

export const sampleWithRequiredData: ISubItems = {
  id: 9313,
};

export const sampleWithPartialData: ISubItems = {
  id: 51612,
  percentage: 15231,
  baseValue: 14197,
  type: DETAILTYPES['FEDERALTAXES'],
  valueType: VALUETYPES['AMOUNT'],
  templateItemId: 70313,
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: ISubItems = {
  id: 60701,
  name: 'COM mobile regional',
  actualValue: 32017,
  percentage: 84400,
  baseValue: 88406,
  type: DETAILTYPES['EXPENSES'],
  valueType: VALUETYPES['AMOUNT'],
  calculatedValue: 57379,
  templateItemId: 24938,
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewSubItems = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
