import dayjs from 'dayjs/esm';
import { IContacts } from 'app/entities/hmscontact/contacts/contacts.model';
import { EMPLOYMENTTYPES } from 'app/entities/enumerations/employmenttypes.model';

export interface IContactAddresses {
  id: number;
  name?: string | null;
  bussinessName?: string | null;
  bussinessId?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  postalCode?: string | null;
  province?: string | null;
  detail?: string | null;
  active?: boolean | null;
  contractStartDate?: dayjs.Dayjs | null;
  agrrementId?: string | null;
  employmentType?: EMPLOYMENTTYPES | null;
  hourlyRate?: number | null;
  createdDate?: dayjs.Dayjs | null;
  contacts?: Pick<IContacts, 'id' | 'name'>[] | null;
}

export type NewContactAddresses = Omit<IContactAddresses, 'id'> & { id: null };
