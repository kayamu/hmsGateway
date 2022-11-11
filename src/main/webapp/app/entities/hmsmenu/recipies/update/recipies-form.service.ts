import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRecipies, NewRecipies } from '../recipies.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRecipies for edit and NewRecipiesFormGroupInput for create.
 */
type RecipiesFormGroupInput = IRecipies | PartialWithRequiredKeyOf<NewRecipies>;

type RecipiesFormDefaults = Pick<NewRecipies, 'id' | 'imagesUrls'>;

type RecipiesFormGroupContent = {
  id: FormControl<IRecipies['id'] | NewRecipies['id']>;
  name: FormControl<IRecipies['name']>;
  recipe: FormControl<IRecipies['recipe']>;
  explanation: FormControl<IRecipies['explanation']>;
  createdDate: FormControl<IRecipies['createdDate']>;
  imagesUrls: FormControl<IRecipies['imagesUrls']>;
};

export type RecipiesFormGroup = FormGroup<RecipiesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RecipiesFormService {
  createRecipiesFormGroup(recipies: RecipiesFormGroupInput = { id: null }): RecipiesFormGroup {
    const recipiesRawValue = {
      ...this.getFormDefaults(),
      ...recipies,
    };
    return new FormGroup<RecipiesFormGroupContent>({
      id: new FormControl(
        { value: recipiesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(recipiesRawValue.name),
      recipe: new FormControl(recipiesRawValue.recipe),
      explanation: new FormControl(recipiesRawValue.explanation),
      createdDate: new FormControl(recipiesRawValue.createdDate),
      imagesUrls: new FormControl(recipiesRawValue.imagesUrls ?? []),
    });
  }

  getRecipies(form: RecipiesFormGroup): IRecipies | NewRecipies {
    return form.getRawValue() as IRecipies | NewRecipies;
  }

  resetForm(form: RecipiesFormGroup, recipies: RecipiesFormGroupInput): void {
    const recipiesRawValue = { ...this.getFormDefaults(), ...recipies };
    form.reset(
      {
        ...recipiesRawValue,
        id: { value: recipiesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RecipiesFormDefaults {
    return {
      id: null,
      imagesUrls: [],
    };
  }
}
