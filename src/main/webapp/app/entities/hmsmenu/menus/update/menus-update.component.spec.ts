import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MenusFormService } from './menus-form.service';
import { MenusService } from '../service/menus.service';
import { IMenus } from '../menus.model';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { IMeals } from 'app/entities/hmsmenu/meals/meals.model';
import { MealsService } from 'app/entities/hmsmenu/meals/service/meals.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';

import { MenusUpdateComponent } from './menus-update.component';

describe('Menus Management Update Component', () => {
  let comp: MenusUpdateComponent;
  let fixture: ComponentFixture<MenusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let menusFormService: MenusFormService;
  let menusService: MenusService;
  let imagesUrlService: ImagesUrlService;
  let mealsService: MealsService;
  let nutriensService: NutriensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MenusUpdateComponent],
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
      .overrideTemplate(MenusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MenusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    menusFormService = TestBed.inject(MenusFormService);
    menusService = TestBed.inject(MenusService);
    imagesUrlService = TestBed.inject(ImagesUrlService);
    mealsService = TestBed.inject(MealsService);
    nutriensService = TestBed.inject(NutriensService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ImagesUrl query and add missing value', () => {
      const menus: IMenus = { id: 456 };
      const imagesUrls: IImagesUrl[] = [{ id: 54042 }];
      menus.imagesUrls = imagesUrls;

      const imagesUrlCollection: IImagesUrl[] = [{ id: 24599 }];
      jest.spyOn(imagesUrlService, 'query').mockReturnValue(of(new HttpResponse({ body: imagesUrlCollection })));
      const additionalImagesUrls = [...imagesUrls];
      const expectedCollection: IImagesUrl[] = [...additionalImagesUrls, ...imagesUrlCollection];
      jest.spyOn(imagesUrlService, 'addImagesUrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menus });
      comp.ngOnInit();

      expect(imagesUrlService.query).toHaveBeenCalled();
      expect(imagesUrlService.addImagesUrlToCollectionIfMissing).toHaveBeenCalledWith(
        imagesUrlCollection,
        ...additionalImagesUrls.map(expect.objectContaining)
      );
      expect(comp.imagesUrlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Meals query and add missing value', () => {
      const menus: IMenus = { id: 456 };
      const meals: IMeals[] = [{ id: 17364 }];
      menus.meals = meals;

      const mealsCollection: IMeals[] = [{ id: 33807 }];
      jest.spyOn(mealsService, 'query').mockReturnValue(of(new HttpResponse({ body: mealsCollection })));
      const additionalMeals = [...meals];
      const expectedCollection: IMeals[] = [...additionalMeals, ...mealsCollection];
      jest.spyOn(mealsService, 'addMealsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menus });
      comp.ngOnInit();

      expect(mealsService.query).toHaveBeenCalled();
      expect(mealsService.addMealsToCollectionIfMissing).toHaveBeenCalledWith(
        mealsCollection,
        ...additionalMeals.map(expect.objectContaining)
      );
      expect(comp.mealsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Nutriens query and add missing value', () => {
      const menus: IMenus = { id: 456 };
      const nutriens: INutriens = { id: 26044 };
      menus.nutriens = nutriens;

      const nutriensCollection: INutriens[] = [{ id: 16704 }];
      jest.spyOn(nutriensService, 'query').mockReturnValue(of(new HttpResponse({ body: nutriensCollection })));
      const additionalNutriens = [nutriens];
      const expectedCollection: INutriens[] = [...additionalNutriens, ...nutriensCollection];
      jest.spyOn(nutriensService, 'addNutriensToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menus });
      comp.ngOnInit();

      expect(nutriensService.query).toHaveBeenCalled();
      expect(nutriensService.addNutriensToCollectionIfMissing).toHaveBeenCalledWith(
        nutriensCollection,
        ...additionalNutriens.map(expect.objectContaining)
      );
      expect(comp.nutriensSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const menus: IMenus = { id: 456 };
      const imagesUrls: IImagesUrl = { id: 7497 };
      menus.imagesUrls = [imagesUrls];
      const meals: IMeals = { id: 69825 };
      menus.meals = [meals];
      const nutriens: INutriens = { id: 92742 };
      menus.nutriens = nutriens;

      activatedRoute.data = of({ menus });
      comp.ngOnInit();

      expect(comp.imagesUrlsSharedCollection).toContain(imagesUrls);
      expect(comp.mealsSharedCollection).toContain(meals);
      expect(comp.nutriensSharedCollection).toContain(nutriens);
      expect(comp.menus).toEqual(menus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenus>>();
      const menus = { id: 123 };
      jest.spyOn(menusFormService, 'getMenus').mockReturnValue(menus);
      jest.spyOn(menusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menus }));
      saveSubject.complete();

      // THEN
      expect(menusFormService.getMenus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(menusService.update).toHaveBeenCalledWith(expect.objectContaining(menus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenus>>();
      const menus = { id: 123 };
      jest.spyOn(menusFormService, 'getMenus').mockReturnValue({ id: null });
      jest.spyOn(menusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menus }));
      saveSubject.complete();

      // THEN
      expect(menusFormService.getMenus).toHaveBeenCalled();
      expect(menusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenus>>();
      const menus = { id: 123 };
      jest.spyOn(menusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(menusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareImagesUrl', () => {
      it('Should forward to imagesUrlService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(imagesUrlService, 'compareImagesUrl');
        comp.compareImagesUrl(entity, entity2);
        expect(imagesUrlService.compareImagesUrl).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMeals', () => {
      it('Should forward to mealsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(mealsService, 'compareMeals');
        comp.compareMeals(entity, entity2);
        expect(mealsService.compareMeals).toHaveBeenCalledWith(entity, entity2);
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
