import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CustomerHealthsFormService, CustomerHealthsFormGroup } from './customer-healths-form.service';
import { ICustomerHealths } from '../customer-healths.model';
import { CustomerHealthsService } from '../service/customer-healths.service';
import { IAllergens } from 'app/entities/hmscustomer/allergens/allergens.model';
import { AllergensService } from 'app/entities/hmscustomer/allergens/service/allergens.service';
import { UNITS } from 'app/entities/enumerations/units.model';
import { BODYFATS } from 'app/entities/enumerations/bodyfats.model';
import { GOALS } from 'app/entities/enumerations/goals.model';

@Component({
  selector: 'jhi-customer-healths-update',
  templateUrl: './customer-healths-update.component.html',
})
export class CustomerHealthsUpdateComponent implements OnInit {
  isSaving = false;
  customerHealths: ICustomerHealths | null = null;
  uNITSValues = Object.keys(UNITS);
  bODYFATSValues = Object.keys(BODYFATS);
  gOALSValues = Object.keys(GOALS);

  allergensSharedCollection: IAllergens[] = [];

  editForm: CustomerHealthsFormGroup = this.customerHealthsFormService.createCustomerHealthsFormGroup();

  constructor(
    protected customerHealthsService: CustomerHealthsService,
    protected customerHealthsFormService: CustomerHealthsFormService,
    protected allergensService: AllergensService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAllergens = (o1: IAllergens | null, o2: IAllergens | null): boolean => this.allergensService.compareAllergens(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerHealths }) => {
      this.customerHealths = customerHealths;
      if (customerHealths) {
        this.updateForm(customerHealths);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerHealths = this.customerHealthsFormService.getCustomerHealths(this.editForm);
    if (customerHealths.id !== null) {
      this.subscribeToSaveResponse(this.customerHealthsService.update(customerHealths));
    } else {
      this.subscribeToSaveResponse(this.customerHealthsService.create(customerHealths));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerHealths>>): void {
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

  protected updateForm(customerHealths: ICustomerHealths): void {
    this.customerHealths = customerHealths;
    this.customerHealthsFormService.resetForm(this.editForm, customerHealths);

    this.allergensSharedCollection = this.allergensService.addAllergensToCollectionIfMissing<IAllergens>(
      this.allergensSharedCollection,
      ...(customerHealths.allergens ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.allergensService
      .query()
      .pipe(map((res: HttpResponse<IAllergens[]>) => res.body ?? []))
      .pipe(
        map((allergens: IAllergens[]) =>
          this.allergensService.addAllergensToCollectionIfMissing<IAllergens>(allergens, ...(this.customerHealths?.allergens ?? []))
        )
      )
      .subscribe((allergens: IAllergens[]) => (this.allergensSharedCollection = allergens));
  }
}
