import dayjs from 'dayjs/esm';
import { IInvoiceDetails } from 'app/entities/hmsfinance/invoice-details/invoice-details.model';
import { DETAILTYPES } from 'app/entities/enumerations/detailtypes.model';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

export interface ISubItems {
  id: number;
  name?: string | null;
  actualValue?: number | null;
  percentage?: number | null;
  baseValue?: number | null;
  type?: DETAILTYPES | null;
  valueType?: VALUETYPES | null;
  calculatedValue?: number | null;
  templateItemId?: number | null;
  createdDate?: dayjs.Dayjs | null;
  invoiceDetails?: Pick<IInvoiceDetails, 'id'>[] | null;
}

export type NewSubItems = Omit<ISubItems, 'id'> & { id: null };
