import dayjs from 'dayjs/esm';
import { IConditionDetails } from 'app/entities/hmsfinance/condition-details/condition-details.model';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

export interface IConditions {
  id: number;
  name?: string | null;
  type?: VALUETYPES | null;
  createdDate?: dayjs.Dayjs | null;
  conditionDetails?: Pick<IConditionDetails, 'id' | 'name'>[] | null;
}

export type NewConditions = Omit<IConditions, 'id'> & { id: null };
