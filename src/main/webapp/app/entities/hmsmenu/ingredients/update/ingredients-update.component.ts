import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IngredientsFormService, IngredientsFormGroup } from './ingredients-form.service';
import { IIngredients } from '../ingredients.model';
import { IngredientsService } from '../service/ingredients.service';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';

@Component({
  selector: 'jhi-ingredients-update',
  templateUrl: './ingredients-update.component.html',
})
export class IngredientsUpdateComponent implements OnInit {
  isSaving = false;
  ingredients: IIngredients | null = null;

  imagesUrlsSharedCollection: IImagesUrl[] = [];
  nutriensSharedCollection: INutriens[] = [];

  editForm: IngredientsFormGroup = this.ingredientsFormService.createIngredientsFormGroup();

  constructor(
    protected ingredientsService: IngredientsService,
    protected ingredientsFormService: IngredientsFormService,
    protected imagesUrlService: ImagesUrlService,
    protected nutriensService: NutriensService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareImagesUrl = (o1: IImagesUrl | null, o2: IImagesUrl | null): boolean => this.imagesUrlService.compareImagesUrl(o1, o2);

  compareNutriens = (o1: INutriens | null, o2: INutriens | null): boolean => this.nutriensService.compareNutriens(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ingredients }) => {
      this.ingredients = ingredients;
      if (ingredients) {
        this.updateForm(ingredients);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ingredients = this.ingredientsFormService.getIngredients(this.editForm);
    if (ingredients.id !== null) {
      this.subscribeToSaveResponse(this.ingredientsService.update(ingredients));
    } else {
      this.subscribeToSaveResponse(this.ingredientsService.create(ingredients));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIngredients>>): void {
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

  protected updateForm(ingredients: IIngredients): void {
    this.ingredients = ingredients;
    this.ingredientsFormService.resetForm(this.editForm, ingredients);

    this.imagesUrlsSharedCollection = this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(
      this.imagesUrlsSharedCollection,
      ...(ingredients.imagesUrls ?? [])
    );
    this.nutriensSharedCollection = this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(
      this.nutriensSharedCollection,
      ingredients.nutriens
    );
  }

  protected loadRelationshipsOptions(): void {
    this.imagesUrlService
      .query()
      .pipe(map((res: HttpResponse<IImagesUrl[]>) => res.body ?? []))
      .pipe(
        map((imagesUrls: IImagesUrl[]) =>
          this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(imagesUrls, ...(this.ingredients?.imagesUrls ?? []))
        )
      )
      .subscribe((imagesUrls: IImagesUrl[]) => (this.imagesUrlsSharedCollection = imagesUrls));

    this.nutriensService
      .query()
      .pipe(map((res: HttpResponse<INutriens[]>) => res.body ?? []))
      .pipe(
        map((nutriens: INutriens[]) =>
          this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(nutriens, this.ingredients?.nutriens)
        )
      )
      .subscribe((nutriens: INutriens[]) => (this.nutriensSharedCollection = nutriens));
  }
}
