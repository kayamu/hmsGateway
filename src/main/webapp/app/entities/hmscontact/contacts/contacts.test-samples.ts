import dayjs from 'dayjs/esm';

import { CONTACTTYPE } from 'app/entities/enumerations/contacttype.model';

import { IContacts, NewContacts } from './contacts.model';

export const sampleWithRequiredData: IContacts = {
  id: 22084,
};

export const sampleWithPartialData: IContacts = {
  id: 9986,
  type: CONTACTTYPE['OUTSOURCE'],
  name: 'virtual Dynamic Saudi',
  email: 'Lavinia_Beahan@hotmail.com',
  phone: '357-723-8369 x1669',
  birthdate: dayjs('2022-11-11'),
};

export const sampleWithFullData: IContacts = {
  id: 84721,
  userID: 'Account',
  type: CONTACTTYPE['EMPLOYEE'],
  name: 'Neck Polarised static',
  hstNumber: 'Course',
  detail: 'Dynamic',
  email: 'Braxton.Hoeger@gmail.com',
  phone: '875.290.0608',
  gender: true,
  birthdate: dayjs('2022-11-10'),
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithNewData: NewContacts = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
