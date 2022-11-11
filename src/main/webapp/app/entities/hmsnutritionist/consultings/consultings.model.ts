import dayjs from 'dayjs/esm';
import { IEpicrysis } from 'app/entities/hmsnutritionist/epicrysis/epicrysis.model';
import { IMenuSuggestions } from 'app/entities/hmsnutritionist/menu-suggestions/menu-suggestions.model';
import { IConsultingStatus } from 'app/entities/hmsnutritionist/consulting-status/consulting-status.model';
import { STATUS } from 'app/entities/enumerations/status.model';

export interface IConsultings {
  id: number;
  customerId?: number | null;
  custmerName?: string | null;
  nutritionistId?: number | null;
  nutritionistName?: string | null;
  nutritionistNotes?: string | null;
  lastStatus?: STATUS | null;
  createdDate?: dayjs.Dayjs | null;
  epicryses?: Pick<IEpicrysis, 'id' | 'name'>[] | null;
  menuSuggestions?: Pick<IMenuSuggestions, 'id' | 'name'>[] | null;
  consultingStatus?: Pick<IConsultingStatus, 'id'> | null;
}

export type NewConsultings = Omit<IConsultings, 'id'> & { id: null };
