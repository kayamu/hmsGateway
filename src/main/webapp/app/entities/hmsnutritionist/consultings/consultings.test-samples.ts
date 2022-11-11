import dayjs from 'dayjs/esm';

import { STATUS } from 'app/entities/enumerations/status.model';

import { IConsultings, NewConsultings } from './consultings.model';

export const sampleWithRequiredData: IConsultings = {
  id: 51338,
};

export const sampleWithPartialData: IConsultings = {
  id: 85680,
  customerId: 52654,
  lastStatus: STATUS['TRANSFERED'],
};

export const sampleWithFullData: IConsultings = {
  id: 86420,
  customerId: 42671,
  custmerName: 'User-centric payment Corporate',
  nutritionistId: 77362,
  nutritionistName: 'Credit functionalities',
  nutritionistNotes: 'strategy Granite',
  lastStatus: STATUS['CANCELLED'],
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewConsultings = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
