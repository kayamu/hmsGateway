import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TemplateItemsFormService, TemplateItemsFormGroup } from './template-items-form.service';
import { ITemplateItems } from '../template-items.model';
import { TemplateItemsService } from '../service/template-items.service';
import { IConditions } from 'app/entities/hmsfinance/conditions/conditions.model';
import { ConditionsService } from 'app/entities/hmsfinance/conditions/service/conditions.service';
import { DETAILTYPES } from 'app/entities/enumerations/detailtypes.model';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

@Component({
  selector: 'jhi-template-items-update',
  templateUrl: './template-items-update.component.html',
})
export class TemplateItemsUpdateComponent implements OnInit {
  isSaving = false;
  templateItems: ITemplateItems | null = null;
  dETAILTYPESValues = Object.keys(DETAILTYPES);
  vALUETYPESValues = Object.keys(VALUETYPES);

  conditionsSharedCollection: IConditions[] = [];

  editForm: TemplateItemsFormGroup = this.templateItemsFormService.createTemplateItemsFormGroup();

  constructor(
    protected templateItemsService: TemplateItemsService,
    protected templateItemsFormService: TemplateItemsFormService,
    protected conditionsService: ConditionsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareConditions = (o1: IConditions | null, o2: IConditions | null): boolean => this.conditionsService.compareConditions(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templateItems }) => {
      this.templateItems = templateItems;
      if (templateItems) {
        this.updateForm(templateItems);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const templateItems = this.templateItemsFormService.getTemplateItems(this.editForm);
    if (templateItems.id !== null) {
      this.subscribeToSaveResponse(this.templateItemsService.update(templateItems));
    } else {
      this.subscribeToSaveResponse(this.templateItemsService.create(templateItems));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITemplateItems>>): void {
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

  protected updateForm(templateItems: ITemplateItems): void {
    this.templateItems = templateItems;
    this.templateItemsFormService.resetForm(this.editForm, templateItems);

    this.conditionsSharedCollection = this.conditionsService.addConditionsToCollectionIfMissing<IConditions>(
      this.conditionsSharedCollection,
      templateItems.conditions
    );
  }

  protected loadRelationshipsOptions(): void {
    this.conditionsService
      .query()
      .pipe(map((res: HttpResponse<IConditions[]>) => res.body ?? []))
      .pipe(
        map((conditions: IConditions[]) =>
          this.conditionsService.addConditionsToCollectionIfMissing<IConditions>(conditions, this.templateItems?.conditions)
        )
      )
      .subscribe((conditions: IConditions[]) => (this.conditionsSharedCollection = conditions));
  }
}
