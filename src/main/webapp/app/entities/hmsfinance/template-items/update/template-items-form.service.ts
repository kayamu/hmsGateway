import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITemplateItems, NewTemplateItems } from '../template-items.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITemplateItems for edit and NewTemplateItemsFormGroupInput for create.
 */
type TemplateItemsFormGroupInput = ITemplateItems | PartialWithRequiredKeyOf<NewTemplateItems>;

type TemplateItemsFormDefaults = Pick<NewTemplateItems, 'id' | 'isOnce' | 'templates'>;

type TemplateItemsFormGroupContent = {
  id: FormControl<ITemplateItems['id'] | NewTemplateItems['id']>;
  name: FormControl<ITemplateItems['name']>;
  code: FormControl<ITemplateItems['code']>;
  type: FormControl<ITemplateItems['type']>;
  valueType: FormControl<ITemplateItems['valueType']>;
  amount: FormControl<ITemplateItems['amount']>;
  explanation: FormControl<ITemplateItems['explanation']>;
  startDate: FormControl<ITemplateItems['startDate']>;
  dueDate: FormControl<ITemplateItems['dueDate']>;
  isOnce: FormControl<ITemplateItems['isOnce']>;
  createdDate: FormControl<ITemplateItems['createdDate']>;
  conditions: FormControl<ITemplateItems['conditions']>;
  templates: FormControl<ITemplateItems['templates']>;
};

export type TemplateItemsFormGroup = FormGroup<TemplateItemsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TemplateItemsFormService {
  createTemplateItemsFormGroup(templateItems: TemplateItemsFormGroupInput = { id: null }): TemplateItemsFormGroup {
    const templateItemsRawValue = {
      ...this.getFormDefaults(),
      ...templateItems,
    };
    return new FormGroup<TemplateItemsFormGroupContent>({
      id: new FormControl(
        { value: templateItemsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(templateItemsRawValue.name),
      code: new FormControl(templateItemsRawValue.code),
      type: new FormControl(templateItemsRawValue.type),
      valueType: new FormControl(templateItemsRawValue.valueType),
      amount: new FormControl(templateItemsRawValue.amount),
      explanation: new FormControl(templateItemsRawValue.explanation),
      startDate: new FormControl(templateItemsRawValue.startDate),
      dueDate: new FormControl(templateItemsRawValue.dueDate),
      isOnce: new FormControl(templateItemsRawValue.isOnce),
      createdDate: new FormControl(templateItemsRawValue.createdDate),
      conditions: new FormControl(templateItemsRawValue.conditions),
      templates: new FormControl(templateItemsRawValue.templates ?? []),
    });
  }

  getTemplateItems(form: TemplateItemsFormGroup): ITemplateItems | NewTemplateItems {
    return form.getRawValue() as ITemplateItems | NewTemplateItems;
  }

  resetForm(form: TemplateItemsFormGroup, templateItems: TemplateItemsFormGroupInput): void {
    const templateItemsRawValue = { ...this.getFormDefaults(), ...templateItems };
    form.reset(
      {
        ...templateItemsRawValue,
        id: { value: templateItemsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TemplateItemsFormDefaults {
    return {
      id: null,
      isOnce: false,
      templates: [],
    };
  }
}
