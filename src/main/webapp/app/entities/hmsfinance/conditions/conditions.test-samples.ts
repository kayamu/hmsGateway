import dayjs from 'dayjs/esm';

import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

import { IConditions, NewConditions } from './conditions.model';

export const sampleWithRequiredData: IConditions = {
  id: 67012,
};

export const sampleWithPartialData: IConditions = {
  id: 20390,
  name: 'Trail intranet',
  type: VALUETYPES['AMOUNT'],
};

export const sampleWithFullData: IConditions = {
  id: 28534,
  name: 'teal bypassing',
  type: VALUETYPES['PERCENTAGE'],
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewConditions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
