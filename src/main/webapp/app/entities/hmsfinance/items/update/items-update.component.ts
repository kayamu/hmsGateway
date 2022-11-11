import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ItemsFormService, ItemsFormGroup } from './items-form.service';
import { IItems } from '../items.model';
import { ItemsService } from '../service/items.service';
import { ITemplates } from 'app/entities/hmsfinance/templates/templates.model';
import { TemplatesService } from 'app/entities/hmsfinance/templates/service/templates.service';
import { ITEMTYPES } from 'app/entities/enumerations/itemtypes.model';

@Component({
  selector: 'jhi-items-update',
  templateUrl: './items-update.component.html',
})
export class ItemsUpdateComponent implements OnInit {
  isSaving = false;
  items: IItems | null = null;
  iTEMTYPESValues = Object.keys(ITEMTYPES);

  templatesSharedCollection: ITemplates[] = [];

  editForm: ItemsFormGroup = this.itemsFormService.createItemsFormGroup();

  constructor(
    protected itemsService: ItemsService,
    protected itemsFormService: ItemsFormService,
    protected templatesService: TemplatesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTemplates = (o1: ITemplates | null, o2: ITemplates | null): boolean => this.templatesService.compareTemplates(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ items }) => {
      this.items = items;
      if (items) {
        this.updateForm(items);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const items = this.itemsFormService.getItems(this.editForm);
    if (items.id !== null) {
      this.subscribeToSaveResponse(this.itemsService.update(items));
    } else {
      this.subscribeToSaveResponse(this.itemsService.create(items));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItems>>): void {
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

  protected updateForm(items: IItems): void {
    this.items = items;
    this.itemsFormService.resetForm(this.editForm, items);

    this.templatesSharedCollection = this.templatesService.addTemplatesToCollectionIfMissing<ITemplates>(
      this.templatesSharedCollection,
      items.templates
    );
  }

  protected loadRelationshipsOptions(): void {
    this.templatesService
      .query()
      .pipe(map((res: HttpResponse<ITemplates[]>) => res.body ?? []))
      .pipe(
        map((templates: ITemplates[]) =>
          this.templatesService.addTemplatesToCollectionIfMissing<ITemplates>(templates, this.items?.templates)
        )
      )
      .subscribe((templates: ITemplates[]) => (this.templatesSharedCollection = templates));
  }
}
