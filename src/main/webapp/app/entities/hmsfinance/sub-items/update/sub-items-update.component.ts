import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SubItemsFormService, SubItemsFormGroup } from './sub-items-form.service';
import { ISubItems } from '../sub-items.model';
import { SubItemsService } from '../service/sub-items.service';
import { DETAILTYPES } from 'app/entities/enumerations/detailtypes.model';
import { VALUETYPES } from 'app/entities/enumerations/valuetypes.model';

@Component({
  selector: 'jhi-sub-items-update',
  templateUrl: './sub-items-update.component.html',
})
export class SubItemsUpdateComponent implements OnInit {
  isSaving = false;
  subItems: ISubItems | null = null;
  dETAILTYPESValues = Object.keys(DETAILTYPES);
  vALUETYPESValues = Object.keys(VALUETYPES);

  editForm: SubItemsFormGroup = this.subItemsFormService.createSubItemsFormGroup();

  constructor(
    protected subItemsService: SubItemsService,
    protected subItemsFormService: SubItemsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subItems }) => {
      this.subItems = subItems;
      if (subItems) {
        this.updateForm(subItems);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subItems = this.subItemsFormService.getSubItems(this.editForm);
    if (subItems.id !== null) {
      this.subscribeToSaveResponse(this.subItemsService.update(subItems));
    } else {
      this.subscribeToSaveResponse(this.subItemsService.create(subItems));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubItems>>): void {
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

  protected updateForm(subItems: ISubItems): void {
    this.subItems = subItems;
    this.subItemsFormService.resetForm(this.editForm, subItems);
  }
}
