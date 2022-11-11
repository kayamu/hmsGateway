import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PaymentsFormService, PaymentsFormGroup } from './payments-form.service';
import { IPayments } from '../payments.model';
import { PaymentsService } from '../service/payments.service';
import { IInvoices } from 'app/entities/hmsfinance/invoices/invoices.model';
import { InvoicesService } from 'app/entities/hmsfinance/invoices/service/invoices.service';
import { PAYMENTTYPES } from 'app/entities/enumerations/paymenttypes.model';
import { PAYMENTSTATUS } from 'app/entities/enumerations/paymentstatus.model';

@Component({
  selector: 'jhi-payments-update',
  templateUrl: './payments-update.component.html',
})
export class PaymentsUpdateComponent implements OnInit {
  isSaving = false;
  payments: IPayments | null = null;
  pAYMENTTYPESValues = Object.keys(PAYMENTTYPES);
  pAYMENTSTATUSValues = Object.keys(PAYMENTSTATUS);

  invoicesSharedCollection: IInvoices[] = [];

  editForm: PaymentsFormGroup = this.paymentsFormService.createPaymentsFormGroup();

  constructor(
    protected paymentsService: PaymentsService,
    protected paymentsFormService: PaymentsFormService,
    protected invoicesService: InvoicesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInvoices = (o1: IInvoices | null, o2: IInvoices | null): boolean => this.invoicesService.compareInvoices(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payments }) => {
      this.payments = payments;
      if (payments) {
        this.updateForm(payments);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const payments = this.paymentsFormService.getPayments(this.editForm);
    if (payments.id !== null) {
      this.subscribeToSaveResponse(this.paymentsService.update(payments));
    } else {
      this.subscribeToSaveResponse(this.paymentsService.create(payments));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPayments>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(payments: IPayments): void {
    this.payments = payments;
    this.paymentsFormService.resetForm(this.editForm, payments);

    this.invoicesSharedCollection = this.invoicesService.addInvoicesToCollectionIfMissing<IInvoices>(
      this.invoicesSharedCollection,
      payments.invoices
    );
  }

  protected loadRelationshipsOptions(): void {
    this.invoicesService
      .query()
      .pipe(map((res: HttpResponse<IInvoices[]>) => res.body ?? []))
      .pipe(
        map((invoices: IInvoices[]) => this.invoicesService.addInvoicesToCollectionIfMissing<IInvoices>(invoices, this.payments?.invoices))
      )
      .subscribe((invoices: IInvoices[]) => (this.invoicesSharedCollection = invoices));
  }
}
