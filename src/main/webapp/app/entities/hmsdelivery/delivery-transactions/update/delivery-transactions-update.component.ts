import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DeliveryTransactionsFormService, DeliveryTransactionsFormGroup } from './delivery-transactions-form.service';
import { IDeliveryTransactions } from '../delivery-transactions.model';
import { DeliveryTransactionsService } from '../service/delivery-transactions.service';
import { DELIVERYTYPES } from 'app/entities/enumerations/deliverytypes.model';

@Component({
  selector: 'jhi-delivery-transactions-update',
  templateUrl: './delivery-transactions-update.component.html',
})
export class DeliveryTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  deliveryTransactions: IDeliveryTransactions | null = null;
  dELIVERYTYPESValues = Object.keys(DELIVERYTYPES);

  editForm: DeliveryTransactionsFormGroup = this.deliveryTransactionsFormService.createDeliveryTransactionsFormGroup();

  constructor(
    protected deliveryTransactionsService: DeliveryTransactionsService,
    protected deliveryTransactionsFormService: DeliveryTransactionsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryTransactions }) => {
      this.deliveryTransactions = deliveryTransactions;
      if (deliveryTransactions) {
        this.updateForm(deliveryTransactions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryTransactions = this.deliveryTransactionsFormService.getDeliveryTransactions(this.editForm);
    if (deliveryTransactions.id !== null) {
      this.subscribeToSaveResponse(this.deliveryTransactionsService.update(deliveryTransactions));
    } else {
      this.subscribeToSaveResponse(this.deliveryTransactionsService.create(deliveryTransactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryTransactions>>): void {
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

  protected updateForm(deliveryTransactions: IDeliveryTransactions): void {
    this.deliveryTransactions = deliveryTransactions;
    this.deliveryTransactionsFormService.resetForm(this.editForm, deliveryTransactions);
  }
}
