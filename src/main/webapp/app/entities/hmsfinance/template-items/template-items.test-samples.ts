import dayjs from 'dayjs/esm';

import { DETAILTYPES } from 'app/entities/enumerations/detailtypes.model';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

import { ITemplateItems, NewTemplateItems } from './template-items.model';

export const sampleWithRequiredData: ITemplateItems = {
  id: 67451,
};

export const sampleWithPartialData: ITemplateItems = {
  id: 17623,
  name: 'Andorra',
  explanation: 'indexing Buckinghamshire generate',
  startDate: dayjs('2022-11-10'),
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: ITemplateItems = {
  id: 6909,
  name: 'installation',
  code: 'JSON',
  type: DETAILTYPES['TAXES'],
  valueType: VALUETYPES['AMOUNT'],
  amount: 70993,
  explanation: 'B2C user-facing Future',
  startDate: dayjs('2022-11-11'),
  dueDate: dayjs('2022-11-10'),
  isOnce: true,
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewTemplateItems = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
