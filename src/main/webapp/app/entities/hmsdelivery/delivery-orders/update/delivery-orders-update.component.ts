import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DeliveryOrdersFormService, DeliveryOrdersFormGroup } from './delivery-orders-form.service';
import { IDeliveryOrders } from '../delivery-orders.model';
import { DeliveryOrdersService } from '../service/delivery-orders.service';
import { IDeliveryTransactions } from 'app/entities/hmsdelivery/delivery-transactions/delivery-transactions.model';
import { DeliveryTransactionsService } from 'app/entities/hmsdelivery/delivery-transactions/service/delivery-transactions.service';

@Component({
  selector: 'jhi-delivery-orders-update',
  templateUrl: './delivery-orders-update.component.html',
})
export class DeliveryOrdersUpdateComponent implements OnInit {
  isSaving = false;
  deliveryOrders: IDeliveryOrders | null = null;

  deliveryTransactionsSharedCollection: IDeliveryTransactions[] = [];

  editForm: DeliveryOrdersFormGroup = this.deliveryOrdersFormService.createDeliveryOrdersFormGroup();

  constructor(
    protected deliveryOrdersService: DeliveryOrdersService,
    protected deliveryOrdersFormService: DeliveryOrdersFormService,
    protected deliveryTransactionsService: DeliveryTransactionsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDeliveryTransactions = (o1: IDeliveryTransactions | null, o2: IDeliveryTransactions | null): boolean =>
    this.deliveryTransactionsService.compareDeliveryTransactions(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryOrders }) => {
      this.deliveryOrders = deliveryOrders;
      if (deliveryOrders) {
        this.updateForm(deliveryOrders);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryOrders = this.deliveryOrdersFormService.getDeliveryOrders(this.editForm);
    if (deliveryOrders.id !== null) {
      this.subscribeToSaveResponse(this.deliveryOrdersService.update(deliveryOrders));
    } else {
      this.subscribeToSaveResponse(this.deliveryOrdersService.create(deliveryOrders));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryOrders>>): void {
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

  protected updateForm(deliveryOrders: IDeliveryOrders): void {
    this.deliveryOrders = deliveryOrders;
    this.deliveryOrdersFormService.resetForm(this.editForm, deliveryOrders);

    this.deliveryTransactionsSharedCollection =
      this.deliveryTransactionsService.addDeliveryTransactionsToCollectionIfMissing<IDeliveryTransactions>(
        this.deliveryTransactionsSharedCollection,
        ...(deliveryOrders.deliveryTransactions ?? [])
      );
  }

  protected loadRelationshipsOptions(): void {
    this.deliveryTransactionsService
      .query()
      .pipe(map((res: HttpResponse<IDeliveryTransactions[]>) => res.body ?? []))
      .pipe(
        map((deliveryTransactions: IDeliveryTransactions[]) =>
          this.deliveryTransactionsService.addDeliveryTransactionsToCollectionIfMissing<IDeliveryTransactions>(
            deliveryTransactions,
            ...(this.deliveryOrders?.deliveryTransactions ?? [])
          )
        )
      )
      .subscribe((deliveryTransactions: IDeliveryTransactions[]) => (this.deliveryTransactionsSharedCollection = deliveryTransactions));
  }
}
