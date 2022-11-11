import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MealIngredientsFormService, MealIngredientsFormGroup } from './meal-ingredients-form.service';
import { IMealIngredients } from '../meal-ingredients.model';
import { MealIngredientsService } from '../service/meal-ingredients.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';
import { IIngredients } from 'app/entities/hmsmenu/ingredients/ingredients.model';
import { IngredientsService } from 'app/entities/hmsmenu/ingredients/service/ingredients.service';

@Component({
  selector: 'jhi-meal-ingredients-update',
  templateUrl: './meal-ingredients-update.component.html',
})
export class MealIngredientsUpdateComponent implements OnInit {
  isSaving = false;
  mealIngredients: IMealIngredients | null = null;

  nutriensSharedCollection: INutriens[] = [];
  ingredientsSharedCollection: IIngredients[] = [];

  editForm: MealIngredientsFormGroup = this.mealIngredientsFormService.createMealIngredientsFormGroup();

  constructor(
    protected mealIngredientsService: MealIngredientsService,
    protected mealIngredientsFormService: MealIngredientsFormService,
    protected nutriensService: NutriensService,
    protected ingredientsService: IngredientsService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareNutriens = (o1: INutriens | null, o2: INutriens | null): boolean => this.nutriensService.compareNutriens(o1, o2);

  compareIngredients = (o1: IIngredients | null, o2: IIngredients | null): boolean => this.ingredientsService.compareIngredients(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mealIngredients }) => {
      this.mealIngredients = mealIngredients;
      if (mealIngredients) {
        this.updateForm(mealIngredients);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mealIngredients = this.mealIngredientsFormService.getMealIngredients(this.editForm);
    if (mealIngredients.id !== null) {
      this.subscribeToSaveResponse(this.mealIngredientsService.update(mealIngredients));
    } else {
      this.subscribeToSaveResponse(this.mealIngredientsService.create(mealIngredients));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealIngredients>>): void {
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

  protected updateForm(mealIngredients: IMealIngredients): void {
    this.mealIngredients = mealIngredients;
    this.mealIngredientsFormService.resetForm(this.editForm, mealIngredients);

    this.nutriensSharedCollection = this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(
      this.nutriensSharedCollection,
      mealIngredients.nutriens
    );
    this.ingredientsSharedCollection = this.ingredientsService.addIngredientsToCollectionIfMissing<IIngredients>(
      this.ingredientsSharedCollection,
      mealIngredients.ingradients
    );
  }

  protected loadRelationshipsOptions(): void {
    this.nutriensService
      .query()
      .pipe(map((res: HttpResponse<INutriens[]>) => res.body ?? []))
      .pipe(
        map((nutriens: INutriens[]) =>
          this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(nutriens, this.mealIngredients?.nutriens)
        )
      )
      .subscribe((nutriens: INutriens[]) => (this.nutriensSharedCollection = nutriens));

    this.ingredientsService
      .query()
      .pipe(map((res: HttpResponse<IIngredients[]>) => res.body ?? []))
      .pipe(
        map((ingredients: IIngredients[]) =>
          this.ingredientsService.addIngredientsToCollectionIfMissing<IIngredients>(ingredients, this.mealIngredients?.ingradients)
        )
      )
      .subscribe((ingredients: IIngredients[]) => (this.ingredientsSharedCollection = ingredients));
  }
}
