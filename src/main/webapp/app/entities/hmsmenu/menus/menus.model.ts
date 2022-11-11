import dayjs from 'dayjs/esm';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { IMeals } from 'app/entities/hmsmenu/meals/meals.model';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { IMenuGroups } from 'app/entities/hmsmenu/menu-groups/menu-groups.model';
import { DAYS } from 'app/entities/enumerations/days.model';
import { REPAST } from 'app/entities/enumerations/repast.model';

export interface IMenus {
  id: number;
  name?: string | null;
  menuDay?: DAYS | null;
  menuTime?: REPAST | null;
  contactId?: number | null;
  cost?: number | null;
  salesPrice?: number | null;
  explanation?: string | null;
  createdDate?: dayjs.Dayjs | null;
  imagesUrls?: Pick<IImagesUrl, 'id' | 'name'>[] | null;
  meals?: Pick<IMeals, 'id' | 'name'>[] | null;
  nutriens?: Pick<INutriens, 'id' | 'name'> | null;
  menuGroups?: Pick<IMenuGroups, 'id'>[] | null;
}

export type NewMenus = Omit<IMenus, 'id'> & { id: null };
