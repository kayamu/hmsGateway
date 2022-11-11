import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMenus, NewMenus } from '../menus.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMenus for edit and NewMenusFormGroupInput for create.
 */
type MenusFormGroupInput = IMenus | PartialWithRequiredKeyOf<NewMenus>;

type MenusFormDefaults = Pick<NewMenus, 'id' | 'imagesUrls' | 'meals' | 'menuGroups'>;

type MenusFormGroupContent = {
  id: FormControl<IMenus['id'] | NewMenus['id']>;
  name: FormControl<IMenus['name']>;
  menuDay: FormControl<IMenus['menuDay']>;
  menuTime: FormControl<IMenus['menuTime']>;
  contactId: FormControl<IMenus['contactId']>;
  cost: FormControl<IMenus['cost']>;
  salesPrice: FormControl<IMenus['salesPrice']>;
  explanation: FormControl<IMenus['explanation']>;
  createdDate: FormControl<IMenus['createdDate']>;
  imagesUrls: FormControl<IMenus['imagesUrls']>;
  meals: FormControl<IMenus['meals']>;
  nutriens: FormControl<IMenus['nutriens']>;
  menuGroups: FormControl<IMenus['menuGroups']>;
};

export type MenusFormGroup = FormGroup<MenusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MenusFormService {
  createMenusFormGroup(menus: MenusFormGroupInput = { id: null }): MenusFormGroup {
    const menusRawValue = {
      ...this.getFormDefaults(),
      ...menus,
    };
    return new FormGroup<MenusFormGroupContent>({
      id: new FormControl(
        { value: menusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(menusRawValue.name),
      menuDay: new FormControl(menusRawValue.menuDay),
      menuTime: new FormControl(menusRawValue.menuTime),
      contactId: new FormControl(menusRawValue.contactId),
      cost: new FormControl(menusRawValue.cost),
      salesPrice: new FormControl(menusRawValue.salesPrice),
      explanation: new FormControl(menusRawValue.explanation),
      createdDate: new FormControl(menusRawValue.createdDate),
      imagesUrls: new FormControl(menusRawValue.imagesUrls ?? []),
      meals: new FormControl(menusRawValue.meals ?? []),
      nutriens: new FormControl(menusRawValue.nutriens),
      menuGroups: new FormControl(menusRawValue.menuGroups ?? []),
    });
  }

  getMenus(form: MenusFormGroup): IMenus | NewMenus {
    return form.getRawValue() as IMenus | NewMenus;
  }

  resetForm(form: MenusFormGroup, menus: MenusFormGroupInput): void {
    const menusRawValue = { ...this.getFormDefaults(), ...menus };
    form.reset(
      {
        ...menusRawValue,
        id: { value: menusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MenusFormDefaults {
    return {
      id: null,
      imagesUrls: [],
      meals: [],
      menuGroups: [],
    };
  }
}
