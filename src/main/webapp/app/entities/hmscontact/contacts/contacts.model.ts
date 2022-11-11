import dayjs from 'dayjs/esm';
import { IContactAddresses } from 'app/entities/hmscontact/contact-addresses/contact-addresses.model';
import { CONTACTTYPE } from 'app/entities/enumerations/contacttype.model';

export interface IContacts {
  id: number;
  userID?: string | null;
  type?: CONTACTTYPE | null;
  name?: string | null;
  hstNumber?: string | null;
  detail?: string | null;
  email?: string | null;
  phone?: string | null;
  gender?: boolean | null;
  birthdate?: dayjs.Dayjs | null;
  createdDate?: dayjs.Dayjs | null;
  contactAddresses?: Pick<IContactAddresses, 'id' | 'name'>[] | null;
}

export type NewContacts = Omit<IContacts, 'id'> & { id: null };
