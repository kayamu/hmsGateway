import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICookOrders, NewCookOrders } from '../cook-orders.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICookOrders for edit and NewCookOrdersFormGroupInput for create.
 */
type CookOrdersFormGroupInput = ICookOrders | PartialWithRequiredKeyOf<NewCookOrders>;

type CookOrdersFormDefaults = Pick<NewCookOrders, 'id' | 'cookTransactions'>;

type CookOrdersFormGroupContent = {
  id: FormControl<ICookOrders['id'] | NewCookOrders['id']>;
  kitchenId: FormControl<ICookOrders['kitchenId']>;
  customerId: FormControl<ICookOrders['customerId']>;
  customerCartId: FormControl<ICookOrders['customerCartId']>;
  menuItemId: FormControl<ICookOrders['menuItemId']>;
  menuItemName: FormControl<ICookOrders['menuItemName']>;
  menuItemCode: FormControl<ICookOrders['menuItemCode']>;
  mealId: FormControl<ICookOrders['mealId']>;
  lineNumber: FormControl<ICookOrders['lineNumber']>;
  requestDate: FormControl<ICookOrders['requestDate']>;
  message: FormControl<ICookOrders['message']>;
  createdDate: FormControl<ICookOrders['createdDate']>;
  cookTransactions: FormControl<ICookOrders['cookTransactions']>;
};

export type CookOrdersFormGroup = FormGroup<CookOrdersFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CookOrdersFormService {
  createCookOrdersFormGroup(cookOrders: CookOrdersFormGroupInput = { id: null }): CookOrdersFormGroup {
    const cookOrdersRawValue = {
      ...this.getFormDefaults(),
      ...cookOrders,
    };
    return new FormGroup<CookOrdersFormGroupContent>({
      id: new FormControl(
        { value: cookOrdersRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      kitchenId: new FormControl(cookOrdersRawValue.kitchenId),
      customerId: new FormControl(cookOrdersRawValue.customerId),
      customerCartId: new FormControl(cookOrdersRawValue.customerCartId),
      menuItemId: new FormControl(cookOrdersRawValue.menuItemId),
      menuItemName: new FormControl(cookOrdersRawValue.menuItemName),
      menuItemCode: new FormControl(cookOrdersRawValue.menuItemCode),
      mealId: new FormControl(cookOrdersRawValue.mealId),
      lineNumber: new FormControl(cookOrdersRawValue.lineNumber),
      requestDate: new FormControl(cookOrdersRawValue.requestDate),
      message: new FormControl(cookOrdersRawValue.message, {
        validators: [Validators.maxLength(1024)],
      }),
      createdDate: new FormControl(cookOrdersRawValue.createdDate),
      cookTransactions: new FormControl(cookOrdersRawValue.cookTransactions ?? []),
    });
  }

  getCookOrders(form: CookOrdersFormGroup): ICookOrders | NewCookOrders {
    return form.getRawValue() as ICookOrders | NewCookOrders;
  }

  resetForm(form: CookOrdersFormGroup, cookOrders: CookOrdersFormGroupInput): void {
    const cookOrdersRawValue = { ...this.getFormDefaults(), ...cookOrders };
    form.reset(
      {
        ...cookOrdersRawValue,
        id: { value: cookOrdersRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CookOrdersFormDefaults {
    return {
      id: null,
      cookTransactions: [],
    };
  }
}
