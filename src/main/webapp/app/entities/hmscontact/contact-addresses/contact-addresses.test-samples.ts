import dayjs from 'dayjs/esm';

import { EMPLOYMENTTYPES } from 'app/entities/enumerations/employmenttypes.model';

import { IContactAddresses, NewContactAddresses } from './contact-addresses.model';

export const sampleWithRequiredData: IContactAddresses = {
  id: 89848,
};

export const sampleWithPartialData: IContactAddresses = {
  id: 15886,
  bussinessName: 'Central Tuna',
  bussinessId: 'Jewelery frictionless exuding',
  address1: 'Designer THX',
  detail: 'Intranet cross-platform Centralized',
  active: false,
  contractStartDate: dayjs('2022-11-11'),
  employmentType: EMPLOYMENTTYPES['PARTTIME'],
  createdDate: dayjs('2022-11-11'),
};

export const sampleWithFullData: IContactAddresses = {
  id: 31248,
  name: 'Tanzanian',
  bussinessName: 'Dynamic pixel Orchestrator',
  bussinessId: 'Cambridgeshire',
  address1: 'Investment',
  address2: 'Producer Handcrafted',
  city: 'Barrowsville',
  postalCode: 'Data Vietnam Kids',
  province: 'plum',
  detail: 'Frozen Administrator',
  active: false,
  contractStartDate: dayjs('2022-11-10'),
  agrrementId: 'Cotton seize',
  employmentType: EMPLOYMENTTYPES['PARTTIME'],
  hourlyRate: 19999,
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewContactAddresses = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
