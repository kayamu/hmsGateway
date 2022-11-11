import dayjs from 'dayjs/esm';
import { ITemplateItems } from 'app/entities/hmsfinance/template-items/template-items.model';
import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';

export interface ITemplates {
  id: number;
  name?: string | null;
  type?: ITEMTYPES | null;
  explanation?: string | null;
  isActive?: boolean | null;
  createdDate?: dayjs.Dayjs | null;
  templateItems?: Pick<ITemplateItems, 'id' | 'name'>[] | null;
}

export type NewTemplates = Omit<ITemplates, 'id'> & { id: null };
