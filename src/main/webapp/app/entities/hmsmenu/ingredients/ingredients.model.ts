import dayjs from 'dayjs/esm';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { IMenuGroups } from 'app/entities/hmsmenu/menu-groups/menu-groups.model';

export interface IIngredients {
  id: number;
  name?: string | null;
  createdDate?: dayjs.Dayjs | null;
  imagesUrls?: Pick<IImagesUrl, 'id' | 'name'>[] | null;
  nutriens?: Pick<INutriens, 'id' | 'name'> | null;
  menuGroups?: Pick<IMenuGroups, 'id' | 'name'>[] | null;
}

export type NewIngredients = Omit<IIngredients, 'id'> & { id: null };
