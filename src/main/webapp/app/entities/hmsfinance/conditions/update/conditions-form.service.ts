import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConditions, NewConditions } from '../conditions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConditions for edit and NewConditionsFormGroupInput for create.
 */
type ConditionsFormGroupInput = IConditions | PartialWithRequiredKeyOf<NewConditions>;

type ConditionsFormDefaults = Pick<NewConditions, 'id' | 'conditionDetails'>;

type ConditionsFormGroupContent = {
  id: FormControl<IConditions['id'] | NewConditions['id']>;
  name: FormControl<IConditions['name']>;
  type: FormControl<IConditions['type']>;
  createdDate: FormControl<IConditions['createdDate']>;
  conditionDetails: FormControl<IConditions['conditionDetails']>;
};

export type ConditionsFormGroup = FormGroup<ConditionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConditionsFormService {
  createConditionsFormGroup(conditions: ConditionsFormGroupInput = { id: null }): ConditionsFormGroup {
    const conditionsRawValue = {
      ...this.getFormDefaults(),
      ...conditions,
    };
    return new FormGroup<ConditionsFormGroupContent>({
      id: new FormControl(
        { value: conditionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(conditionsRawValue.name),
      type: new FormControl(conditionsRawValue.type),
      createdDate: new FormControl(conditionsRawValue.createdDate),
      conditionDetails: new FormControl(conditionsRawValue.conditionDetails ?? []),
    });
  }

  getConditions(form: ConditionsFormGroup): IConditions | NewConditions {
    return form.getRawValue() as IConditions | NewConditions;
  }

  resetForm(form: ConditionsFormGroup, conditions: ConditionsFormGroupInput): void {
    const conditionsRawValue = { ...this.getFormDefaults(), ...conditions };
    form.reset(
      {
        ...conditionsRawValue,
        id: { value: conditionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConditionsFormDefaults {
    return {
      id: null,
      conditionDetails: [],
    };
  }
}
