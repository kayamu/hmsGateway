import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDeliveryOrders, NewDeliveryOrders } from '../delivery-orders.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDeliveryOrders for edit and NewDeliveryOrdersFormGroupInput for create.
 */
type DeliveryOrdersFormGroupInput = IDeliveryOrders | PartialWithRequiredKeyOf<NewDeliveryOrders>;

type DeliveryOrdersFormDefaults = Pick<NewDeliveryOrders, 'id' | 'deliveryTransactions'>;

type DeliveryOrdersFormGroupContent = {
  id: FormControl<IDeliveryOrders['id'] | NewDeliveryOrders['id']>;
  deliveryId: FormControl<IDeliveryOrders['deliveryId']>;
  invoiceNumber: FormControl<IDeliveryOrders['invoiceNumber']>;
  contactId: FormControl<IDeliveryOrders['contactId']>;
  contactName: FormControl<IDeliveryOrders['contactName']>;
  contactAddressId: FormControl<IDeliveryOrders['contactAddressId']>;
  contactCartId: FormControl<IDeliveryOrders['contactCartId']>;
  deliveryDate: FormControl<IDeliveryOrders['deliveryDate']>;
  requestDate: FormControl<IDeliveryOrders['requestDate']>;
  menuItemId: FormControl<IDeliveryOrders['menuItemId']>;
  menuItemName: FormControl<IDeliveryOrders['menuItemName']>;
  menuItemCode: FormControl<IDeliveryOrders['menuItemCode']>;
  lineNumber: FormControl<IDeliveryOrders['lineNumber']>;
  detail: FormControl<IDeliveryOrders['detail']>;
  message: FormControl<IDeliveryOrders['message']>;
  createdDate: FormControl<IDeliveryOrders['createdDate']>;
  deliveryTransactions: FormControl<IDeliveryOrders['deliveryTransactions']>;
};

export type DeliveryOrdersFormGroup = FormGroup<DeliveryOrdersFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryOrdersFormService {
  createDeliveryOrdersFormGroup(deliveryOrders: DeliveryOrdersFormGroupInput = { id: null }): DeliveryOrdersFormGroup {
    const deliveryOrdersRawValue = {
      ...this.getFormDefaults(),
      ...deliveryOrders,
    };
    return new FormGroup<DeliveryOrdersFormGroupContent>({
      id: new FormControl(
        { value: deliveryOrdersRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      deliveryId: new FormControl(deliveryOrdersRawValue.deliveryId),
      invoiceNumber: new FormControl(deliveryOrdersRawValue.invoiceNumber),
      contactId: new FormControl(deliveryOrdersRawValue.contactId),
      contactName: new FormControl(deliveryOrdersRawValue.contactName),
      contactAddressId: new FormControl(deliveryOrdersRawValue.contactAddressId),
      contactCartId: new FormControl(deliveryOrdersRawValue.contactCartId),
      deliveryDate: new FormControl(deliveryOrdersRawValue.deliveryDate),
      requestDate: new FormControl(deliveryOrdersRawValue.requestDate),
      menuItemId: new FormControl(deliveryOrdersRawValue.menuItemId),
      menuItemName: new FormControl(deliveryOrdersRawValue.menuItemName),
      menuItemCode: new FormControl(deliveryOrdersRawValue.menuItemCode),
      lineNumber: new FormControl(deliveryOrdersRawValue.lineNumber),
      detail: new FormControl(deliveryOrdersRawValue.detail),
      message: new FormControl(deliveryOrdersRawValue.message, {
        validators: [Validators.maxLength(1024)],
      }),
      createdDate: new FormControl(deliveryOrdersRawValue.createdDate),
      deliveryTransactions: new FormControl(deliveryOrdersRawValue.deliveryTransactions ?? []),
    });
  }

  getDeliveryOrders(form: DeliveryOrdersFormGroup): IDeliveryOrders | NewDeliveryOrders {
    return form.getRawValue() as IDeliveryOrders | NewDeliveryOrders;
  }

  resetForm(form: DeliveryOrdersFormGroup, deliveryOrders: DeliveryOrdersFormGroupInput): void {
    const deliveryOrdersRawValue = { ...this.getFormDefaults(), ...deliveryOrders };
    form.reset(
      {
        ...deliveryOrdersRawValue,
        id: { value: deliveryOrdersRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeliveryOrdersFormDefaults {
    return {
      id: null,
      deliveryTransactions: [],
    };
  }
}
