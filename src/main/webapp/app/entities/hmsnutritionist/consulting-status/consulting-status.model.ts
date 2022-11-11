import { STATUS } from 'app/entities/enumerations/status.model';

export interface IConsultingStatus {
  id: number;
  nutritionistId?: number | null;
  lastStatus?: STATUS | null;
}

export type NewConsultingStatus = Omit<IConsultingStatus, 'id'> & { id: null };
