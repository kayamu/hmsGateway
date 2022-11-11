import dayjs from 'dayjs/esm';
import { IInvoices } from 'app/entities/hmsfinance/invoices/invoices.model';
import { INVOICETYPES } from 'app/entities/enumerations/invoicetypes.model';

export interface IInvoiceTransactions {
  id: number;
  statusChangedDate?: dayjs.Dayjs | null;
  transactionDate?: dayjs.Dayjs | null;
  type?: INVOICETYPES | null;
  createdDate?: dayjs.Dayjs | null;
  invoices?: Pick<IInvoices, 'id' | 'invoiceNumber'> | null;
}

export type NewInvoiceTransactions = Omit<IInvoiceTransactions, 'id'> & { id: null };
