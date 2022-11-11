import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConditionDetails, NewConditionDetails } from '../condition-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConditionDetails for edit and NewConditionDetailsFormGroupInput for create.
 */
type ConditionDetailsFormGroupInput = IConditionDetails | PartialWithRequiredKeyOf<NewConditionDetails>;

type ConditionDetailsFormDefaults = Pick<NewConditionDetails, 'id' | 'conditions'>;

type ConditionDetailsFormGroupContent = {
  id: FormControl<IConditionDetails['id'] | NewConditionDetails['id']>;
  name: FormControl<IConditionDetails['name']>;
  explanation: FormControl<IConditionDetails['explanation']>;
  compareField: FormControl<IConditionDetails['compareField']>;
  operator: FormControl<IConditionDetails['operator']>;
  groupIndex: FormControl<IConditionDetails['groupIndex']>;
  compareValue: FormControl<IConditionDetails['compareValue']>;
  createdDate: FormControl<IConditionDetails['createdDate']>;
  lineLogicType: FormControl<IConditionDetails['lineLogicType']>;
  groupLogicType: FormControl<IConditionDetails['groupLogicType']>;
  nextCondition: FormControl<IConditionDetails['nextCondition']>;
  conditions: FormControl<IConditionDetails['conditions']>;
};

export type ConditionDetailsFormGroup = FormGroup<ConditionDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConditionDetailsFormService {
  createConditionDetailsFormGroup(conditionDetails: ConditionDetailsFormGroupInput = { id: null }): ConditionDetailsFormGroup {
    const conditionDetailsRawValue = {
      ...this.getFormDefaults(),
      ...conditionDetails,
    };
    return new FormGroup<ConditionDetailsFormGroupContent>({
      id: new FormControl(
        { value: conditionDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(conditionDetailsRawValue.name),
      explanation: new FormControl(conditionDetailsRawValue.explanation),
      compareField: new FormControl(conditionDetailsRawValue.compareField),
      operator: new FormControl(conditionDetailsRawValue.operator),
      groupIndex: new FormControl(conditionDetailsRawValue.groupIndex),
      compareValue: new FormControl(conditionDetailsRawValue.compareValue),
      createdDate: new FormControl(conditionDetailsRawValue.createdDate),
      lineLogicType: new FormControl(conditionDetailsRawValue.lineLogicType),
      groupLogicType: new FormControl(conditionDetailsRawValue.groupLogicType),
      nextCondition: new FormControl(conditionDetailsRawValue.nextCondition),
      conditions: new FormControl(conditionDetailsRawValue.conditions ?? []),
    });
  }

  getConditionDetails(form: ConditionDetailsFormGroup): IConditionDetails | NewConditionDetails {
    return form.getRawValue() as IConditionDetails | NewConditionDetails;
  }

  resetForm(form: ConditionDetailsFormGroup, conditionDetails: ConditionDetailsFormGroupInput): void {
    const conditionDetailsRawValue = { ...this.getFormDefaults(), ...conditionDetails };
    form.reset(
      {
        ...conditionDetailsRawValue,
        id: { value: conditionDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConditionDetailsFormDefaults {
    return {
      id: null,
      conditions: [],
    };
  }
}
