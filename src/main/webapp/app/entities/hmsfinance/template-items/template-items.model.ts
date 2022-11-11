import dayjs from 'dayjs/esm';
import { IConditions } from 'app/entities/hmsfinance/conditions/conditions.model';
import { ITemplates } from 'app/entities/hmsfinance/templates/templates.model';
import { DETAILTYPES } from 'app/entities/enumerations/detailtypes.model';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

export interface ITemplateItems {
  id: number;
  name?: string | null;
  code?: string | null;
  type?: DETAILTYPES | null;
  valueType?: VALUETYPES | null;
  amount?: number | null;
  explanation?: string | null;
  startDate?: dayjs.Dayjs | null;
  dueDate?: dayjs.Dayjs | null;
  isOnce?: boolean | null;
  createdDate?: dayjs.Dayjs | null;
  conditions?: Pick<IConditions, 'id' | 'name'> | null;
  templates?: Pick<ITemplates, 'id' | 'name'>[] | null;
}

export type NewTemplateItems = Omit<ITemplateItems, 'id'> & { id: null };
