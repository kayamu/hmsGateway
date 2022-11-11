import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { InvoiceTransactionsFormService, InvoiceTransactionsFormGroup } from './invoice-transactions-form.service';
import { IInvoiceTransactions } from '../invoice-transactions.model';
import { InvoiceTransactionsService } from '../service/invoice-transactions.service';
import { IInvoices } from 'app/entities/hmsfinance/invoices/invoices.model';
import { InvoicesService } from 'app/entities/hmsfinance/invoices/service/invoices.service';
import { INVOICETYPES } from 'app/entities/enumerations/invoicetypes.model';

@Component({
  selector: 'jhi-invoice-transactions-update',
  templateUrl: './invoice-transactions-update.component.html',
})
export class InvoiceTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  invoiceTransactions: IInvoiceTransactions | null = null;
  iNVOICETYPESValues = Object.keys(INVOICETYPES);

  invoicesSharedCollection: IInvoices[] = [];

  editForm: InvoiceTransactionsFormGroup = this.invoiceTransactionsFormService.createInvoiceTransactionsFormGroup();

  constructor(
    protected invoiceTransactionsService: InvoiceTransactionsService,
    protected invoiceTransactionsFormService: InvoiceTransactionsFormService,
    protected invoicesService: InvoicesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInvoices = (o1: IInvoices | null, o2: IInvoices | null): boolean => this.invoicesService.compareInvoices(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoiceTransactions }) => {
      this.invoiceTransactions = invoiceTransactions;
      if (invoiceTransactions) {
        this.updateForm(invoiceTransactions);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoiceTransactions = this.invoiceTransactionsFormService.getInvoiceTransactions(this.editForm);
    if (invoiceTransactions.id !== null) {
      this.subscribeToSaveResponse(this.invoiceTransactionsService.update(invoiceTransactions));
    } else {
      this.subscribeToSaveResponse(this.invoiceTransactionsService.create(invoiceTransactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceTransactions>>): void {
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

  protected updateForm(invoiceTransactions: IInvoiceTransactions): void {
    this.invoiceTransactions = invoiceTransactions;
    this.invoiceTransactionsFormService.resetForm(this.editForm, invoiceTransactions);

    this.invoicesSharedCollection = this.invoicesService.addInvoicesToCollectionIfMissing<IInvoices>(
      this.invoicesSharedCollection,
      invoiceTransactions.invoices
    );
  }

  protected loadRelationshipsOptions(): void {
    this.invoicesService
      .query()
      .pipe(map((res: HttpResponse<IInvoices[]>) => res.body ?? []))
      .pipe(
        map((invoices: IInvoices[]) =>
          this.invoicesService.addInvoicesToCollectionIfMissing<IInvoices>(invoices, this.invoiceTransactions?.invoices)
        )
      )
      .subscribe((invoices: IInvoices[]) => (this.invoicesSharedCollection = invoices));
  }
}
