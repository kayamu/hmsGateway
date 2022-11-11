import dayjs from 'dayjs/esm';
import { IConditions } from 'app/entities/hmsfinance/conditions/conditions.model';
import { FIELDS } from 'app/entities/enumerations/fields.model';
import { OPERATORS } from 'app/entities/enumerations/operators.model';
import { LOGICTYPES } from 'app/entities/enumerations/logictypes.model';

export interface IConditionDetails {
  id: number;
  name?: string | null;
  explanation?: string | null;
  compareField?: FIELDS | null;
  operator?: OPERATORS | null;
  groupIndex?: number | null;
  compareValue?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lineLogicType?: LOGICTYPES | null;
  groupLogicType?: LOGICTYPES | null;
  nextCondition?: number | null;
  conditions?: Pick<IConditions, 'id' | 'name'>[] | null;
}

export type NewConditionDetails = Omit<IConditionDetails, 'id'> & { id: null };
