import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMeals, NewMeals } from '../meals.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMeals for edit and NewMealsFormGroupInput for create.
 */
type MealsFormGroupInput = IMeals | PartialWithRequiredKeyOf<NewMeals>;

type MealsFormDefaults = Pick<NewMeals, 'id' | 'imagesUrls' | 'mealIngredients' | 'menus'>;

type MealsFormGroupContent = {
  id: FormControl<IMeals['id'] | NewMeals['id']>;
  name: FormControl<IMeals['name']>;
  createdDate: FormControl<IMeals['createdDate']>;
  imagesUrls: FormControl<IMeals['imagesUrls']>;
  mealIngredients: FormControl<IMeals['mealIngredients']>;
  nutriens: FormControl<IMeals['nutriens']>;
  recipies: FormControl<IMeals['recipies']>;
  menus: FormControl<IMeals['menus']>;
};

export type MealsFormGroup = FormGroup<MealsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MealsFormService {
  createMealsFormGroup(meals: MealsFormGroupInput = { id: null }): MealsFormGroup {
    const mealsRawValue = {
      ...this.getFormDefaults(),
      ...meals,
    };
    return new FormGroup<MealsFormGroupContent>({
      id: new FormControl(
        { value: mealsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(mealsRawValue.name),
      createdDate: new FormControl(mealsRawValue.createdDate),
      imagesUrls: new FormControl(mealsRawValue.imagesUrls ?? []),
      mealIngredients: new FormControl(mealsRawValue.mealIngredients ?? []),
      nutriens: new FormControl(mealsRawValue.nutriens),
      recipies: new FormControl(mealsRawValue.recipies),
      menus: new FormControl(mealsRawValue.menus ?? []),
    });
  }

  getMeals(form: MealsFormGroup): IMeals | NewMeals {
    return form.getRawValue() as IMeals | NewMeals;
  }

  resetForm(form: MealsFormGroup, meals: MealsFormGroupInput): void {
    const mealsRawValue = { ...this.getFormDefaults(), ...meals };
    form.reset(
      {
        ...mealsRawValue,
        id: { value: mealsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MealsFormDefaults {
    return {
      id: null,
      imagesUrls: [],
      mealIngredients: [],
      menus: [],
    };
  }
}
