import dayjs from 'dayjs/esm';

import { DAYS } from 'app/entities/enumerations/days.model';
import { REPAST } from 'app/entities/enumerations/repast.model';

import { IMenus, NewMenus } from './menus.model';

export const sampleWithRequiredData: IMenus = {
  id: 44347,
};

export const sampleWithPartialData: IMenus = {
  id: 98112,
  name: 'even-keeled',
  menuDay: DAYS['MONDAY'],
  menuTime: REPAST['BREAKFAST'],
  explanation: 'Borders',
};

export const sampleWithFullData: IMenus = {
  id: 82589,
  name: 'Illinois utilize value-added',
  menuDay: DAYS['MONDAY'],
  menuTime: REPAST['DINNER'],
  contactId: 96306,
  cost: 98824,
  salesPrice: 41322,
  explanation: 'wireless',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewMenus = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
