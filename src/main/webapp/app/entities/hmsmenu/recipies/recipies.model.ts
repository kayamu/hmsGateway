import dayjs from 'dayjs/esm';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';

export interface IRecipies {
  id: number;
  name?: string | null;
  recipe?: string | null;
  explanation?: string | null;
  createdDate?: dayjs.Dayjs | null;
  imagesUrls?: Pick<IImagesUrl, 'id' | 'name'>[] | null;
}

export type NewRecipies = Omit<IRecipies, 'id'> & { id: null };
