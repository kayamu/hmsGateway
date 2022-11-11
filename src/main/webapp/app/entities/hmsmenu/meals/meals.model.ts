import dayjs from 'dayjs/esm';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { IMealIngredients } from 'app/entities/hmsmenu/meal-ingredients/meal-ingredients.model';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { IRecipies } from 'app/entities/hmsmenu/recipies/recipies.model';
import { IMenus } from 'app/entities/hmsmenu/menus/menus.model';

export interface IMeals {
  id: number;
  name?: string | null;
  createdDate?: dayjs.Dayjs | null;
  imagesUrls?: Pick<IImagesUrl, 'id' | 'name'>[] | null;
  mealIngredients?: Pick<IMealIngredients, 'id' | 'name'>[] | null;
  nutriens?: Pick<INutriens, 'id' | 'name'> | null;
  recipies?: Pick<IRecipies, 'id' | 'name'> | null;
  menus?: Pick<IMenus, 'id'>[] | null;
}

export type NewMeals = Omit<IMeals, 'id'> & { id: null };
