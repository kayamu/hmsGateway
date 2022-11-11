import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICustomerHealths, NewCustomerHealths } from '../customer-healths.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomerHealths for edit and NewCustomerHealthsFormGroupInput for create.
 */
type CustomerHealthsFormGroupInput = ICustomerHealths | PartialWithRequiredKeyOf<NewCustomerHealths>;

type CustomerHealthsFormDefaults = Pick<NewCustomerHealths, 'id' | 'active' | 'allergens'>;

type CustomerHealthsFormGroupContent = {
  id: FormControl<ICustomerHealths['id'] | NewCustomerHealths['id']>;
  name: FormControl<ICustomerHealths['name']>;
  contactId: FormControl<ICustomerHealths['contactId']>;
  currentWeight: FormControl<ICustomerHealths['currentWeight']>;
  currentHeight: FormControl<ICustomerHealths['currentHeight']>;
  measureUnit: FormControl<ICustomerHealths['measureUnit']>;
  activityLevel: FormControl<ICustomerHealths['activityLevel']>;
  targetWeight: FormControl<ICustomerHealths['targetWeight']>;
  targerCalorie: FormControl<ICustomerHealths['targerCalorie']>;
  targetBodyFat: FormControl<ICustomerHealths['targetBodyFat']>;
  goal: FormControl<ICustomerHealths['goal']>;
  active: FormControl<ICustomerHealths['active']>;
  detail: FormControl<ICustomerHealths['detail']>;
  createdDate: FormControl<ICustomerHealths['createdDate']>;
  allergens: FormControl<ICustomerHealths['allergens']>;
};

export type CustomerHealthsFormGroup = FormGroup<CustomerHealthsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerHealthsFormService {
  createCustomerHealthsFormGroup(customerHealths: CustomerHealthsFormGroupInput = { id: null }): CustomerHealthsFormGroup {
    const customerHealthsRawValue = {
      ...this.getFormDefaults(),
      ...customerHealths,
    };
    return new FormGroup<CustomerHealthsFormGroupContent>({
      id: new FormControl(
        { value: customerHealthsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(customerHealthsRawValue.name),
      contactId: new FormControl(customerHealthsRawValue.contactId),
      currentWeight: new FormControl(customerHealthsRawValue.currentWeight),
      currentHeight: new FormControl(customerHealthsRawValue.currentHeight),
      measureUnit: new FormControl(customerHealthsRawValue.measureUnit),
      activityLevel: new FormControl(customerHealthsRawValue.activityLevel),
      targetWeight: new FormControl(customerHealthsRawValue.targetWeight),
      targerCalorie: new FormControl(customerHealthsRawValue.targerCalorie),
      targetBodyFat: new FormControl(customerHealthsRawValue.targetBodyFat),
      goal: new FormControl(customerHealthsRawValue.goal),
      active: new FormControl(customerHealthsRawValue.active),
      detail: new FormControl(customerHealthsRawValue.detail),
      createdDate: new FormControl(customerHealthsRawValue.createdDate),
      allergens: new FormControl(customerHealthsRawValue.allergens ?? []),
    });
  }

  getCustomerHealths(form: CustomerHealthsFormGroup): ICustomerHealths | NewCustomerHealths {
    return form.getRawValue() as ICustomerHealths | NewCustomerHealths;
  }

  resetForm(form: CustomerHealthsFormGroup, customerHealths: CustomerHealthsFormGroupInput): void {
    const customerHealthsRawValue = { ...this.getFormDefaults(), ...customerHealths };
    form.reset(
      {
        ...customerHealthsRawValue,
        id: { value: customerHealthsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerHealthsFormDefaults {
    return {
      id: null,
      active: false,
      allergens: [],
    };
  }
}
