import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInvoiceDetails, NewInvoiceDetails } from '../invoice-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInvoiceDetails for edit and NewInvoiceDetailsFormGroupInput for create.
 */
type InvoiceDetailsFormGroupInput = IInvoiceDetails | PartialWithRequiredKeyOf<NewInvoiceDetails>;

type InvoiceDetailsFormDefaults = Pick<NewInvoiceDetails, 'id' | 'subItems' | 'invoices'>;

type InvoiceDetailsFormGroupContent = {
  id: FormControl<IInvoiceDetails['id'] | NewInvoiceDetails['id']>;
  contactId: FormControl<IInvoiceDetails['contactId']>;
  cartId: FormControl<IInvoiceDetails['cartId']>;
  itemId: FormControl<IInvoiceDetails['itemId']>;
  itemName: FormControl<IInvoiceDetails['itemName']>;
  itemCode: FormControl<IInvoiceDetails['itemCode']>;
  itemType: FormControl<IInvoiceDetails['itemType']>;
  paymentType: FormControl<IInvoiceDetails['paymentType']>;
  subscriptionStartingDate: FormControl<IInvoiceDetails['subscriptionStartingDate']>;
  subscriptionDurationWeeks: FormControl<IInvoiceDetails['subscriptionDurationWeeks']>;
  detailAmount: FormControl<IInvoiceDetails['detailAmount']>;
  lineNumber: FormControl<IInvoiceDetails['lineNumber']>;
  nutritionistId: FormControl<IInvoiceDetails['nutritionistId']>;
  totalCost: FormControl<IInvoiceDetails['totalCost']>;
  totalProfit: FormControl<IInvoiceDetails['totalProfit']>;
  nutritionistEarning: FormControl<IInvoiceDetails['nutritionistEarning']>;
  nutritionistPercentage: FormControl<IInvoiceDetails['nutritionistPercentage']>;
  fedaralTaxesAmount: FormControl<IInvoiceDetails['fedaralTaxesAmount']>;
  fedaralTaxesPercentage: FormControl<IInvoiceDetails['fedaralTaxesPercentage']>;
  provintionalTaxesAmount: FormControl<IInvoiceDetails['provintionalTaxesAmount']>;
  provintionalTaxesPercentage: FormControl<IInvoiceDetails['provintionalTaxesPercentage']>;
  totalTaxesAmount: FormControl<IInvoiceDetails['totalTaxesAmount']>;
  totalTaxesPercentage: FormControl<IInvoiceDetails['totalTaxesPercentage']>;
  discountAmount: FormControl<IInvoiceDetails['discountAmount']>;
  discountPercentage: FormControl<IInvoiceDetails['discountPercentage']>;
  addOnCode: FormControl<IInvoiceDetails['addOnCode']>;
  addOnAmount: FormControl<IInvoiceDetails['addOnAmount']>;
  addOnPercentage: FormControl<IInvoiceDetails['addOnPercentage']>;
  totalAmount: FormControl<IInvoiceDetails['totalAmount']>;
  createdDate: FormControl<IInvoiceDetails['createdDate']>;
  subItems: FormControl<IInvoiceDetails['subItems']>;
  invoices: FormControl<IInvoiceDetails['invoices']>;
};

export type InvoiceDetailsFormGroup = FormGroup<InvoiceDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InvoiceDetailsFormService {
  createInvoiceDetailsFormGroup(invoiceDetails: InvoiceDetailsFormGroupInput = { id: null }): InvoiceDetailsFormGroup {
    const invoiceDetailsRawValue = {
      ...this.getFormDefaults(),
      ...invoiceDetails,
    };
    return new FormGroup<InvoiceDetailsFormGroupContent>({
      id: new FormControl(
        { value: invoiceDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contactId: new FormControl(invoiceDetailsRawValue.contactId),
      cartId: new FormControl(invoiceDetailsRawValue.cartId),
      itemId: new FormControl(invoiceDetailsRawValue.itemId),
      itemName: new FormControl(invoiceDetailsRawValue.itemName),
      itemCode: new FormControl(invoiceDetailsRawValue.itemCode),
      itemType: new FormControl(invoiceDetailsRawValue.itemType),
      paymentType: new FormControl(invoiceDetailsRawValue.paymentType),
      subscriptionStartingDate: new FormControl(invoiceDetailsRawValue.subscriptionStartingDate),
      subscriptionDurationWeeks: new FormControl(invoiceDetailsRawValue.subscriptionDurationWeeks),
      detailAmount: new FormControl(invoiceDetailsRawValue.detailAmount),
      lineNumber: new FormControl(invoiceDetailsRawValue.lineNumber),
      nutritionistId: new FormControl(invoiceDetailsRawValue.nutritionistId),
      totalCost: new FormControl(invoiceDetailsRawValue.totalCost),
      totalProfit: new FormControl(invoiceDetailsRawValue.totalProfit),
      nutritionistEarning: new FormControl(invoiceDetailsRawValue.nutritionistEarning),
      nutritionistPercentage: new FormControl(invoiceDetailsRawValue.nutritionistPercentage),
      fedaralTaxesAmount: new FormControl(invoiceDetailsRawValue.fedaralTaxesAmount),
      fedaralTaxesPercentage: new FormControl(invoiceDetailsRawValue.fedaralTaxesPercentage),
      provintionalTaxesAmount: new FormControl(invoiceDetailsRawValue.provintionalTaxesAmount),
      provintionalTaxesPercentage: new FormControl(invoiceDetailsRawValue.provintionalTaxesPercentage),
      totalTaxesAmount: new FormControl(invoiceDetailsRawValue.totalTaxesAmount),
      totalTaxesPercentage: new FormControl(invoiceDetailsRawValue.totalTaxesPercentage),
      discountAmount: new FormControl(invoiceDetailsRawValue.discountAmount),
      discountPercentage: new FormControl(invoiceDetailsRawValue.discountPercentage),
      addOnCode: new FormControl(invoiceDetailsRawValue.addOnCode),
      addOnAmount: new FormControl(invoiceDetailsRawValue.addOnAmount),
      addOnPercentage: new FormControl(invoiceDetailsRawValue.addOnPercentage),
      totalAmount: new FormControl(invoiceDetailsRawValue.totalAmount),
      createdDate: new FormControl(invoiceDetailsRawValue.createdDate),
      subItems: new FormControl(invoiceDetailsRawValue.subItems ?? []),
      invoices: new FormControl(invoiceDetailsRawValue.invoices ?? []),
    });
  }

  getInvoiceDetails(form: InvoiceDetailsFormGroup): IInvoiceDetails | NewInvoiceDetails {
    return form.getRawValue() as IInvoiceDetails | NewInvoiceDetails;
  }

  resetForm(form: InvoiceDetailsFormGroup, invoiceDetails: InvoiceDetailsFormGroupInput): void {
    const invoiceDetailsRawValue = { ...this.getFormDefaults(), ...invoiceDetails };
    form.reset(
      {
        ...invoiceDetailsRawValue,
        id: { value: invoiceDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InvoiceDetailsFormDefaults {
    return {
      id: null,
      subItems: [],
      invoices: [],
    };
  }
}
