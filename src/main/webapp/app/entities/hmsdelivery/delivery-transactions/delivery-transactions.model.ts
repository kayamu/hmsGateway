import dayjs from 'dayjs/esm';
import { IDeliveryOrders } from 'app/entities/hmsdelivery/delivery-orders/delivery-orders.model';
import { DELIVERYTYPES } from 'app/entities/enumerations/deliverytypes.model';

export interface IDeliveryTransactions {
  id: number;
  statusChangedDate?: dayjs.Dayjs | null;
  transactionDate?: dayjs.Dayjs | null;
  type?: DELIVERYTYPES | null;
  createdDate?: dayjs.Dayjs | null;
  deliveryOrders?: Pick<IDeliveryOrders, 'id'>[] | null;
}

export type NewDeliveryTransactions = Omit<IDeliveryTransactions, 'id'> & { id: null };
