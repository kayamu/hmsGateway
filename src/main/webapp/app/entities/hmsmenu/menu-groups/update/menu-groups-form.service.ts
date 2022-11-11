import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMenuGroups, NewMenuGroups } from '../menu-groups.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMenuGroups for edit and NewMenuGroupsFormGroupInput for create.
 */
type MenuGroupsFormGroupInput = IMenuGroups | PartialWithRequiredKeyOf<NewMenuGroups>;

type MenuGroupsFormDefaults = Pick<NewMenuGroups, 'id' | 'ingradients' | 'menus' | 'imagesUrls'>;

type MenuGroupsFormGroupContent = {
  id: FormControl<IMenuGroups['id'] | NewMenuGroups['id']>;
  contactId: FormControl<IMenuGroups['contactId']>;
  name: FormControl<IMenuGroups['name']>;
  cost: FormControl<IMenuGroups['cost']>;
  salesPrice: FormControl<IMenuGroups['salesPrice']>;
  explanation: FormControl<IMenuGroups['explanation']>;
  goal: FormControl<IMenuGroups['goal']>;
  bodyType: FormControl<IMenuGroups['bodyType']>;
  activityLevelMin: FormControl<IMenuGroups['activityLevelMin']>;
  activityLevelMax: FormControl<IMenuGroups['activityLevelMax']>;
  weightMin: FormControl<IMenuGroups['weightMin']>;
  weightMax: FormControl<IMenuGroups['weightMax']>;
  dailyKcalMin: FormControl<IMenuGroups['dailyKcalMin']>;
  dailyKcalMax: FormControl<IMenuGroups['dailyKcalMax']>;
  targetWeightMin: FormControl<IMenuGroups['targetWeightMin']>;
  targetWeightMax: FormControl<IMenuGroups['targetWeightMax']>;
  unit: FormControl<IMenuGroups['unit']>;
  createdDate: FormControl<IMenuGroups['createdDate']>;
  ingradients: FormControl<IMenuGroups['ingradients']>;
  menus: FormControl<IMenuGroups['menus']>;
  imagesUrls: FormControl<IMenuGroups['imagesUrls']>;
  nutriens: FormControl<IMenuGroups['nutriens']>;
};

export type MenuGroupsFormGroup = FormGroup<MenuGroupsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MenuGroupsFormService {
  createMenuGroupsFormGroup(menuGroups: MenuGroupsFormGroupInput = { id: null }): MenuGroupsFormGroup {
    const menuGroupsRawValue = {
      ...this.getFormDefaults(),
      ...menuGroups,
    };
    return new FormGroup<MenuGroupsFormGroupContent>({
      id: new FormControl(
        { value: menuGroupsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contactId: new FormControl(menuGroupsRawValue.contactId),
      name: new FormControl(menuGroupsRawValue.name),
      cost: new FormControl(menuGroupsRawValue.cost),
      salesPrice: new FormControl(menuGroupsRawValue.salesPrice),
      explanation: new FormControl(menuGroupsRawValue.explanation),
      goal: new FormControl(menuGroupsRawValue.goal),
      bodyType: new FormControl(menuGroupsRawValue.bodyType),
      activityLevelMin: new FormControl(menuGroupsRawValue.activityLevelMin, {
        validators: [Validators.min(1), Validators.max(10)],
      }),
      activityLevelMax: new FormControl(menuGroupsRawValue.activityLevelMax, {
        validators: [Validators.min(1), Validators.max(10)],
      }),
      weightMin: new FormControl(menuGroupsRawValue.weightMin),
      weightMax: new FormControl(menuGroupsRawValue.weightMax),
      dailyKcalMin: new FormControl(menuGroupsRawValue.dailyKcalMin),
      dailyKcalMax: new FormControl(menuGroupsRawValue.dailyKcalMax),
      targetWeightMin: new FormControl(menuGroupsRawValue.targetWeightMin),
      targetWeightMax: new FormControl(menuGroupsRawValue.targetWeightMax),
      unit: new FormControl(menuGroupsRawValue.unit),
      createdDate: new FormControl(menuGroupsRawValue.createdDate),
      ingradients: new FormControl(menuGroupsRawValue.ingradients ?? []),
      menus: new FormControl(menuGroupsRawValue.menus ?? []),
      imagesUrls: new FormControl(menuGroupsRawValue.imagesUrls ?? []),
      nutriens: new FormControl(menuGroupsRawValue.nutriens),
    });
  }

  getMenuGroups(form: MenuGroupsFormGroup): IMenuGroups | NewMenuGroups {
    return form.getRawValue() as IMenuGroups | NewMenuGroups;
  }

  resetForm(form: MenuGroupsFormGroup, menuGroups: MenuGroupsFormGroupInput): void {
    const menuGroupsRawValue = { ...this.getFormDefaults(), ...menuGroups };
    form.reset(
      {
        ...menuGroupsRawValue,
        id: { value: menuGroupsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MenuGroupsFormDefaults {
    return {
      id: null,
      ingradients: [],
      menus: [],
      imagesUrls: [],
    };
  }
}
