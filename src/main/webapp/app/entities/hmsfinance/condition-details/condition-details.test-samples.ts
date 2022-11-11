import dayjs from 'dayjs/esm';

import { FIELDS } from 'app/entities/enumerations/fields.model';
import { OPERATORS } from 'app/entities/enumerations/operators.model';
import { LOGICTYPES } from 'app/entities/enumerations/logictypes.model';

import { IConditionDetails, NewConditionDetails } from './condition-details.model';

export const sampleWithRequiredData: IConditionDetails = {
  id: 96521,
};

export const sampleWithPartialData: IConditionDetails = {
  id: 87320,
  explanation: 'SQL withdrawal Steel',
  compareField: FIELDS['ITEMAMOUNT'],
  operator: OPERATORS['LESSEQUAL'],
  lineLogicType: LOGICTYPES['OR'],
  nextCondition: 7473,
};

export const sampleWithFullData: IConditionDetails = {
  id: 11058,
  name: 'microchip',
  explanation: 'workforce olive',
  compareField: FIELDS['ITEMAMOUNT'],
  operator: OPERATORS['NOTEQUAL'],
  groupIndex: 35808,
  compareValue: 'Tactics Automotive Officer',
  createdDate: dayjs('2022-11-11'),
  lineLogicType: LOGICTYPES['OR'],
  groupLogicType: LOGICTYPES['OR'],
  nextCondition: 46209,
};

export const sampleWithNewData: NewConditionDetails = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
