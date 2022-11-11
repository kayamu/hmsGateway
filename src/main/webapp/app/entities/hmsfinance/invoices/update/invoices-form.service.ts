import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInvoices, NewInvoices } from '../invoices.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInvoices for edit and NewInvoicesFormGroupInput for create.
 */
type InvoicesFormGroupInput = IInvoices | PartialWithRequiredKeyOf<NewInvoices>;

type InvoicesFormDefaults = Pick<NewInvoices, 'id' | 'invoiceDetails'>;

type InvoicesFormGroupContent = {
  id: FormControl<IInvoices['id'] | NewInvoices['id']>;
  invoiceNumber: FormControl<IInvoices['invoiceNumber']>;
  contactId: FormControl<IInvoices['contactId']>;
  contactAddressId: FormControl<IInvoices['contactAddressId']>;
  contactBillingAdrId: FormControl<IInvoices['contactBillingAdrId']>;
  cartId: FormControl<IInvoices['cartId']>;
  type: FormControl<IInvoices['type']>;
  requestDate: FormControl<IInvoices['requestDate']>;
  contactName: FormControl<IInvoices['contactName']>;
  invoiceDate: FormControl<IInvoices['invoiceDate']>;
  lastTranactionId: FormControl<IInvoices['lastTranactionId']>;
  totalCost: FormControl<IInvoices['totalCost']>;
  totalProfit: FormControl<IInvoices['totalProfit']>;
  totalAmount: FormControl<IInvoices['totalAmount']>;
  totalTaxes: FormControl<IInvoices['totalTaxes']>;
  fedaralTaxesAmount: FormControl<IInvoices['fedaralTaxesAmount']>;
  provintionalTaxesAmount: FormControl<IInvoices['provintionalTaxesAmount']>;
  discountsAmount: FormControl<IInvoices['discountsAmount']>;
  addOnAmount: FormControl<IInvoices['addOnAmount']>;
  message: FormControl<IInvoices['message']>;
  createdDate: FormControl<IInvoices['createdDate']>;
  invoiceDetails: FormControl<IInvoices['invoiceDetails']>;
};

export type InvoicesFormGroup = FormGroup<InvoicesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InvoicesFormService {
  createInvoicesFormGroup(invoices: InvoicesFormGroupInput = { id: null }): InvoicesFormGroup {
    const invoicesRawValue = {
      ...this.getFormDefaults(),
      ...invoices,
    };
    return new FormGroup<InvoicesFormGroupContent>({
      id: new FormControl(
        { value: invoicesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      invoiceNumber: new FormControl(invoicesRawValue.invoiceNumber),
      contactId: new FormControl(invoicesRawValue.contactId),
      contactAddressId: new FormControl(invoicesRawValue.contactAddressId),
      contactBillingAdrId: new FormControl(invoicesRawValue.contactBillingAdrId),
      cartId: new FormControl(invoicesRawValue.cartId),
      type: new FormControl(invoicesRawValue.type),
      requestDate: new FormControl(invoicesRawValue.requestDate),
      contactName: new FormControl(invoicesRawValue.contactName),
      invoiceDate: new FormControl(invoicesRawValue.invoiceDate),
      lastTranactionId: new FormControl(invoicesRawValue.lastTranactionId),
      totalCost: new FormControl(invoicesRawValue.totalCost),
      totalProfit: new FormControl(invoicesRawValue.totalProfit),
      totalAmount: new FormControl(invoicesRawValue.totalAmount),
      totalTaxes: new FormControl(invoicesRawValue.totalTaxes),
      fedaralTaxesAmount: new FormControl(invoicesRawValue.fedaralTaxesAmount),
      provintionalTaxesAmount: new FormControl(invoicesRawValue.provintionalTaxesAmount),
      discountsAmount: new FormControl(invoicesRawValue.discountsAmount),
      addOnAmount: new FormControl(invoicesRawValue.addOnAmount),
      message: new FormControl(invoicesRawValue.message, {
        validators: [Validators.maxLength(1024)],
      }),
      createdDate: new FormControl(invoicesRawValue.createdDate),
      invoiceDetails: new FormControl(invoicesRawValue.invoiceDetails ?? []),
    });
  }

  getInvoices(form: InvoicesFormGroup): IInvoices | NewInvoices {
    return form.getRawValue() as IInvoices | NewInvoices;
  }

  resetForm(form: InvoicesFormGroup, invoices: InvoicesFormGroupInput): void {
    const invoicesRawValue = { ...this.getFormDefaults(), ...invoices };
    form.reset(
      {
        ...invoicesRawValue,
        id: { value: invoicesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InvoicesFormDefaults {
    return {
      id: null,
      invoiceDetails: [],
    };
  }
}
