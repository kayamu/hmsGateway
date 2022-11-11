import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDeliveryTransactions, NewDeliveryTransactions } from '../delivery-transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDeliveryTransactions for edit and NewDeliveryTransactionsFormGroupInput for create.
 */
type DeliveryTransactionsFormGroupInput = IDeliveryTransactions | PartialWithRequiredKeyOf<NewDeliveryTransactions>;

type DeliveryTransactionsFormDefaults = Pick<NewDeliveryTransactions, 'id' | 'deliveryOrders'>;

type DeliveryTransactionsFormGroupContent = {
  id: FormControl<IDeliveryTransactions['id'] | NewDeliveryTransactions['id']>;
  statusChangedDate: FormControl<IDeliveryTransactions['statusChangedDate']>;
  transactionDate: FormControl<IDeliveryTransactions['transactionDate']>;
  type: FormControl<IDeliveryTransactions['type']>;
  createdDate: FormControl<IDeliveryTransactions['createdDate']>;
  deliveryOrders: FormControl<IDeliveryTransactions['deliveryOrders']>;
};

export type DeliveryTransactionsFormGroup = FormGroup<DeliveryTransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryTransactionsFormService {
  createDeliveryTransactionsFormGroup(
    deliveryTransactions: DeliveryTransactionsFormGroupInput = { id: null }
  ): DeliveryTransactionsFormGroup {
    const deliveryTransactionsRawValue = {
      ...this.getFormDefaults(),
      ...deliveryTransactions,
    };
    return new FormGroup<DeliveryTransactionsFormGroupContent>({
      id: new FormControl(
        { value: deliveryTransactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      statusChangedDate: new FormControl(deliveryTransactionsRawValue.statusChangedDate),
      transactionDate: new FormControl(deliveryTransactionsRawValue.transactionDate),
      type: new FormControl(deliveryTransactionsRawValue.type),
      createdDate: new FormControl(deliveryTransactionsRawValue.createdDate),
      deliveryOrders: new FormControl(deliveryTransactionsRawValue.deliveryOrders ?? []),
    });
  }

  getDeliveryTransactions(form: DeliveryTransactionsFormGroup): IDeliveryTransactions | NewDeliveryTransactions {
    return form.getRawValue() as IDeliveryTransactions | NewDeliveryTransactions;
  }

  resetForm(form: DeliveryTransactionsFormGroup, deliveryTransactions: DeliveryTransactionsFormGroupInput): void {
    const deliveryTransactionsRawValue = { ...this.getFormDefaults(), ...deliveryTransactions };
    form.reset(
      {
        ...deliveryTransactionsRawValue,
        id: { value: deliveryTransactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeliveryTransactionsFormDefaults {
    return {
      id: null,
      deliveryOrders: [],
    };
  }
}
