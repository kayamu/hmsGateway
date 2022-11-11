import dayjs from 'dayjs/esm';
import { IInvoiceDetails } from 'app/entities/hmsfinance/invoice-details/invoice-details.model';
import { INVOICETYPES } from 'app/entities/enumerations/invoicetypes.model';

export interface IInvoices {
  id: number;
  invoiceNumber?: string | null;
  contactId?: number | null;
  contactAddressId?: number | null;
  contactBillingAdrId?: number | null;
  cartId?: number | null;
  type?: INVOICETYPES | null;
  requestDate?: dayjs.Dayjs | null;
  contactName?: string | null;
  invoiceDate?: dayjs.Dayjs | null;
  lastTranactionId?: number | null;
  totalCost?: number | null;
  totalProfit?: number | null;
  totalAmount?: number | null;
  totalTaxes?: number | null;
  fedaralTaxesAmount?: number | null;
  provintionalTaxesAmount?: number | null;
  discountsAmount?: number | null;
  addOnAmount?: number | null;
  message?: string | null;
  createdDate?: dayjs.Dayjs | null;
  invoiceDetails?: Pick<IInvoiceDetails, 'id'>[] | null;
}

export type NewInvoices = Omit<IInvoices, 'id'> & { id: null };
