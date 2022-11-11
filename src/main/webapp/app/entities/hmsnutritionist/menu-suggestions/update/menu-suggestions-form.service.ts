import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMenuSuggestions, NewMenuSuggestions } from '../menu-suggestions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMenuSuggestions for edit and NewMenuSuggestionsFormGroupInput for create.
 */
type MenuSuggestionsFormGroupInput = IMenuSuggestions | PartialWithRequiredKeyOf<NewMenuSuggestions>;

type MenuSuggestionsFormDefaults = Pick<NewMenuSuggestions, 'id' | 'consultings'>;

type MenuSuggestionsFormGroupContent = {
  id: FormControl<IMenuSuggestions['id'] | NewMenuSuggestions['id']>;
  name: FormControl<IMenuSuggestions['name']>;
  nutritionistId: FormControl<IMenuSuggestions['nutritionistId']>;
  customerId: FormControl<IMenuSuggestions['customerId']>;
  menuGroupId: FormControl<IMenuSuggestions['menuGroupId']>;
  notes: FormControl<IMenuSuggestions['notes']>;
  createdDate: FormControl<IMenuSuggestions['createdDate']>;
  consultings: FormControl<IMenuSuggestions['consultings']>;
};

export type MenuSuggestionsFormGroup = FormGroup<MenuSuggestionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MenuSuggestionsFormService {
  createMenuSuggestionsFormGroup(menuSuggestions: MenuSuggestionsFormGroupInput = { id: null }): MenuSuggestionsFormGroup {
    const menuSuggestionsRawValue = {
      ...this.getFormDefaults(),
      ...menuSuggestions,
    };
    return new FormGroup<MenuSuggestionsFormGroupContent>({
      id: new FormControl(
        { value: menuSuggestionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(menuSuggestionsRawValue.name),
      nutritionistId: new FormControl(menuSuggestionsRawValue.nutritionistId),
      customerId: new FormControl(menuSuggestionsRawValue.customerId),
      menuGroupId: new FormControl(menuSuggestionsRawValue.menuGroupId),
      notes: new FormControl(menuSuggestionsRawValue.notes, {
        validators: [Validators.maxLength(1024)],
      }),
      createdDate: new FormControl(menuSuggestionsRawValue.createdDate),
      consultings: new FormControl(menuSuggestionsRawValue.consultings ?? []),
    });
  }

  getMenuSuggestions(form: MenuSuggestionsFormGroup): IMenuSuggestions | NewMenuSuggestions {
    return form.getRawValue() as IMenuSuggestions | NewMenuSuggestions;
  }

  resetForm(form: MenuSuggestionsFormGroup, menuSuggestions: MenuSuggestionsFormGroupInput): void {
    const menuSuggestionsRawValue = { ...this.getFormDefaults(), ...menuSuggestions };
    form.reset(
      {
        ...menuSuggestionsRawValue,
        id: { value: menuSuggestionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MenuSuggestionsFormDefaults {
    return {
      id: null,
      consultings: [],
    };
  }
}
