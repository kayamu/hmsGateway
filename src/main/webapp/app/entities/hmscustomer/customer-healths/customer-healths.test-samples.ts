import dayjs from 'dayjs/esm';

import { UNITS } from 'app/entities/enumerations/units.model';
import { BODYFATS } from 'app/entities/enumerations/bodyfats.model';
import { GOALS } from 'app/entities/enumerations/goals.model';

import { ICustomerHealths, NewCustomerHealths } from './customer-healths.model';

export const sampleWithRequiredData: ICustomerHealths = {
  id: 18216,
};

export const sampleWithPartialData: ICustomerHealths = {
  id: 95111,
  currentWeight: 71302,
  measureUnit: UNITS['LB'],
  targetWeight: 7796,
  targerCalorie: 91012,
  targetBodyFat: BODYFATS['HIGH'],
  active: false,
  detail: 'GB Regional Engineer',
};

export const sampleWithFullData: ICustomerHealths = {
  id: 72304,
  name: 'Beauty Home withdrawal',
  contactId: 71633,
  currentWeight: 50779,
  currentHeight: 37030,
  measureUnit: UNITS['LB'],
  activityLevel: 75622,
  targetWeight: 80019,
  targerCalorie: 22500,
  targetBodyFat: BODYFATS['MEDIUM'],
  goal: GOALS['LOSEFAT'],
  active: false,
  detail: 'Fords Shirt',
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewCustomerHealths = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
