import dayjs from 'dayjs/esm';
import { IConsultings } from 'app/entities/hmsnutritionist/consultings/consultings.model';

export interface IEpicrysis {
  id: number;
  name?: string | null;
  nutritionistId?: number | null;
  customerId?: number | null;
  customerName?: string | null;
  nutritionistNotes?: string | null;
  createdDate?: dayjs.Dayjs | null;
  consultings?: Pick<IConsultings, 'id'>[] | null;
}

export type NewEpicrysis = Omit<IEpicrysis, 'id'> & { id: null };
