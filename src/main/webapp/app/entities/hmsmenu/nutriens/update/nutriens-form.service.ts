import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INutriens, NewNutriens } from '../nutriens.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INutriens for edit and NewNutriensFormGroupInput for create.
 */
type NutriensFormGroupInput = INutriens | PartialWithRequiredKeyOf<NewNutriens>;

type NutriensFormDefaults = Pick<NewNutriens, 'id'>;

type NutriensFormGroupContent = {
  id: FormControl<INutriens['id'] | NewNutriens['id']>;
  name: FormControl<INutriens['name']>;
  protein: FormControl<INutriens['protein']>;
  carb: FormControl<INutriens['carb']>;
  fat: FormControl<INutriens['fat']>;
  kcal: FormControl<INutriens['kcal']>;
  createdDate: FormControl<INutriens['createdDate']>;
};

export type NutriensFormGroup = FormGroup<NutriensFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NutriensFormService {
  createNutriensFormGroup(nutriens: NutriensFormGroupInput = { id: null }): NutriensFormGroup {
    const nutriensRawValue = {
      ...this.getFormDefaults(),
      ...nutriens,
    };
    return new FormGroup<NutriensFormGroupContent>({
      id: new FormControl(
        { value: nutriensRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(nutriensRawValue.name),
      protein: new FormControl(nutriensRawValue.protein),
      carb: new FormControl(nutriensRawValue.carb),
      fat: new FormControl(nutriensRawValue.fat),
      kcal: new FormControl(nutriensRawValue.kcal),
      createdDate: new FormControl(nutriensRawValue.createdDate),
    });
  }

  getNutriens(form: NutriensFormGroup): INutriens | NewNutriens {
    return form.getRawValue() as INutriens | NewNutriens;
  }

  resetForm(form: NutriensFormGroup, nutriens: NutriensFormGroupInput): void {
    const nutriensRawValue = { ...this.getFormDefaults(), ...nutriens };
    form.reset(
      {
        ...nutriensRawValue,
        id: { value: nutriensRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NutriensFormDefaults {
    return {
      id: null,
    };
  }
}
