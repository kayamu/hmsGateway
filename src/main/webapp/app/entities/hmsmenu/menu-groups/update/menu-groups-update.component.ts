import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MenuGroupsFormService, MenuGroupsFormGroup } from './menu-groups-form.service';
import { IMenuGroups } from '../menu-groups.model';
import { MenuGroupsService } from '../service/menu-groups.service';
import { IIngredients } from 'app/entities/hmsmenu/ingredients/ingredients.model';
import { IngredientsService } from 'app/entities/hmsmenu/ingredients/service/ingredients.service';
import { IMenus } from 'app/entities/hmsmenu/menus/menus.model';
import { MenusService } from 'app/entities/hmsmenu/menus/service/menus.service';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';
import { GOALS } from 'app/entities/enumerations/goals.model';
import { BODYFATS } from 'app/entities/enumerations/bodyfats.model';
import { UNITS } from 'app/entities/enumerations/units.model';

@Component({
  selector: 'jhi-menu-groups-update',
  templateUrl: './menu-groups-update.component.html',
})
export class MenuGroupsUpdateComponent implements OnInit {
  isSaving = false;
  menuGroups: IMenuGroups | null = null;
  gOALSValues = Object.keys(GOALS);
  bODYFATSValues = Object.keys(BODYFATS);
  uNITSValues = Object.keys(UNITS);

  ingredientsSharedCollection: IIngredients[] = [];
  menusSharedCollection: IMenus[] = [];
  imagesUrlsSharedCollection: IImagesUrl[] = [];
  nutriensSharedCollection: INutriens[] = [];

  editForm: MenuGroupsFormGroup = this.menuGroupsFormService.createMenuGroupsFormGroup();

  constructor(
    protected menuGroupsService: MenuGroupsService,
    protected menuGroupsFormService: MenuGroupsFormService,
    protected ingredientsService: IngredientsService,
    protected menusService: MenusService,
    protected imagesUrlService: ImagesUrlService,
    protected nutriensService: NutriensService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareIngredients = (o1: IIngredients | null, o2: IIngredients | null): boolean => this.ingredientsService.compareIngredients(o1, o2);

  compareMenus = (o1: IMenus | null, o2: IMenus | null): boolean => this.menusService.compareMenus(o1, o2);

  compareImagesUrl = (o1: IImagesUrl | null, o2: IImagesUrl | null): boolean => this.imagesUrlService.compareImagesUrl(o1, o2);

  compareNutriens = (o1: INutriens | null, o2: INutriens | null): boolean => this.nutriensService.compareNutriens(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menuGroups }) => {
      this.menuGroups = menuGroups;
      if (menuGroups) {
        this.updateForm(menuGroups);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menuGroups = this.menuGroupsFormService.getMenuGroups(this.editForm);
    if (menuGroups.id !== null) {
      this.subscribeToSaveResponse(this.menuGroupsService.update(menuGroups));
    } else {
      this.subscribeToSaveResponse(this.menuGroupsService.create(menuGroups));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuGroups>>): void {
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

  protected updateForm(menuGroups: IMenuGroups): void {
    this.menuGroups = menuGroups;
    this.menuGroupsFormService.resetForm(this.editForm, menuGroups);

    this.ingredientsSharedCollection = this.ingredientsService.addIngredientsToCollectionIfMissing<IIngredients>(
      this.ingredientsSharedCollection,
      ...(menuGroups.ingradients ?? [])
    );
    this.menusSharedCollection = this.menusService.addMenusToCollectionIfMissing<IMenus>(
      this.menusSharedCollection,
      ...(menuGroups.menus ?? [])
    );
    this.imagesUrlsSharedCollection = this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(
      this.imagesUrlsSharedCollection,
      ...(menuGroups.imagesUrls ?? [])
    );
    this.nutriensSharedCollection = this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(
      this.nutriensSharedCollection,
      menuGroups.nutriens
    );
  }

  protected loadRelationshipsOptions(): void {
    this.ingredientsService
      .query()
      .pipe(map((res: HttpResponse<IIngredients[]>) => res.body ?? []))
      .pipe(
        map((ingredients: IIngredients[]) =>
          this.ingredientsService.addIngredientsToCollectionIfMissing<IIngredients>(ingredients, ...(this.menuGroups?.ingradients ?? []))
        )
      )
      .subscribe((ingredients: IIngredients[]) => (this.ingredientsSharedCollection = ingredients));

    this.menusService
      .query()
      .pipe(map((res: HttpResponse<IMenus[]>) => res.body ?? []))
      .pipe(map((menus: IMenus[]) => this.menusService.addMenusToCollectionIfMissing<IMenus>(menus, ...(this.menuGroups?.menus ?? []))))
      .subscribe((menus: IMenus[]) => (this.menusSharedCollection = menus));

    this.imagesUrlService
      .query()
      .pipe(map((res: HttpResponse<IImagesUrl[]>) => res.body ?? []))
      .pipe(
        map((imagesUrls: IImagesUrl[]) =>
          this.imagesUrlService.addImagesUrlToCollectionIfMissing<IImagesUrl>(imagesUrls, ...(this.menuGroups?.imagesUrls ?? []))
        )
      )
      .subscribe((imagesUrls: IImagesUrl[]) => (this.imagesUrlsSharedCollection = imagesUrls));

    this.nutriensService
      .query()
      .pipe(map((res: HttpResponse<INutriens[]>) => res.body ?? []))
      .pipe(
        map((nutriens: INutriens[]) =>
          this.nutriensService.addNutriensToCollectionIfMissing<INutriens>(nutriens, this.menuGroups?.nutriens)
        )
      )
      .subscribe((nutriens: INutriens[]) => (this.nutriensSharedCollection = nutriens));
  }
}
