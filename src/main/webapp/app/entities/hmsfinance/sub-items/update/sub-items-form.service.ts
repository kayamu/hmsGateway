import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISubItems, NewSubItems } from '../sub-items.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISubItems for edit and NewSubItemsFormGroupInput for create.
 */
type SubItemsFormGroupInput = ISubItems | PartialWithRequiredKeyOf<NewSubItems>;

type SubItemsFormDefaults = Pick<NewSubItems, 'id' | 'invoiceDetails'>;

type SubItemsFormGroupContent = {
  id: FormControl<ISubItems['id'] | NewSubItems['id']>;
  name: FormControl<ISubItems['name']>;
  actualValue: FormControl<ISubItems['actualValue']>;
  percentage: FormControl<ISubItems['percentage']>;
  baseValue: FormControl<ISubItems['baseValue']>;
  type: FormControl<ISubItems['type']>;
  valueType: FormControl<ISubItems['valueType']>;
  calculatedValue: FormControl<ISubItems['calculatedValue']>;
  templateItemId: FormControl<ISubItems['templateItemId']>;
  createdDate: FormControl<ISubItems['createdDate']>;
  invoiceDetails: FormControl<ISubItems['invoiceDetails']>;
};

export type SubItemsFormGroup = FormGroup<SubItemsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SubItemsFormService {
  createSubItemsFormGroup(subItems: SubItemsFormGroupInput = { id: null }): SubItemsFormGroup {
    const subItemsRawValue = {
      ...this.getFormDefaults(),
      ...subItems,
    };
    return new FormGroup<SubItemsFormGroupContent>({
      id: new FormControl(
        { value: subItemsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(subItemsRawValue.name),
      actualValue: new FormControl(subItemsRawValue.actualValue),
      percentage: new FormControl(subItemsRawValue.percentage),
      baseValue: new FormControl(subItemsRawValue.baseValue),
      type: new FormControl(subItemsRawValue.type),
      valueType: new FormControl(subItemsRawValue.valueType),
      calculatedValue: new FormControl(subItemsRawValue.calculatedValue),
      templateItemId: new FormControl(subItemsRawValue.templateItemId),
      createdDate: new FormControl(subItemsRawValue.createdDate),
      invoiceDetails: new FormControl(subItemsRawValue.invoiceDetails ?? []),
    });
  }

  getSubItems(form: SubItemsFormGroup): ISubItems | NewSubItems {
    return form.getRawValue() as ISubItems | NewSubItems;
  }

  resetForm(form: SubItemsFormGroup, subItems: SubItemsFormGroupInput): void {
    const subItemsRawValue = { ...this.getFormDefaults(), ...subItems };
    form.reset(
      {
        ...subItemsRawValue,
        id: { value: subItemsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SubItemsFormDefaults {
    return {
      id: null,
      invoiceDetails: [],
    };
  }
}
