import dayjs from 'dayjs/esm';
import { ICookOrders } from 'app/entities/hmskitchen/cook-orders/cook-orders.model';
import { KITCHENTYPES } from 'app/entities/enumerations/kitchentypes.model';

export interface ICookTransactions {
  id: number;
  kitchenId?: number | null;
  statusChangedDate?: dayjs.Dayjs | null;
  transactionDate?: dayjs.Dayjs | null;
  type?: KITCHENTYPES | null;
  createdDate?: dayjs.Dayjs | null;
  cookOrders?: Pick<ICookOrders, 'id'>[] | null;
}

export type NewCookTransactions = Omit<ICookTransactions, 'id'> & { id: null };
