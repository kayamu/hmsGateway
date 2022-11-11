import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConsultingStatus, NewConsultingStatus } from '../consulting-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConsultingStatus for edit and NewConsultingStatusFormGroupInput for create.
 */
type ConsultingStatusFormGroupInput = IConsultingStatus | PartialWithRequiredKeyOf<NewConsultingStatus>;

type ConsultingStatusFormDefaults = Pick<NewConsultingStatus, 'id'>;

type ConsultingStatusFormGroupContent = {
  id: FormControl<IConsultingStatus['id'] | NewConsultingStatus['id']>;
  nutritionistId: FormControl<IConsultingStatus['nutritionistId']>;
  lastStatus: FormControl<IConsultingStatus['lastStatus']>;
};

export type ConsultingStatusFormGroup = FormGroup<ConsultingStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConsultingStatusFormService {
  createConsultingStatusFormGroup(consultingStatus: ConsultingStatusFormGroupInput = { id: null }): ConsultingStatusFormGroup {
    const consultingStatusRawValue = {
      ...this.getFormDefaults(),
      ...consultingStatus,
    };
    return new FormGroup<ConsultingStatusFormGroupContent>({
      id: new FormControl(
        { value: consultingStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nutritionistId: new FormControl(consultingStatusRawValue.nutritionistId),
      lastStatus: new FormControl(consultingStatusRawValue.lastStatus),
    });
  }

  getConsultingStatus(form: ConsultingStatusFormGroup): IConsultingStatus | NewConsultingStatus {
    return form.getRawValue() as IConsultingStatus | NewConsultingStatus;
  }

  resetForm(form: ConsultingStatusFormGroup, consultingStatus: ConsultingStatusFormGroupInput): void {
    const consultingStatusRawValue = { ...this.getFormDefaults(), ...consultingStatus };
    form.reset(
      {
        ...consultingStatusRawValue,
        id: { value: consultingStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConsultingStatusFormDefaults {
    return {
      id: null,
    };
  }
}
