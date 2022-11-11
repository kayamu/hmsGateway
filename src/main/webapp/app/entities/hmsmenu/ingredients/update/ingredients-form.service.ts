import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IIngredients, NewIngredients } from '../ingredients.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIngredients for edit and NewIngredientsFormGroupInput for create.
 */
type IngredientsFormGroupInput = IIngredients | PartialWithRequiredKeyOf<NewIngredients>;

type IngredientsFormDefaults = Pick<NewIngredients, 'id' | 'imagesUrls' | 'menuGroups'>;

type IngredientsFormGroupContent = {
  id: FormControl<IIngredients['id'] | NewIngredients['id']>;
  name: FormControl<IIngredients['name']>;
  createdDate: FormControl<IIngredients['createdDate']>;
  imagesUrls: FormControl<IIngredients['imagesUrls']>;
  nutriens: FormControl<IIngredients['nutriens']>;
  menuGroups: FormControl<IIngredients['menuGroups']>;
};

export type IngredientsFormGroup = FormGroup<IngredientsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IngredientsFormService {
  createIngredientsFormGroup(ingredients: IngredientsFormGroupInput = { id: null }): IngredientsFormGroup {
    const ingredientsRawValue = {
      ...this.getFormDefaults(),
      ...ingredients,
    };
    return new FormGroup<IngredientsFormGroupContent>({
      id: new FormControl(
        { value: ingredientsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(ingredientsRawValue.name),
      createdDate: new FormControl(ingredientsRawValue.createdDate),
      imagesUrls: new FormControl(ingredientsRawValue.imagesUrls ?? []),
      nutriens: new FormControl(ingredientsRawValue.nutriens),
      menuGroups: new FormControl(ingredientsRawValue.menuGroups ?? []),
    });
  }

  getIngredients(form: IngredientsFormGroup): IIngredients | NewIngredients {
    return form.getRawValue() as IIngredients | NewIngredients;
  }

  resetForm(form: IngredientsFormGroup, ingredients: IngredientsFormGroupInput): void {
    const ingredientsRawValue = { ...this.getFormDefaults(), ...ingredients };
    form.reset(
      {
        ...ingredientsRawValue,
        id: { value: ingredientsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IngredientsFormDefaults {
    return {
      id: null,
      imagesUrls: [],
      menuGroups: [],
    };
  }
}
