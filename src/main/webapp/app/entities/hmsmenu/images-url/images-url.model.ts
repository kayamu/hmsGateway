import dayjs from 'dayjs/esm';
import { IMenuGroups } from 'app/entities/hmsmenu/menu-groups/menu-groups.model';
import { IMenus } from 'app/entities/hmsmenu/menus/menus.model';
import { IMeals } from 'app/entities/hmsmenu/meals/meals.model';
import { IIngredients } from 'app/entities/hmsmenu/ingredients/ingredients.model';
import { IRecipies } from 'app/entities/hmsmenu/recipies/recipies.model';
import { IMAGETYPES } from 'app/entities/enumerations/imagetypes.model';

export interface IImagesUrl {
  id: number;
  name?: string | null;
  urlAddress?: string | null;
  explanation?: string | null;
  type?: IMAGETYPES | null;
  createdDate?: dayjs.Dayjs | null;
  menuGroups?: Pick<IMenuGroups, 'id'>[] | null;
  menus?: Pick<IMenus, 'id'>[] | null;
  meals?: Pick<IMeals, 'id'>[] | null;
  ingredients?: Pick<IIngredients, 'id'>[] | null;
  recipes?: Pick<IRecipies, 'id'>[] | null;
}

export type NewImagesUrl = Omit<IImagesUrl, 'id'> & { id: null };
