import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MenuGroupsFormService } from './menu-groups-form.service';
import { MenuGroupsService } from '../service/menu-groups.service';
import { IMenuGroups } from '../menu-groups.model';
import { IIngredients } from 'app/entities/hmsmenu/ingredients/ingredients.model';
import { IngredientsService } from 'app/entities/hmsmenu/ingredients/service/ingredients.service';
import { IMenus } from 'app/entities/hmsmenu/menus/menus.model';
import { MenusService } from 'app/entities/hmsmenu/menus/service/menus.service';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';

import { MenuGroupsUpdateComponent } from './menu-groups-update.component';

describe('MenuGroups Management Update Component', () => {
  let comp: MenuGroupsUpdateComponent;
  let fixture: ComponentFixture<MenuGroupsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let menuGroupsFormService: MenuGroupsFormService;
  let menuGroupsService: MenuGroupsService;
  let ingredientsService: IngredientsService;
  let menusService: MenusService;
  let imagesUrlService: ImagesUrlService;
  let nutriensService: NutriensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MenuGroupsUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MenuGroupsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MenuGroupsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    menuGroupsFormService = TestBed.inject(MenuGroupsFormService);
    menuGroupsService = TestBed.inject(MenuGroupsService);
    ingredientsService = TestBed.inject(IngredientsService);
    menusService = TestBed.inject(MenusService);
    imagesUrlService = TestBed.inject(ImagesUrlService);
    nutriensService = TestBed.inject(NutriensService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Ingredients query and add missing value', () => {
      const menuGroups: IMenuGroups = { id: 456 };
      const ingradients: IIngredients[] = [{ id: 37339 }];
      menuGroups.ingradients = ingradients;

      const ingredientsCollection: IIngredients[] = [{ id: 28777 }];
      jest.spyOn(ingredientsService, 'query').mockReturnValue(of(new HttpResponse({ body: ingredientsCollection })));
      const additionalIngredients = [...ingradients];
      const expectedCollection: IIngredients[] = [...additionalIngredients, ...ingredientsCollection];
      jest.spyOn(ingredientsService, 'addIngredientsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menuGroups });
      comp.ngOnInit();

      expect(ingredientsService.query).toHaveBeenCalled();
      expect(ingredientsService.addIngredientsToCollectionIfMissing).toHaveBeenCalledWith(
        ingredientsCollection,
        ...additionalIngredients.map(expect.objectContaining)
      );
      expect(comp.ingredientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Menus query and add missing value', () => {
      const menuGroups: IMenuGroups = { id: 456 };
      const menus: IMenus[] = [{ id: 15909 }];
      menuGroups.menus = menus;

      const menusCollection: IMenus[] = [{ id: 79696 }];
      jest.spyOn(menusService, 'query').mockReturnValue(of(new HttpResponse({ body: menusCollection })));
      const additionalMenus = [...menus];
      const expectedCollection: IMenus[] = [...additionalMenus, ...menusCollection];
      jest.spyOn(menusService, 'addMenusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menuGroups });
      comp.ngOnInit();

      expect(menusService.query).toHaveBeenCalled();
      expect(menusService.addMenusToCollectionIfMissing).toHaveBeenCalledWith(
        menusCollection,
        ...additionalMenus.map(expect.objectContaining)
      );
      expect(comp.menusSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ImagesUrl query and add missing value', () => {
      const menuGroups: IMenuGroups = { id: 456 };
      const imagesUrls: IImagesUrl[] = [{ id: 47663 }];
      menuGroups.imagesUrls = imagesUrls;

      const imagesUrlCollection: IImagesUrl[] = [{ id: 20609 }];
      jest.spyOn(imagesUrlService, 'query').mockReturnValue(of(new HttpResponse({ body: imagesUrlCollection })));
      const additionalImagesUrls = [...imagesUrls];
      const expectedCollection: IImagesUrl[] = [...additionalImagesUrls, ...imagesUrlCollection];
      jest.spyOn(imagesUrlService, 'addImagesUrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menuGroups });
      comp.ngOnInit();

      expect(imagesUrlService.query).toHaveBeenCalled();
      expect(imagesUrlService.addImagesUrlToCollectionIfMissing).toHaveBeenCalledWith(
        imagesUrlCollection,
        ...additionalImagesUrls.map(expect.objectContaining)
      );
      expect(comp.imagesUrlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Nutriens query and add missing value', () => {
      const menuGroups: IMenuGroups = { id: 456 };
      const nutriens: INutriens = { id: 7059 };
      menuGroups.nutriens = nutriens;

      const nutriensCollection: INutriens[] = [{ id: 60151 }];
      jest.spyOn(nutriensService, 'query').mockReturnValue(of(new HttpResponse({ body: nutriensCollection })));
      const additionalNutriens = [nutriens];
      const expectedCollection: INutriens[] = [...additionalNutriens, ...nutriensCollection];
      jest.spyOn(nutriensService, 'addNutriensToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menuGroups });
      comp.ngOnInit();

      expect(nutriensService.query).toHaveBeenCalled();
      expect(nutriensService.addNutriensToCollectionIfMissing).toHaveBeenCalledWith(
        nutriensCollection,
        ...additionalNutriens.map(expect.objectContaining)
      );
      expect(comp.nutriensSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const menuGroups: IMenuGroups = { id: 456 };
      const ingradients: IIngredients = { id: 204 };
      menuGroups.ingradients = [ingradients];
      const menus: IMenus = { id: 60361 };
      menuGroups.menus = [menus];
      const imagesUrls: IImagesUrl = { id: 64539 };
      menuGroups.imagesUrls = [imagesUrls];
      const nutriens: INutriens = { id: 91685 };
      menuGroups.nutriens = nutriens;

      activatedRoute.data = of({ menuGroups });
      comp.ngOnInit();

      expect(comp.ingredientsSharedCollection).toContain(ingradients);
      expect(comp.menusSharedCollection).toContain(menus);
      expect(comp.imagesUrlsSharedCollection).toContain(imagesUrls);
      expect(comp.nutriensSharedCollection).toContain(nutriens);
      expect(comp.menuGroups).toEqual(menuGroups);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuGroups>>();
      const menuGroups = { id: 123 };
      jest.spyOn(menuGroupsFormService, 'getMenuGroups').mockReturnValue(menuGroups);
      jest.spyOn(menuGroupsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuGroups });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menuGroups }));
      saveSubject.complete();

      // THEN
      expect(menuGroupsFormService.getMenuGroups).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(menuGroupsService.update).toHaveBeenCalledWith(expect.objectContaining(menuGroups));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuGroups>>();
      const menuGroups = { id: 123 };
      jest.spyOn(menuGroupsFormService, 'getMenuGroups').mockReturnValue({ id: null });
      jest.spyOn(menuGroupsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuGroups: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menuGroups }));
      saveSubject.complete();

      // THEN
      expect(menuGroupsFormService.getMenuGroups).toHaveBeenCalled();
      expect(menuGroupsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuGroups>>();
      const menuGroups = { id: 123 };
      jest.spyOn(menuGroupsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuGroups });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(menuGroupsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareIngredients', () => {
      it('Should forward to ingredientsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ingredientsService, 'compareIngredients');
        comp.compareIngredients(entity, entity2);
        expect(ingredientsService.compareIngredients).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMenus', () => {
      it('Should forward to menusService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(menusService, 'compareMenus');
        comp.compareMenus(entity, entity2);
        expect(menusService.compareMenus).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareImagesUrl', () => {
      it('Should forward to imagesUrlService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(imagesUrlService, 'compareImagesUrl');
        comp.compareImagesUrl(entity, entity2);
        expect(imagesUrlService.compareImagesUrl).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareNutriens', () => {
      it('Should forward to nutriensService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(nutriensService, 'compareNutriens');
        comp.compareNutriens(entity, entity2);
        expect(nutriensService.compareNutriens).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
