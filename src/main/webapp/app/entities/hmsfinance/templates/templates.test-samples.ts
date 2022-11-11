import dayjs from 'dayjs/esm';

import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';

import { ITemplates, NewTemplates } from './templates.model';

export const sampleWithRequiredData: ITemplates = {
  id: 70598,
};

export const sampleWithPartialData: ITemplates = {
  id: 8009,
  explanation: 'redundant dynamic',
  isActive: false,
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: ITemplates = {
  id: 99180,
  name: 'unleash 4th',
  type: ITEMTYPES['SERVICE'],
  explanation: 'Savings',
  isActive: true,
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewTemplates = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
