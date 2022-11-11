import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEpicrysis, NewEpicrysis } from '../epicrysis.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEpicrysis for edit and NewEpicrysisFormGroupInput for create.
 */
type EpicrysisFormGroupInput = IEpicrysis | PartialWithRequiredKeyOf<NewEpicrysis>;

type EpicrysisFormDefaults = Pick<NewEpicrysis, 'id' | 'consultings'>;

type EpicrysisFormGroupContent = {
  id: FormControl<IEpicrysis['id'] | NewEpicrysis['id']>;
  name: FormControl<IEpicrysis['name']>;
  nutritionistId: FormControl<IEpicrysis['nutritionistId']>;
  customerId: FormControl<IEpicrysis['customerId']>;
  customerName: FormControl<IEpicrysis['customerName']>;
  nutritionistNotes: FormControl<IEpicrysis['nutritionistNotes']>;
  createdDate: FormControl<IEpicrysis['createdDate']>;
  consultings: FormControl<IEpicrysis['consultings']>;
};

export type EpicrysisFormGroup = FormGroup<EpicrysisFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EpicrysisFormService {
  createEpicrysisFormGroup(epicrysis: EpicrysisFormGroupInput = { id: null }): EpicrysisFormGroup {
    const epicrysisRawValue = {
      ...this.getFormDefaults(),
      ...epicrysis,
    };
    return new FormGroup<EpicrysisFormGroupContent>({
      id: new FormControl(
        { value: epicrysisRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(epicrysisRawValue.name),
      nutritionistId: new FormControl(epicrysisRawValue.nutritionistId),
      customerId: new FormControl(epicrysisRawValue.customerId),
      customerName: new FormControl(epicrysisRawValue.customerName),
      nutritionistNotes: new FormControl(epicrysisRawValue.nutritionistNotes, {
        validators: [Validators.maxLength(1024)],
      }),
      createdDate: new FormControl(epicrysisRawValue.createdDate),
      consultings: new FormControl(epicrysisRawValue.consultings ?? []),
    });
  }

  getEpicrysis(form: EpicrysisFormGroup): IEpicrysis | NewEpicrysis {
    return form.getRawValue() as IEpicrysis | NewEpicrysis;
  }

  resetForm(form: EpicrysisFormGroup, epicrysis: EpicrysisFormGroupInput): void {
    const epicrysisRawValue = { ...this.getFormDefaults(), ...epicrysis };
    form.reset(
      {
        ...epicrysisRawValue,
        id: { value: epicrysisRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EpicrysisFormDefaults {
    return {
      id: null,
      consultings: [],
    };
  }
}
