import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ConditionDetailsFormService, ConditionDetailsFormGroup } from './condition-details-form.service';
import { IConditionDetails } from '../condition-details.model';
import { ConditionDetailsService } from '../service/condition-details.service';
import { FIELDS } from 'app/entities/enumerations/fields.model';
import { OPERATORS } from 'app/entities/enumerations/operators.model';
import { LOGICTYPES } from 'app/entities/enumerations/logictypes.model';

@Component({
  selector: 'jhi-condition-details-update',
  templateUrl: './condition-details-update.component.html',
})
export class ConditionDetailsUpdateComponent implements OnInit {
  isSaving = false;
  conditionDetails: IConditionDetails | null = null;
  fIELDSValues = Object.keys(FIELDS);
  oPERATORSValues = Object.keys(OPERATORS);
  lOGICTYPESValues = Object.keys(LOGICTYPES);

  editForm: ConditionDetailsFormGroup = this.conditionDetailsFormService.createConditionDetailsFormGroup();

  constructor(
    protected conditionDetailsService: ConditionDetailsService,
    protected conditionDetailsFormService: ConditionDetailsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conditionDetails }) => {
      this.conditionDetails = conditionDetails;
      if (conditionDetails) {
        this.updateForm(conditionDetails);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conditionDetails = this.conditionDetailsFormService.getConditionDetails(this.editForm);
    if (conditionDetails.id !== null) {
      this.subscribeToSaveResponse(this.conditionDetailsService.update(conditionDetails));
    } else {
      this.subscribeToSaveResponse(this.conditionDetailsService.create(conditionDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConditionDetails>>): void {
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

  protected updateForm(conditionDetails: IConditionDetails): void {
    this.conditionDetails = conditionDetails;
    this.conditionDetailsFormService.resetForm(this.editForm, conditionDetails);
  }
}
