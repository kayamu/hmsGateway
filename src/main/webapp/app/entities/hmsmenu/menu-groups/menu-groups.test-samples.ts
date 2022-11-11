import dayjs from 'dayjs/esm';

import { GOALS } from 'app/entities/enumerations/goals.model';
import { BODYFATS } from 'app/entities/enumerations/bodyfats.model';
import { UNITS } from 'app/entities/enumerations/units.model';

import { IMenuGroups, NewMenuGroups } from './menu-groups.model';

export const sampleWithRequiredData: IMenuGroups = {
  id: 91536,
};

export const sampleWithPartialData: IMenuGroups = {
  id: 43514,
  contactId: 33841,
  salesPrice: 15555,
  explanation: 'virtual Mobility',
  bodyType: BODYFATS['HIGH'],
  activityLevelMin: 1,
  activityLevelMax: 6,
  weightMax: 16174,
  dailyKcalMax: 85118,
  unit: UNITS['LB'],
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: IMenuGroups = {
  id: 53846,
  contactId: 24309,
  name: 'synergy',
  cost: 5263,
  salesPrice: 14219,
  explanation: 'Account',
  goal: GOALS['MAINTAIN'],
  bodyType: BODYFATS['MEDIUM'],
  activityLevelMin: 4,
  activityLevelMax: 7,
  weightMin: 16955,
  weightMax: 63733,
  dailyKcalMin: 71900,
  dailyKcalMax: 55834,
  targetWeightMin: 57937,
  targetWeightMax: 15432,
  unit: UNITS['KG'],
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewMenuGroups = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
