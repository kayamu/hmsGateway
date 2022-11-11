import dayjs from 'dayjs/esm';
import { ICustomerHealths } from 'app/entities/hmscustomer/customer-healths/customer-healths.model';

export interface IAllergens {
  id: number;
  name?: string | null;
  contactId?: number | null;
  ingradientId?: number | null;
  active?: boolean | null;
  detail?: string | null;
  createdDate?: dayjs.Dayjs | null;
  customerHealths?: Pick<ICustomerHealths, 'id' | 'name'>[] | null;
}

export type NewAllergens = Omit<IAllergens, 'id'> & { id: null };
