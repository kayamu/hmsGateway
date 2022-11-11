import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAllergens, NewAllergens } from '../allergens.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAllergens for edit and NewAllergensFormGroupInput for create.
 */
type AllergensFormGroupInput = IAllergens | PartialWithRequiredKeyOf<NewAllergens>;

type AllergensFormDefaults = Pick<NewAllergens, 'id' | 'active' | 'customerHealths'>;

type AllergensFormGroupContent = {
  id: FormControl<IAllergens['id'] | NewAllergens['id']>;
  name: FormControl<IAllergens['name']>;
  contactId: FormControl<IAllergens['contactId']>;
  ingradientId: FormControl<IAllergens['ingradientId']>;
  active: FormControl<IAllergens['active']>;
  detail: FormControl<IAllergens['detail']>;
  createdDate: FormControl<IAllergens['createdDate']>;
  customerHealths: FormControl<IAllergens['customerHealths']>;
};

export type AllergensFormGroup = FormGroup<AllergensFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AllergensFormService {
  createAllergensFormGroup(allergens: AllergensFormGroupInput = { id: null }): AllergensFormGroup {
    const allergensRawValue = {
      ...this.getFormDefaults(),
      ...allergens,
    };
    return new FormGroup<AllergensFormGroupContent>({
      id: new FormControl(
        { value: allergensRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(allergensRawValue.name),
      contactId: new FormControl(allergensRawValue.contactId),
      ingradientId: new FormControl(allergensRawValue.ingradientId),
      active: new FormControl(allergensRawValue.active),
      detail: new FormControl(allergensRawValue.detail),
      createdDate: new FormControl(allergensRawValue.createdDate),
      customerHealths: new FormControl(allergensRawValue.customerHealths ?? []),
    });
  }

  getAllergens(form: AllergensFormGroup): IAllergens | NewAllergens {
    return form.getRawValue() as IAllergens | NewAllergens;
  }

  resetForm(form: AllergensFormGroup, allergens: AllergensFormGroupInput): void {
    const allergensRawValue = { ...this.getFormDefaults(), ...allergens };
    form.reset(
      {
        ...allergensRawValue,
        id: { value: allergensRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AllergensFormDefaults {
    return {
      id: null,
      active: false,
      customerHealths: [],
    };
  }
}
