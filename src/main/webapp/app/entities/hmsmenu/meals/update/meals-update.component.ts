import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MealsFormService, MealsFormGroup } from './meals-form.service';
import { IMeals } from '../meals.model';
import { MealsService } from '../service/meals.service';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { IMealIngredients } from 'app/entities/hmsmenu/meal-ingredients/meal-ingredients.model';
import { MealIngredientsService } from 'app/entities/hmsmenu/meal-ingredients/service/meal-ingredients.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';
import { IRecipies } from 'app/entities/hmsmenu/recipies/recipies.model';
import { RecipiesService } from 'app/entities/hmsmenu/recipies/service/recipies.service';

@Component({
  selector: 'jhi-meals-update',
  templateUrl: './meals-update.component.html',
})
export class MealsUpdateComponent implements OnInit {
  isSaving = false;
  meals: IMeals | null = null;

  imagesUrlsSharedCollection: IImagesUrl[] = [];
  mealIngredientsSharedCollection: IMealIngredients[] = [];
  nutriensSharedCollection: INutriens[] = [];
  recipiesSharedCollection: IRecipies[] = [];

  editForm: MealsFormGroup = this.mealsFormService.createMealsFormGroup();

  constructor(
    protected mealsService: MealsService,
    protected mealsFormService: MealsFormService,
    protected imagesUrlService: ImagesUrlService,
    protected mealIngredientsService: MealIngredientsService,
    protected nutriensService: NutriensService,
    protected recipiesService: RecipiesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareImagesUrl = (o1: IImagesUrl | null, o2: IImagesUrl | null): boolean => this.imagesUrlService.compareImagesUrl(o1, o2);

  compareMealIngredients = (o1: IMealIngredients | null, o2: IMealIngredients | null): boolean =>
    this.mealIngredientsService.compareMealIngredients(o1, o2);

  compareNutriens = (o1: INutriens | null, o2: INutriens | null): boolean => this.nutriensService.compareNutriens(o1, o2);

  compareRecipies = (o1: IRecipies | null, o2: IRecipies | null): boolean => this.recipiesService.compareRecipies(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ meals }) => {
      this.meals = meals;
      if (meals) {
        this.updateForm(meals);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const meals = this.mealsFormService.getMeals(this.editForm);
    if (meals.id !== null) {
      this.subscribeToSaveResponse(this.mealsService.update(meals));
    } else {
      this.subscribeToSaveResponse(this.mealsService.create(meals));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeals>>): void {
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

  protected updateForm(meals: IMeals): void {
    this.meals = meals;
    this.mealsFormService.resetForm(this.editForm, meals);

    this.imagesUrlsSharedCollection = this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(
      this.imagesUrlsSharedCollection,
      ...(meals.imagesUrls ?? [])
    );
    this.mealIngredientsSharedCollection = this.mealIngredientsService.addMealIngredientsToCollectionIfMissing<IMealIngredients>(
      this.mealIngredientsSharedCollection,
      ...(meals.mealIngredients ?? [])
    );
    this.nutriensSharedCollection = this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(
      this.nutriensSharedCollection,
      meals.nutriens
    );
    this.recipiesSharedCollection = this.recipiesService.addRecipiesToCollectionIfMissing<IRecipies>(
      this.recipiesSharedCollection,
      meals.recipies
    );
  }

  protected loadRelationshipsOptions(): void {
    this.imagesUrlService
      .query()
      .pipe(map((res: HttpResponse<IImagesUrl[]>) => res.body ?? []))
      .pipe(
        map((imagesUrls: IImagesUrl[]) =>
          this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(imagesUrls, ...(this.meals?.imagesUrls ?? []))
        )
      )
      .subscribe((imagesUrls: IImagesUrl[]) => (this.imagesUrlsSharedCollection = imagesUrls));

    this.mealIngredientsService
      .query()
      .pipe(map((res: HttpResponse<IMealIngredients[]>) => res.body ?? []))
      .pipe(
        map((mealIngredients: IMealIngredients[]) =>
          this.mealIngredientsService.addMealIngredientsToCollectionIfMissing<IMealIngredients>(
            mealIngredients,
            ...(this.meals?.mealIngredients ?? [])
          )
        )
      )
      .subscribe((mealIngredients: IMealIngredients[]) => (this.mealIngredientsSharedCollection = mealIngredients));

    this.nutriensService
      .query()
      .pipe(map((res: HttpResponse<INutriens[]>) => res.body ?? []))
      .pipe(
        map((nutriens: INutriens[]) => this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(nutriens, this.meals?.nutriens))
      )
      .subscribe((nutriens: INutriens[]) => (this.nutriensSharedCollection = nutriens));

    this.recipiesService
      .query()
      .pipe(map((res: HttpResponse<IRecipies[]>) => res.body ?? []))
      .pipe(
        map((recipies: IRecipies[]) => this.recipiesService.addRecipiesToCollectionIfMissing<IRecipies>(recipies, this.meals?.recipies))
      )
      .subscribe((recipies: IRecipies[]) => (this.recipiesSharedCollection = recipies));
  }
}
