import dayjs from 'dayjs/esm';
import { ITemplates } from 'app/entities/hmsfinance/templates/templates.model';
import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';

export interface IItems {
  id: number;
  name?: string | null;
  itemId?: number | null;
  itemCode?: string | null;
  type?: ITEMTYPES | null;
  explain?: string | null;
  cost?: number | null;
  price?: number | null;
  isActive?: boolean | null;
  createdDate?: dayjs.Dayjs | null;
  templates?: Pick<ITemplates, 'id' | 'name'> | null;
}

export type NewItems = Omit<IItems, 'id'> & { id: null };
