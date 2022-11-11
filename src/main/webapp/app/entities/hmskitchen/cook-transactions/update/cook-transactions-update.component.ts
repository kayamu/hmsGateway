import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CookTransactionsFormService, CookTransactionsFormGroup } from './cook-transactions-form.service';
import { ICookTransactions } from '../cook-transactions.model';
import { CookTransactionsService } from '../service/cook-transactions.service';
import { KITCHENTYPES } from 'app/entities/enumerations/kitchentypes.model';

@Component({
  selector: 'jhi-cook-transactions-update',
  templateUrl: './cook-transactions-update.component.html',
})
export class CookTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  cookTransactions: ICookTransactions | null = null;
  kITCHENTYPESValues = Object.keys(KITCHENTYPES);

  editForm: CookTransactionsFormGroup = this.cookTransactionsFormService.createCookTransactionsFormGroup();

  constructor(
    protected cookTransactionsService: CookTransactionsService,
    protected cookTransactionsFormService: CookTransactionsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cookTransactions }) => {
      this.cookTransactions = cookTransactions;
      if (cookTransactions) {
        this.updateForm(cookTransactions);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cookTransactions = this.cookTransactionsFormService.getCookTransactions(this.editForm);
    if (cookTransactions.id !== null) {
      this.subscribeToSaveResponse(this.cookTransactionsService.update(cookTransactions));
    } else {
      this.subscribeToSaveResponse(this.cookTransactionsService.create(cookTransactions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICookTransactions>>): void {
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

  protected updateForm(cookTransactions: ICookTransactions): void {
    this.cookTransactions = cookTransactions;
    this.cookTransactionsFormService.resetForm(this.editForm, cookTransactions);
  }
}
