import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPayments, NewPayments } from '../payments.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPayments for edit and NewPaymentsFormGroupInput for create.
 */
type PaymentsFormGroupInput = IPayments | PartialWithRequiredKeyOf<NewPayments>;

type PaymentsFormDefaults = Pick<NewPayments, 'id'>;

type PaymentsFormGroupContent = {
  id: FormControl<IPayments['id'] | NewPayments['id']>;
  refNumber: FormControl<IPayments['refNumber']>;
  paymentType: FormControl<IPayments['paymentType']>;
  contactId: FormControl<IPayments['contactId']>;
  explanation: FormControl<IPayments['explanation']>;
  operationDate: FormControl<IPayments['operationDate']>;
  amount: FormControl<IPayments['amount']>;
  status: FormControl<IPayments['status']>;
  createdDate: FormControl<IPayments['createdDate']>;
  invoices: FormControl<IPayments['invoices']>;
};

export type PaymentsFormGroup = FormGroup<PaymentsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PaymentsFormService {
  createPaymentsFormGroup(payments: PaymentsFormGroupInput = { id: null }): PaymentsFormGroup {
    const paymentsRawValue = {
      ...this.getFormDefaults(),
      ...payments,
    };
    return new FormGroup<PaymentsFormGroupContent>({
      id: new FormControl(
        { value: paymentsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      refNumber: new FormControl(paymentsRawValue.refNumber),
      paymentType: new FormControl(paymentsRawValue.paymentType),
      contactId: new FormControl(paymentsRawValue.contactId),
      explanation: new FormControl(paymentsRawValue.explanation),
      operationDate: new FormControl(paymentsRawValue.operationDate),
      amount: new FormControl(paymentsRawValue.amount),
      status: new FormControl(paymentsRawValue.status),
      createdDate: new FormControl(paymentsRawValue.createdDate),
      invoices: new FormControl(paymentsRawValue.invoices),
    });
  }

  getPayments(form: PaymentsFormGroup): IPayments | NewPayments {
    return form.getRawValue() as IPayments | NewPayments;
  }

  resetForm(form: PaymentsFormGroup, payments: PaymentsFormGroupInput): void {
    const paymentsRawValue = { ...this.getFormDefaults(), ...payments };
    form.reset(
      {
        ...paymentsRawValue,
        id: { value: paymentsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PaymentsFormDefaults {
    return {
      id: null,
    };
  }
}
