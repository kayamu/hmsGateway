import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { InvoiceDetailsFormService, InvoiceDetailsFormGroup } from './invoice-details-form.service';
import { IInvoiceDetails } from '../invoice-details.model';
import { InvoiceDetailsService } from '../service/invoice-details.service';
import { ISubItems } from 'app/entities/hmsfinance/sub-items/sub-items.model';
import { SubItemsService } from 'app/entities/hmsfinance/sub-items/service/sub-items.service';
import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';
import { PAYMENTTYPES } from 'app/entities/enumerations/paymenttypes.model';

@Component({
  selector: 'jhi-invoice-details-update',
  templateUrl: './invoice-details-update.component.html',
})
export class InvoiceDetailsUpdateComponent implements OnInit {
  isSaving = false;
  invoiceDetails: IInvoiceDetails | null = null;
  iTEMTYPESValues = Object.keys(ITEMTYPES);
  pAYMENTTYPESValues = Object.keys(PAYMENTTYPES);

  subItemsSharedCollection: ISubItems[] = [];

  editForm: InvoiceDetailsFormGroup = this.invoiceDetailsFormService.createInvoiceDetailsFormGroup();

  constructor(
    protected invoiceDetailsService: InvoiceDetailsService,
    protected invoiceDetailsFormService: InvoiceDetailsFormService,
    protected subItemsService: SubItemsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareSubItems = (o1: ISubItems | null, o2: ISubItems | null): boolean => this.subItemsService.compareSubItems(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoiceDetails }) => {
      this.invoiceDetails = invoiceDetails;
      if (invoiceDetails) {
        this.updateForm(invoiceDetails);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoiceDetails = this.invoiceDetailsFormService.getInvoiceDetails(this.editForm);
    if (invoiceDetails.id !== null) {
      this.subscribeToSaveResponse(this.invoiceDetailsService.update(invoiceDetails));
    } else {
      this.subscribeToSaveResponse(this.invoiceDetailsService.create(invoiceDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceDetails>>): void {
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

  protected updateForm(invoiceDetails: IInvoiceDetails): void {
    this.invoiceDetails = invoiceDetails;
    this.invoiceDetailsFormService.resetForm(this.editForm, invoiceDetails);

    this.subItemsSharedCollection = this.subItemsService.addSubItemsToCollectionIfMissing<ISubItems>(
      this.subItemsSharedCollection,
      ...(invoiceDetails.subItems ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.subItemsService
      .query()
      .pipe(map((res: HttpResponse<ISubItems[]>) => res.body ?? []))
      .pipe(
        map((subItems: ISubItems[]) =>
          this.subItemsService.addSubItemsToCollectionIfMissing<ISubItems>(subItems, ...(this.invoiceDetails?.subItems ?? []))
        )
      )
      .subscribe((subItems: ISubItems[]) => (this.subItemsSharedCollection = subItems));
  }
}
