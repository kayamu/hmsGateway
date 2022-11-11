import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ConditionsFormService, ConditionsFormGroup } from './conditions-form.service';
import { IConditions } from '../conditions.model';
import { ConditionsService } from '../service/conditions.service';
import { IConditionDetails } from 'app/entities/hmsfinance/condition-details/condition-details.model';
import { ConditionDetailsService } from 'app/entities/hmsfinance/condition-details/service/condition-details.service';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

@Component({
  selector: 'jhi-conditions-update',
  templateUrl: './conditions-update.component.html',
})
export class ConditionsUpdateComponent implements OnInit {
  isSaving = false;
  conditions: IConditions | null = null;
  vALUETYPESValues = Object.keys(VALUETYPES);

  conditionDetailsSharedCollection: IConditionDetails[] = [];

  editForm: ConditionsFormGroup = this.conditionsFormService.createConditionsFormGroup();

  constructor(
    protected conditionsService: ConditionsService,
    protected conditionsFormService: ConditionsFormService,
    protected conditionDetailsService: ConditionDetailsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareConditionDetails = (o1: IConditionDetails | null, o2: IConditionDetails | null): boolean =>
    this.conditionDetailsService.compareConditionDetails(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conditions }) => {
      this.conditions = conditions;
      if (conditions) {
        this.updateForm(conditions);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conditions = this.conditionsFormService.getConditions(this.editForm);
    if (conditions.id !== null) {
      this.subscribeToSaveResponse(this.conditionsService.update(conditions));
    } else {
      this.subscribeToSaveResponse(this.conditionsService.create(conditions));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConditions>>): void {
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

  protected updateForm(conditions: IConditions): void {
    this.conditions = conditions;
    this.conditionsFormService.resetForm(this.editForm, conditions);

    this.conditionDetailsSharedCollection = this.conditionDetailsService.addConditionDetailsToCollectionIfMissing<IConditionDetails>(
      this.conditionDetailsSharedCollection,
      ...(conditions.conditionDetails ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.conditionDetailsService
      .query()
      .pipe(map((res: HttpResponse<IConditionDetails[]>) => res.body ?? []))
      .pipe(
        map((conditionDetails: IConditionDetails[]) =>
          this.conditionDetailsService.addConditionDetailsToCollectionIfMissing<IConditionDetails>(
            conditionDetails,
            ...(this.conditions?.conditionDetails ?? [])
          )
        )
      )
      .subscribe((conditionDetails: IConditionDetails[]) => (this.conditionDetailsSharedCollection = conditionDetails));
  }
}
