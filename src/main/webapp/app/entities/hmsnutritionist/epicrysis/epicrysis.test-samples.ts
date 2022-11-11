import dayjs from 'dayjs/esm';

import { IEpicrysis, NewEpicrysis } from './epicrysis.model';

export const sampleWithRequiredData: IEpicrysis = {
  id: 75039,
};

export const sampleWithPartialData: IEpicrysis = {
  id: 59281,
  nutritionistId: 41557,
  customerId: 30153,
  nutritionistNotes: 'navigate strategy',
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithFullData: IEpicrysis = {
  id: 78301,
  name: 'South teal CSS',
  nutritionistId: 17437,
  customerId: 25444,
  customerName: 'Hampshire payment',
  nutritionistNotes: 'Unbranded De-engineered',
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewEpicrysis = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
