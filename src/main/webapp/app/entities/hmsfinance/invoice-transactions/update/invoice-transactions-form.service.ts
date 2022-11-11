import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInvoiceTransactions, NewInvoiceTransactions } from '../invoice-transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInvoiceTransactions for edit and NewInvoiceTransactionsFormGroupInput for create.
 */
type InvoiceTransactionsFormGroupInput = IInvoiceTransactions | PartialWithRequiredKeyOf<NewInvoiceTransactions>;

type InvoiceTransactionsFormDefaults = Pick<NewInvoiceTransactions, 'id'>;

type InvoiceTransactionsFormGroupContent = {
  id: FormControl<IInvoiceTransactions['id'] | NewInvoiceTransactions['id']>;
  statusChangedDate: FormControl<IInvoiceTransactions['statusChangedDate']>;
  transactionDate: FormControl<IInvoiceTransactions['transactionDate']>;
  type: FormControl<IInvoiceTransactions['type']>;
  createdDate: FormControl<IInvoiceTransactions['createdDate']>;
  invoices: FormControl<IInvoiceTransactions['invoices']>;
};

export type InvoiceTransactionsFormGroup = FormGroup<InvoiceTransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InvoiceTransactionsFormService {
  createInvoiceTransactionsFormGroup(invoiceTransactions: InvoiceTransactionsFormGroupInput = { id: null }): InvoiceTransactionsFormGroup {
    const invoiceTransactionsRawValue = {
      ...this.getFormDefaults(),
      ...invoiceTransactions,
    };
    return new FormGroup<InvoiceTransactionsFormGroupContent>({
      id: new FormControl(
        { value: invoiceTransactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      statusChangedDate: new FormControl(invoiceTransactionsRawValue.statusChangedDate),
      transactionDate: new FormControl(invoiceTransactionsRawValue.transactionDate),
      type: new FormControl(invoiceTransactionsRawValue.type),
      createdDate: new FormControl(invoiceTransactionsRawValue.createdDate),
      invoices: new FormControl(invoiceTransactionsRawValue.invoices),
    });
  }

  getInvoiceTransactions(form: InvoiceTransactionsFormGroup): IInvoiceTransactions | NewInvoiceTransactions {
    return form.getRawValue() as IInvoiceTransactions | NewInvoiceTransactions;
  }

  resetForm(form: InvoiceTransactionsFormGroup, invoiceTransactions: InvoiceTransactionsFormGroupInput): void {
    const invoiceTransactionsRawValue = { ...this.getFormDefaults(), ...invoiceTransactions };
    form.reset(
      {
        ...invoiceTransactionsRawValue,
        id: { value: invoiceTransactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InvoiceTransactionsFormDefaults {
    return {
      id: null,
    };
  }
}
