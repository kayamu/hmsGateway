import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CookOrdersFormService, CookOrdersFormGroup } from './cook-orders-form.service';
import { ICookOrders } from '../cook-orders.model';
import { CookOrdersService } from '../service/cook-orders.service';
import { ICookTransactions } from 'app/entities/hmskitchen/cook-transactions/cook-transactions.model';
import { CookTransactionsService } from 'app/entities/hmskitchen/cook-transactions/service/cook-transactions.service';

@Component({
  selector: 'jhi-cook-orders-update',
  templateUrl: './cook-orders-update.component.html',
})
export class CookOrdersUpdateComponent implements OnInit {
  isSaving = false;
  cookOrders: ICookOrders | null = null;

  cookTransactionsSharedCollection: ICookTransactions[] = [];

  editForm: CookOrdersFormGroup = this.cookOrdersFormService.createCookOrdersFormGroup();

  constructor(
    protected cookOrdersService: CookOrdersService,
    protected cookOrdersFormService: CookOrdersFormService,
    protected cookTransactionsService: CookTransactionsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCookTransactions = (o1: ICookTransactions | null, o2: ICookTransactions | null): boolean =>
    this.cookTransactionsService.compareCookTransactions(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cookOrders }) => {
      this.cookOrders = cookOrders;
      if (cookOrders) {
        this.updateForm(cookOrders);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cookOrders = this.cookOrdersFormService.getCookOrders(this.editForm);
    if (cookOrders.id !== null) {
      this.subscribeToSaveResponse(this.cookOrdersService.update(cookOrders));
    } else {
      this.subscribeToSaveResponse(this.cookOrdersService.create(cookOrders));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICookOrders>>): void {
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

  protected updateForm(cookOrders: ICookOrders): void {
    this.cookOrders = cookOrders;
    this.cookOrdersFormService.resetForm(this.editForm, cookOrders);

    this.cookTransactionsSharedCollection = this.cookTransactionsService.addCookTransactionsToCollectionIfMissing<ICookTransactions>(
      this.cookTransactionsSharedCollection,
      ...(cookOrders.cookTransactions ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cookTransactionsService
      .query()
      .pipe(map((res: HttpResponse<ICookTransactions[]>) => res.body ?? []))
      .pipe(
        map((cookTransactions: ICookTransactions[]) =>
          this.cookTransactionsService.addCookTransactionsToCollectionIfMissing<ICookTransactions>(
            cookTransactions,
            ...(this.cookOrders?.cookTransactions ?? [])
          )
        )
      )
      .subscribe((cookTransactions: ICookTransactions[]) => (this.cookTransactionsSharedCollection = cookTransactions));
  }
}
