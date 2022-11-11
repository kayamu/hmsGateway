import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { InvoicesFormService, InvoicesFormGroup } from './invoices-form.service';
import { IInvoices } from '../invoices.model';
import { InvoicesService } from '../service/invoices.service';
import { IInvoiceDetails } from 'app/entities/hmsfinance/invoice-details/invoice-details.model';
import { InvoiceDetailsService } from 'app/entities/hmsfinance/invoice-details/service/invoice-details.service';
import { INVOICETYPES } from 'app/entities/enumerations/invoicetypes.model';

@Component({
  selector: 'jhi-invoices-update',
  templateUrl: './invoices-update.component.html',
})
export class InvoicesUpdateComponent implements OnInit {
  isSaving = false;
  invoices: IInvoices | null = null;
  iNVOICETYPESValues = Object.keys(INVOICETYPES);

  invoiceDetailsSharedCollection: IInvoiceDetails[] = [];

  editForm: InvoicesFormGroup = this.invoicesFormService.createInvoicesFormGroup();

  constructor(
    protected invoicesService: InvoicesService,
    protected invoicesFormService: InvoicesFormService,
    protected invoiceDetailsService: InvoiceDetailsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInvoiceDetails = (o1: IInvoiceDetails | null, o2: IInvoiceDetails | null): boolean =>
    this.invoiceDetailsService.compareInvoiceDetails(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoices }) => {
      this.invoices = invoices;
      if (invoices) {
        this.updateForm(invoices);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoices = this.invoicesFormService.getInvoices(this.editForm);
    if (invoices.id !== null) {
      this.subscribeToSaveResponse(this.invoicesService.update(invoices));
    } else {
      this.subscribeToSaveResponse(this.invoicesService.create(invoices));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoices>>): void {
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

  protected updateForm(invoices: IInvoices): void {
    this.invoices = invoices;
    this.invoicesFormService.resetForm(this.editForm, invoices);

    this.invoiceDetailsSharedCollection = this.invoiceDetailsService.addInvoiceDetailsToCollectionIfMissing<IInvoiceDetails>(
      this.invoiceDetailsSharedCollection,
      ...(invoices.invoiceDetails ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.invoiceDetailsService
      .query()
      .pipe(map((res: HttpResponse<IInvoiceDetails[]>) => res.body ?? []))
      .pipe(
        map((invoiceDetails: IInvoiceDetails[]) =>
          this.invoiceDetailsService.addInvoiceDetailsToCollectionIfMissing<IInvoiceDetails>(
            invoiceDetails,
            ...(this.invoices?.invoiceDetails ?? [])
          )
        )
      )
      .subscribe((invoiceDetails: IInvoiceDetails[]) => (this.invoiceDetailsSharedCollection = invoiceDetails));
  }
}
