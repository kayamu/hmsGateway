import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AllergensFormService, AllergensFormGroup } from './allergens-form.service';
import { IAllergens } from '../allergens.model';
import { AllergensService } from '../service/allergens.service';

@Component({
  selector: 'jhi-allergens-update',
  templateUrl: './allergens-update.component.html',
})
export class AllergensUpdateComponent implements OnInit {
  isSaving = false;
  allergens: IAllergens | null = null;

  editForm: AllergensFormGroup = this.allergensFormService.createAllergensFormGroup();

  constructor(
    protected allergensService: AllergensService,
    protected allergensFormService: AllergensFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ allergens }) => {
      this.allergens = allergens;
      if (allergens) {
        this.updateForm(allergens);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const allergens = this.allergensFormService.getAllergens(this.editForm);
    if (allergens.id !== null) {
      this.subscribeToSaveResponse(this.allergensService.update(allergens));
    } else {
      this.subscribeToSaveResponse(this.allergensService.create(allergens));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAllergens>>): void {
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

  protected updateForm(allergens: IAllergens): void {
    this.allergens = allergens;
    this.allergensFormService.resetForm(this.editForm, allergens);
  }
}
