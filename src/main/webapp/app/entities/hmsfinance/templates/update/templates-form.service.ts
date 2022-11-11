import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITemplates, NewTemplates } from '../templates.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITemplates for edit and NewTemplatesFormGroupInput for create.
 */
type TemplatesFormGroupInput = ITemplates | PartialWithRequiredKeyOf<NewTemplates>;

type TemplatesFormDefaults = Pick<NewTemplates, 'id' | 'isActive' | 'templateItems'>;

type TemplatesFormGroupContent = {
  id: FormControl<ITemplates['id'] | NewTemplates['id']>;
  name: FormControl<ITemplates['name']>;
  type: FormControl<ITemplates['type']>;
  explanation: FormControl<ITemplates['explanation']>;
  isActive: FormControl<ITemplates['isActive']>;
  createdDate: FormControl<ITemplates['createdDate']>;
  templateItems: FormControl<ITemplates['templateItems']>;
};

export type TemplatesFormGroup = FormGroup<TemplatesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TemplatesFormService {
  createTemplatesFormGroup(templates: TemplatesFormGroupInput = { id: null }): TemplatesFormGroup {
    const templatesRawValue = {
      ...this.getFormDefaults(),
      ...templates,
    };
    return new FormGroup<TemplatesFormGroupContent>({
      id: new FormControl(
        { value: templatesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(templatesRawValue.name),
      type: new FormControl(templatesRawValue.type),
      explanation: new FormControl(templatesRawValue.explanation),
      isActive: new FormControl(templatesRawValue.isActive),
      createdDate: new FormControl(templatesRawValue.createdDate),
      templateItems: new FormControl(templatesRawValue.templateItems ?? []),
    });
  }

  getTemplates(form: TemplatesFormGroup): ITemplates | NewTemplates {
    return form.getRawValue() as ITemplates | NewTemplates;
  }

  resetForm(form: TemplatesFormGroup, templates: TemplatesFormGroupInput): void {
    const templatesRawValue = { ...this.getFormDefaults(), ...templates };
    form.reset(
      {
        ...templatesRawValue,
        id: { value: templatesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TemplatesFormDefaults {
    return {
      id: null,
      isActive: false,
      templateItems: [],
    };
  }
}
