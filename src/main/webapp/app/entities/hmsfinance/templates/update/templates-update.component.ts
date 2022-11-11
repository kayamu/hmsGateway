import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TemplatesFormService, TemplatesFormGroup } from './templates-form.service';
import { ITemplates } from '../templates.model';
import { TemplatesService } from '../service/templates.service';
import { ITemplateItems } from 'app/entities/hmsfinance/template-items/template-items.model';
import { TemplateItemsService } from 'app/entities/hmsfinance/template-items/service/template-items.service';
import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';

@Component({
  selector: 'jhi-templates-update',
  templateUrl: './templates-update.component.html',
})
export class TemplatesUpdateComponent implements OnInit {
  isSaving = false;
  templates: ITemplates | null = null;
  iTEMTYPESValues = Object.keys(ITEMTYPES);

  templateItemsSharedCollection: ITemplateItems[] = [];

  editForm: TemplatesFormGroup = this.templatesFormService.createTemplatesFormGroup();

  constructor(
    protected templatesService: TemplatesService,
    protected templatesFormService: TemplatesFormService,
    protected templateItemsService: TemplateItemsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTemplateItems = (o1: ITemplateItems | null, o2: ITemplateItems | null): boolean =>
    this.templateItemsService.compareTemplateItems(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templates }) => {
      this.templates = templates;
      if (templates) {
        this.updateForm(templates);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const templates = this.templatesFormService.getTemplates(this.editForm);
    if (templates.id !== null) {
      this.subscribeToSaveResponse(this.templatesService.update(templates));
    } else {
      this.subscribeToSaveResponse(this.templatesService.create(templates));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITemplates>>): void {
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

  protected updateForm(templates: ITemplates): void {
    this.templates = templates;
    this.templatesFormService.resetForm(this.editForm, templates);

    this.templateItemsSharedCollection = this.templateItemsService.addTemplateItemsToCollectionIfMissing<ITemplateItems>(
      this.templateItemsSharedCollection,
      ...(templates.templateItems ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.templateItemsService
      .query()
      .pipe(map((res: HttpResponse<ITemplateItems[]>) => res.body ?? []))
      .pipe(
        map((templateItems: ITemplateItems[]) =>
          this.templateItemsService.addTemplateItemsToCollectionIfMissing<ITemplateItems>(
            templateItems,
            ...(this.templates?.templateItems ?? [])
          )
        )
      )
      .subscribe((templateItems: ITemplateItems[]) => (this.templateItemsSharedCollection = templateItems));
  }
}
