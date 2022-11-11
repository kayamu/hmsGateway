import dayjs from 'dayjs/esm';
import { IAllergens } from 'app/entities/hmscustomer/allergens/allergens.model';
import { UNITS } from 'app/entities/enumerations/units.model';
import { BODYFATS } from 'app/entities/enumerations/bodyfats.model';
import { GOALS } from 'app/entities/enumerations/goals.model';

export interface ICustomerHealths {
  id: number;
  name?: string | null;
  contactId?: number | null;
  currentWeight?: number | null;
  currentHeight?: number | null;
  measureUnit?: UNITS | null;
  activityLevel?: number | null;
  targetWeight?: number | null;
  targerCalorie?: number | null;
  targetBodyFat?: BODYFATS | null;
  goal?: GOALS | null;
  active?: boolean | null;
  detail?: string | null;
  createdDate?: dayjs.Dayjs | null;
  allergens?: Pick<IAllergens, 'id' | 'name'>[] | null;
}

export type NewCustomerHealths = Omit<ICustomerHealths, 'id'> & { id: null };
