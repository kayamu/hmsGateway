import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConsultings, NewConsultings } from '../consultings.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConsultings for edit and NewConsultingsFormGroupInput for create.
 */
type ConsultingsFormGroupInput = IConsultings | PartialWithRequiredKeyOf<NewConsultings>;

type ConsultingsFormDefaults = Pick<NewConsultings, 'id' | 'epicryses' | 'menuSuggestions'>;

type ConsultingsFormGroupContent = {
  id: FormControl<IConsultings['id'] | NewConsultings['id']>;
  customerId: FormControl<IConsultings['customerId']>;
  custmerName: FormControl<IConsultings['custmerName']>;
  nutritionistId: FormControl<IConsultings['nutritionistId']>;
  nutritionistName: FormControl<IConsultings['nutritionistName']>;
  nutritionistNotes: FormControl<IConsultings['nutritionistNotes']>;
  lastStatus: FormControl<IConsultings['lastStatus']>;
  createdDate: FormControl<IConsultings['createdDate']>;
  epicryses: FormControl<IConsultings['epicryses']>;
  menuSuggestions: FormControl<IConsultings['menuSuggestions']>;
  consultingStatus: FormControl<IConsultings['consultingStatus']>;
};

export type ConsultingsFormGroup = FormGroup<ConsultingsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConsultingsFormService {
  createConsultingsFormGroup(consultings: ConsultingsFormGroupInput = { id: null }): ConsultingsFormGroup {
    const consultingsRawValue = {
      ...this.getFormDefaults(),
      ...consultings,
    };
    return new FormGroup<ConsultingsFormGroupContent>({
      id: new FormControl(
        { value: consultingsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      customerId: new FormControl(consultingsRawValue.customerId),
      custmerName: new FormControl(consultingsRawValue.custmerName),
      nutritionistId: new FormControl(consultingsRawValue.nutritionistId),
      nutritionistName: new FormControl(consultingsRawValue.nutritionistName),
      nutritionistNotes: new FormControl(consultingsRawValue.nutritionistNotes, {
        validators: [Validators.maxLength(1024)],
      }),
      lastStatus: new FormControl(consultingsRawValue.lastStatus),
      createdDate: new FormControl(consultingsRawValue.createdDate),
      epicryses: new FormControl(consultingsRawValue.epicryses ?? []),
      menuSuggestions: new FormControl(consultingsRawValue.menuSuggestions ?? []),
      consultingStatus: new FormControl(consultingsRawValue.consultingStatus),
    });
  }

  getConsultings(form: ConsultingsFormGroup): IConsultings | NewConsultings {
    return form.getRawValue() as IConsultings | NewConsultings;
  }

  resetForm(form: ConsultingsFormGroup, consultings: ConsultingsFormGroupInput): void {
    const consultingsRawValue = { ...this.getFormDefaults(), ...consultings };
    form.reset(
      {
        ...consultingsRawValue,
        id: { value: consultingsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConsultingsFormDefaults {
    return {
      id: null,
      epicryses: [],
      menuSuggestions: [],
    };
  }
}
