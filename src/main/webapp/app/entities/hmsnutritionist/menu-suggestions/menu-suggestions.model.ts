import dayjs from 'dayjs/esm';
import { IConsultings } from 'app/entities/hmsnutritionist/consultings/consultings.model';

export interface IMenuSuggestions {
  id: number;
  name?: string | null;
  nutritionistId?: number | null;
  customerId?: number | null;
  menuGroupId?: number | null;
  notes?: string | null;
  createdDate?: dayjs.Dayjs | null;
  consultings?: Pick<IConsultings, 'id'>[] | null;
}

export type NewMenuSuggestions = Omit<IMenuSuggestions, 'id'> & { id: null };
