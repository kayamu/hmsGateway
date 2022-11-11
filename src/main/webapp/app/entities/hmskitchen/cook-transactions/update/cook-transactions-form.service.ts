import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICookTransactions, NewCookTransactions } from '../cook-transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICookTransactions for edit and NewCookTransactionsFormGroupInput for create.
 */
type CookTransactionsFormGroupInput = ICookTransactions | PartialWithRequiredKeyOf<NewCookTransactions>;

type CookTransactionsFormDefaults = Pick<NewCookTransactions, 'id' | 'cookOrders'>;

type CookTransactionsFormGroupContent = {
  id: FormControl<ICookTransactions['id'] | NewCookTransactions['id']>;
  kitchenId: FormControl<ICookTransactions['kitchenId']>;
  statusChangedDate: FormControl<ICookTransactions['statusChangedDate']>;
  transactionDate: FormControl<ICookTransactions['transactionDate']>;
  type: FormControl<ICookTransactions['type']>;
  createdDate: FormControl<ICookTransactions['createdDate']>;
  cookOrders: FormControl<ICookTransactions['cookOrders']>;
};

export type CookTransactionsFormGroup = FormGroup<CookTransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CookTransactionsFormService {
  createCookTransactionsFormGroup(cookTransactions: CookTransactionsFormGroupInput = { id: null }): CookTransactionsFormGroup {
    const cookTransactionsRawValue = {
      ...this.getFormDefaults(),
      ...cookTransactions,
    };
    return new FormGroup<CookTransactionsFormGroupContent>({
      id: new FormControl(
        { value: cookTransactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      kitchenId: new FormControl(cookTransactionsRawValue.kitchenId),
      statusChangedDate: new FormControl(cookTransactionsRawValue.statusChangedDate),
      transactionDate: new FormControl(cookTransactionsRawValue.transactionDate),
      type: new FormControl(cookTransactionsRawValue.type),
      createdDate: new FormControl(cookTransactionsRawValue.createdDate),
      cookOrders: new FormControl(cookTransactionsRawValue.cookOrders ?? []),
    });
  }

  getCookTransactions(form: CookTransactionsFormGroup): ICookTransactions | NewCookTransactions {
    return form.getRawValue() as ICookTransactions | NewCookTransactions;
  }

  resetForm(form: CookTransactionsFormGroup, cookTransactions: CookTransactionsFormGroupInput): void {
    const cookTransactionsRawValue = { ...this.getFormDefaults(), ...cookTransactions };
    form.reset(
      {
        ...cookTransactionsRawValue,
        id: { value: cookTransactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CookTransactionsFormDefaults {
    return {
      id: null,
      cookOrders: [],
    };
  }
}
