import dayjs from 'dayjs/esm';

export interface INutriens {
  id: number;
  name?: string | null;
  protein?: number | null;
  carb?: number | null;
  fat?: number | null;
  kcal?: number | null;
  createdDate?: dayjs.Dayjs | null;
}

export type NewNutriens = Omit<INutriens, 'id'> & { id: null };
