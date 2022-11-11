import { STATUS } from 'app/entities/enumerations/status.model';

import { IConsultingStatus, NewConsultingStatus } from './consulting-status.model';

export const sampleWithRequiredData: IConsultingStatus = {
  id: 43299,
};

export const sampleWithPartialData: IConsultingStatus = {
  id: 67704,
  lastStatus: STATUS['TRANSFERED'],
};

export const sampleWithFullData: IConsultingStatus = {
  id: 6498,
  nutritionistId: 75039,
  lastStatus: STATUS['CANCELLED'],
};

export const sampleWithNewData: NewConsultingStatus = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
