import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMealIngredients, NewMealIngredients } from '../meal-ingredients.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMealIngredients for edit and NewMealIngredientsFormGroupInput for create.
 */
type MealIngredientsFormGroupInput = IMealIngredients | PartialWithRequiredKeyOf<NewMealIngredients>;

type MealIngredientsFormDefaults = Pick<NewMealIngredients, 'id' | 'meals'>;

type MealIngredientsFormGroupContent = {
  id: FormControl<IMealIngredients['id'] | NewMealIngredients['id']>;
  name: FormControl<IMealIngredients['name']>;
  amount: FormControl<IMealIngredients['amount']>;
  unit: FormControl<IMealIngredients['unit']>;
  createdDate: FormControl<IMealIngredients['createdDate']>;
  nutriens: FormControl<IMealIngredients['nutriens']>;
  ingradients: FormControl<IMealIngredients['ingradients']>;
  meals: FormControl<IMealIngredients['meals']>;
};

export type MealIngredientsFormGroup = FormGroup<MealIngredientsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MealIngredientsFormService {
  createMealIngredientsFormGroup(mealIngredients: MealIngredientsFormGroupInput = { id: null }): MealIngredientsFormGroup {
    const mealIngredientsRawValue = {
      ...this.getFormDefaults(),
      ...mealIngredients,
    };
    return new FormGroup<MealIngredientsFormGroupContent>({
      id: new FormControl(
        { value: mealIngredientsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(mealIngredientsRawValue.name),
      amount: new FormControl(mealIngredientsRawValue.amount),
      unit: new FormControl(mealIngredientsRawValue.unit),
      createdDate: new FormControl(mealIngredientsRawValue.createdDate),
      nutriens: new FormControl(mealIngredientsRawValue.nutriens),
      ingradients: new FormControl(mealIngredientsRawValue.ingradients),
      meals: new FormControl(mealIngredientsRawValue.meals ?? []),
    });
  }

  getMealIngredients(form: MealIngredientsFormGroup): IMealIngredients | NewMealIngredients {
    return form.getRawValue() as IMealIngredients | NewMealIngredients;
  }

  resetForm(form: MealIngredientsFormGroup, mealIngredients: MealIngredientsFormGroupInput): void {
    const mealIngredientsRawValue = { ...this.getFormDefaults(), ...mealIngredients };
    form.reset(
      {
        ...mealIngredientsRawValue,
        id: { value: mealIngredientsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MealIngredientsFormDefaults {
    return {
      id: null,
      meals: [],
    };
  }
}
