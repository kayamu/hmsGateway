import dayjs from 'dayjs/esm';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { IIngredients } from 'app/entities/hmsmenu/ingredients/ingredients.model';
import { IMeals } from 'app/entities/hmsmenu/meals/meals.model';

export interface IMealIngredients {
  id: number;
  name?: string | null;
  amount?: string | null;
  unit?: string | null;
  createdDate?: dayjs.Dayjs | null;
  nutriens?: Pick<INutriens, 'id' | 'name'> | null;
  ingradients?: Pick<IIngredients, 'id' | 'name'> | null;
  meals?: Pick<IMeals, 'id'>[] | null;
}

export type NewMealIngredients = Omit<IMealIngredients, 'id'> & { id: null };
