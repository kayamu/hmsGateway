import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NutriensFormService, NutriensFormGroup } from './nutriens-form.service';
import { INutriens } from '../nutriens.model';
import { NutriensService } from '../service/nutriens.service';

@Component({
  selector: 'jhi-nutriens-update',
  templateUrl: './nutriens-update.component.html',
})
export class NutriensUpdateComponent implements OnInit {
  isSaving = false;
  nutriens: INutriens | null = null;

  editForm: NutriensFormGroup = this.nutriensFormService.createNutriensFormGroup();

  constructor(
    protected nutriensService: NutriensService,
    protected nutriensFormService: NutriensFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nutriens }) => {
      this.nutriens = nutriens;
      if (nutriens) {
        this.updateForm(nutriens);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nutriens = this.nutriensFormService.getNutriens(this.editForm);
    if (nutriens.id !== null) {
      this.subscribeToSaveResponse(this.nutriensService.update(nutriens));
    } else {
      this.subscribeToSaveResponse(this.nutriensService.create(nutriens));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutriens>>): void {
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

  protected updateForm(nutriens: INutriens): void {
    this.nutriens = nutriens;
    this.nutriensFormService.resetForm(this.editForm, nutriens);
  }
}
