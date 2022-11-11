import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MenusFormService, MenusFormGroup } from './menus-form.service';
import { IMenus } from '../menus.model';
import { MenusService } from '../service/menus.service';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { IMeals } from 'app/entities/hmsmenu/meals/meals.model';
import { MealsService } from 'app/entities/hmsmenu/meals/service/meals.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';
import { DAYS } from 'app/entities/enumerations/days.model';
import { REPAST } from 'app/entities/enumerations/repast.model';

@Component({
  selector: 'jhi-menus-update',
  templateUrl: './menus-update.component.html',
})
export class MenusUpdateComponent implements OnInit {
  isSaving = false;
  menus: IMenus | null = null;
  dAYSValues = Object.keys(DAYS);
  rEPASTValues = Object.keys(REPAST);

  imagesUrlsSharedCollection: IImagesUrl[] = [];
  mealsSharedCollection: IMeals[] = [];
  nutriensSharedCollection: INutriens[] = [];

  editForm: MenusFormGroup = this.menusFormService.createMenusFormGroup();

  constructor(
    protected menusService: MenusService,
    protected menusFormService: MenusFormService,
    protected imagesUrlService: ImagesUrlService,
    protected mealsService: MealsService,
    protected nutriensService: NutriensService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareImagesUrl = (o1: IImagesUrl | null, o2: IImagesUrl | null): boolean => this.imagesUrlService.compareImagesUrl(o1, o2);

  compareMeals = (o1: IMeals | null, o2: IMeals | null): boolean => this.mealsService.compareMeals(o1, o2);

  compareNutriens = (o1: INutriens | null, o2: INutriens | null): boolean => this.nutriensService.compareNutriens(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menus }) => {
      this.menus = menus;
      if (menus) {
        this.updateForm(menus);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menus = this.menusFormService.getMenus(this.editForm);
    if (menus.id !== null) {
      this.subscribeToSaveResponse(this.menusService.update(menus));
    } else {
      this.subscribeToSaveResponse(this.menusService.create(menus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenus>>): void {
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

  protected updateForm(menus: IMenus): void {
    this.menus = menus;
    this.menusFormService.resetForm(this.editForm, menus);

    this.imagesUrlsSharedCollection = this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(
      this.imagesUrlsSharedCollection,
      ...(menus.imagesUrls ?? [])
    );
    this.mealsSharedCollection = this.mealsService.addMealsToCollectionIfMissing<IMeals>(
      this.mealsSharedCollection,
      ...(menus.meals ?? [])
    );
    this.nutriensSharedCollection = this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(
      this.nutriensSharedCollection,
      menus.nutriens
    );
  }

  protected loadRelationshipsOptions(): void {
    this.imagesUrlService
      .query()
      .pipe(map((res: HttpResponse<IImagesUrl[]>) => res.body ?? []))
      .pipe(
        map((imagesUrls: IImagesUrl[]) =>
          this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(imagesUrls, ...(this.menus?.imagesUrls ?? []))
        )
      )
      .subscribe((imagesUrls: IImagesUrl[]) => (this.imagesUrlsSharedCollection = imagesUrls));

    this.mealsService
      .query()
      .pipe(map((res: HttpResponse<IMeals[]>) => res.body ?? []))
      .pipe(map((meals: IMeals[]) => this.mealsService.addMealsToCollectionIfMissing<IMeals>(meals, ...(this.menus?.meals ?? []))))
      .subscribe((meals: IMeals[]) => (this.mealsSharedCollection = meals));

    this.nutriensService
      .query()
      .pipe(map((res: HttpResponse<INutriens[]>) => res.body ?? []))
      .pipe(
        map((nutriens: INutriens[]) => this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(nutriens, this.menus?.nutriens))
      )
      .subscribe((nutriens: INutriens[]) => (this.nutriensSharedCollection = nutriens));
  }
}
