import dayjs from 'dayjs/esm';
import { ISubItems } from 'app/entities/hmsfinance/sub-items/sub-items.model';
import { IInvoices } from 'app/entities/hmsfinance/invoices/invoices.model';
import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';
import { PAYMENTTYPES } from 'app/entities/enumerations/paymenttypes.model';

export interface IInvoiceDetails {
  id: number;
  contactId?: number | null;
  cartId?: number | null;
  itemId?: number | null;
  itemName?: string | null;
  itemCode?: string | null;
  itemType?: ITEMTYPES | null;
  paymentType?: PAYMENTTYPES | null;
  subscriptionStartingDate?: dayjs.Dayjs | null;
  subscriptionDurationWeeks?: number | null;
  detailAmount?: number | null;
  lineNumber?: number | null;
  nutritionistId?: number | null;
  totalCost?: number | null;
  totalProfit?: number | null;
  nutritionistEarning?: number | null;
  nutritionistPercentage?: number | null;
  fedaralTaxesAmount?: number | null;
  fedaralTaxesPercentage?: number | null;
  provintionalTaxesAmount?: number | null;
  provintionalTaxesPercentage?: number | null;
  totalTaxesAmount?: number | null;
  totalTaxesPercentage?: number | null;
  discountAmount?: number | null;
  discountPercentage?: number | null;
  addOnCode?: string | null;
  addOnAmount?: number | null;
  addOnPercentage?: number | null;
  totalAmount?: number | null;
  createdDate?: dayjs.Dayjs | null;
  subItems?: Pick<ISubItems, 'id' | 'name'>[] | null;
  invoices?: Pick<IInvoices, 'id' | 'invoiceNumber'>[] | null;
}

export type NewInvoiceDetails = Omit<IInvoiceDetails, 'id'> & { id: null };
