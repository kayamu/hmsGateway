import dayjs from 'dayjs/esm';
import { IDeliveryTransactions } from 'app/entities/hmsdelivery/delivery-transactions/delivery-transactions.model';

export interface IDeliveryOrders {
  id: number;
  deliveryId?: number | null;
  invoiceNumber?: string | null;
  contactId?: number | null;
  contactName?: string | null;
  contactAddressId?: number | null;
  contactCartId?: number | null;
  deliveryDate?: dayjs.Dayjs | null;
  requestDate?: dayjs.Dayjs | null;
  menuItemId?: number | null;
  menuItemName?: string | null;
  menuItemCode?: string | null;
  lineNumber?: number | null;
  detail?: string | null;
  message?: string | null;
  createdDate?: dayjs.Dayjs | null;
  deliveryTransactions?: Pick<IDeliveryTransactions, 'id'>[] | null;
}

export type NewDeliveryOrders = Omit<IDeliveryOrders, 'id'> & { id: null };
