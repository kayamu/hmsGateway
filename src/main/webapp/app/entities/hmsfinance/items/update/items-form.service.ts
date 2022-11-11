import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IItems, NewItems } from '../items.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItems for edit and NewItemsFormGroupInput for create.
 */
type ItemsFormGroupInput = IItems | PartialWithRequiredKeyOf<NewItems>;

type ItemsFormDefaults = Pick<NewItems, 'id' | 'isActive'>;

type ItemsFormGroupContent = {
  id: FormControl<IItems['id'] | NewItems['id']>;
  name: FormControl<IItems['name']>;
  itemId: FormControl<IItems['itemId']>;
  itemCode: FormControl<IItems['itemCode']>;
  type: FormControl<IItems['type']>;
  explain: FormControl<IItems['explain']>;
  cost: FormControl<IItems['cost']>;
  price: FormControl<IItems['price']>;
  isActive: FormControl<IItems['isActive']>;
  createdDate: FormControl<IItems['createdDate']>;
  templates: FormControl<IItems['templates']>;
};

export type ItemsFormGroup = FormGroup<ItemsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemsFormService {
  createItemsFormGroup(items: ItemsFormGroupInput = { id: null }): ItemsFormGroup {
    const itemsRawValue = {
      ...this.getFormDefaults(),
      ...items,
    };
    return new FormGroup<ItemsFormGroupContent>({
      id: new FormControl(
        { value: itemsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(itemsRawValue.name),
      itemId: new FormControl(itemsRawValue.itemId),
      itemCode: new FormControl(itemsRawValue.itemCode),
      type: new FormControl(itemsRawValue.type),
      explain: new FormControl(itemsRawValue.explain),
      cost: new FormControl(itemsRawValue.cost),
      price: new FormControl(itemsRawValue.price),
      isActive: new FormControl(itemsRawValue.isActive),
      createdDate: new FormControl(itemsRawValue.createdDate),
      templates: new FormControl(itemsRawValue.templates),
    });
  }

  getItems(form: ItemsFormGroup): IItems | NewItems {
    return form.getRawValue() as IItems | NewItems;
  }

  resetForm(form: ItemsFormGroup, items: ItemsFormGroupInput): void {
    const itemsRawValue = { ...this.getFormDefaults(), ...items };
    form.reset(
      {
        ...itemsRawValue,
        id: { value: itemsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ItemsFormDefaults {
    return {
      id: null,
      isActive: false,
    };
  }
}
