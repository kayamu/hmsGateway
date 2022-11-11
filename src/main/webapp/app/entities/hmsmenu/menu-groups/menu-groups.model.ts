import dayjs from 'dayjs/esm';
import { IIngredients } from 'app/entities/hmsmenu/ingredients/ingredients.model';
import { IMenus } from 'app/entities/hmsmenu/menus/menus.model';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { GOALS } from 'app/entities/enumerations/goals.model';
import { BODYFATS } from 'app/entities/enumerations/bodyfats.model';
import { UNITS } from 'app/entities/enumerations/units.model';

export interface IMenuGroups {
  id: number;
  contactId?: number | null;
  name?: string | null;
  cost?: number | null;
  salesPrice?: number | null;
  explanation?: string | null;
  goal?: GOALS | null;
  bodyType?: BODYFATS | null;
  activityLevelMin?: number | null;
  activityLevelMax?: number | null;
  weightMin?: number | null;
  weightMax?: number | null;
  dailyKcalMin?: number | null;
  dailyKcalMax?: number | null;
  targetWeightMin?: number | null;
  targetWeightMax?: number | null;
  unit?: UNITS | null;
  createdDate?: dayjs.Dayjs | null;
  ingradients?: Pick<IIngredients, 'id' | 'name'>[] | null;
  menus?: Pick<IMenus, 'id' | 'name'>[] | null;
  imagesUrls?: Pick<IImagesUrl, 'id' | 'name'>[] | null;
  nutriens?: Pick<INutriens, 'id' | 'name'> | null;
}

export type NewMenuGroups = Omit<IMenuGroups, 'id'> & { id: null };
