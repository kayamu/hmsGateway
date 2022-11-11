import dayjs from 'dayjs/esm';
import { ICookTransactions } from 'app/entities/hmskitchen/cook-transactions/cook-transactions.model';

export interface ICookOrders {
  id: number;
  kitchenId?: number | null;
  customerId?: number | null;
  customerCartId?: number | null;
  menuItemId?: number | null;
  menuItemName?: string | null;
  menuItemCode?: string | null;
  mealId?: number | null;
  lineNumber?: number | null;
  requestDate?: dayjs.Dayjs | null;
  message?: string | null;
  createdDate?: dayjs.Dayjs | null;
  cookTransactions?: Pick<ICookTransactions, 'id'>[] | null;
}

export type NewCookOrders = Omit<ICookOrders, 'id'> & { id: null };
