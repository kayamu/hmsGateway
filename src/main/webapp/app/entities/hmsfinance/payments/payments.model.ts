import dayjs from 'dayjs/esm';
import { IInvoices } from 'app/entities/hmsfinance/invoices/invoices.model';
import { PAYMENTTYPES } from 'app/entities/enumerations/paymenttypes.model';
import { PAYMENTSTATUS } from 'app/entities/enumerations/paymentstatus.model';

export interface IPayments {
  id: number;
  refNumber?: string | null;
  paymentType?: PAYMENTTYPES | null;
  contactId?: number | null;
  explanation?: string | null;
  operationDate?: dayjs.Dayjs | null;
  amount?: number | null;
  status?: PAYMENTSTATUS | null;
  createdDate?: dayjs.Dayjs | null;
  invoices?: Pick<IInvoices, 'id' | 'invoiceNumber'> | null;
}

export type NewPayments = Omit<IPayments, 'id'> & { id: null };
