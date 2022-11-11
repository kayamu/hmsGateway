import dayjs from 'dayjs/esm';

import { IMAGETYPES } from 'app/entities/enumerations/imagetypes.model';

import { IImagesUrl, NewImagesUrl } from './images-url.model';

export const sampleWithRequiredData: IImagesUrl = {
  id: 45363,
};

export const sampleWithPartialData: IImagesUrl = {
  id: 28572,
  name: 'bluetooth Refined Bridge',
};

export const sampleWithFullData: IImagesUrl = {
  id: 32621,
  name: 'bluetooth',
  urlAddress: 'Salad Salad',
  explanation: 'moderator',
  type: IMAGETYPES['NORMAL'],
  createdDate: dayjs('2022-11-10'),
};

export const sampleWithNewData: NewImagesUrl = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
