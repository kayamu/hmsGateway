import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MealsFormService } from './meals-form.service';
import { MealsService } from '../service/meals.service';
import { IMeals } from '../meals.model';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { IMealIngredients } from 'app/entities/hmsmenu/meal-ingredients/meal-ingredients.model';
import { MealIngredientsService } from 'app/entities/hmsmenu/meal-ingredients/service/meal-ingredients.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';
import { IRecipies } from 'app/entities/hmsmenu/recipies/recipies.model';
import { RecipiesService } from 'app/entities/hmsmenu/recipies/service/recipies.service';

import { MealsUpdateComponent } from './meals-update.component';

describe('Meals Management Update Component', () => {
  let comp: MealsUpdateComponent;
  let fixture: ComponentFixture<MealsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let mealsFormService: MealsFormService;
  let mealsService: MealsService;
  let imagesUrlService: ImagesUrlService;
  let mealIngredientsService: MealIngredientsService;
  let nutriensService: NutriensService;
  let recipiesService: RecipiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MealsUpdateComponent],
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
      .overrideTemplate(MealsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MealsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mealsFormService = TestBed.inject(MealsFormService);
    mealsService = TestBed.inject(MealsService);
    imagesUrlService = TestBed.inject(ImagesUrlService);
    mealIngredientsService = TestBed.inject(MealIngredientsService);
    nutriensService = TestBed.inject(NutriensService);
    recipiesService = TestBed.inject(RecipiesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ImagesUrl query and add missing value', () => {
      const meals: IMeals = { id: 456 };
      const imagesUrls: IImagesUrl[] = [{ id: 69396 }];
      meals.imagesUrls = imagesUrls;

      const imagesUrlCollection: IImagesUrl[] = [{ id: 56713 }];
      jest.spyOn(imagesUrlService, 'query').mockReturnValue(of(new HttpResponse({ body: imagesUrlCollection })));
      const additionalImagesUrls = [...imagesUrls];
      const expectedCollection: IImagesUrl[] = [...additionalImagesUrls, ...imagesUrlCollection];
      jest.spyOn(imagesUrlService, 'addImagesUrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ meals });
      comp.ngOnInit();

      expect(imagesUrlService.query).toHaveBeenCalled();
      expect(imagesUrlService.addImagesUrlToCollectionIfMissing).toHaveBeenCalledWith(
        imagesUrlCollection,
        ...additionalImagesUrls.map(expect.objectContaining)
      );
      expect(comp.imagesUrlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call MealIngredients query and add missing value', () => {
      const meals: IMeals = { id: 456 };
      const mealIngredients: IMealIngredients[] = [{ id: 74297 }];
      meals.mealIngredients = mealIngredients;

      const mealIngredientsCollection: IMealIngredients[] = [{ id: 51446 }];
      jest.spyOn(mealIngredientsService, 'query').mockReturnValue(of(new HttpResponse({ body: mealIngredientsCollection })));
      const additionalMealIngredients = [...mealIngredients];
      const expectedCollection: IMealIngredients[] = [...additionalMealIngredients, ...mealIngredientsCollection];
      jest.spyOn(mealIngredientsService, 'addMealIngredientsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ meals });
      comp.ngOnInit();

      expect(mealIngredientsService.query).toHaveBeenCalled();
      expect(mealIngredientsService.addMealIngredientsToCollectionIfMissing).toHaveBeenCalledWith(
        mealIngredientsCollection,
        ...additionalMealIngredients.map(expect.objectContaining)
      );
      expect(comp.mealIngredientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Nutriens query and add missing value', () => {
      const meals: IMeals = { id: 456 };
      const nutriens: INutriens = { id: 91407 };
      meals.nutriens = nutriens;

      const nutriensCollection: INutriens[] = [{ id: 94436 }];
      jest.spyOn(nutriensService, 'query').mockReturnValue(of(new HttpResponse({ body: nutriensCollection })));
      const additionalNutriens = [nutriens];
      const expectedCollection: INutriens[] = [...additionalNutriens, ...nutriensCollection];
      jest.spyOn(nutriensService, 'addNutriensToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ meals });
      comp.ngOnInit();

      expect(nutriensService.query).toHaveBeenCalled();
      expect(nutriensService.addNutriensToCollectionIfMissing).toHaveBeenCalledWith(
        nutriensCollection,
        ...additionalNutriens.map(expect.objectContaining)
      );
      expect(comp.nutriensSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Recipies query and add missing value', () => {
      const meals: IMeals = { id: 456 };
      const recipies: IRecipies = { id: 22211 };
      meals.recipies = recipies;

      const recipiesCollection: IRecipies[] = [{ id: 33593 }];
      jest.spyOn(recipiesService, 'query').mockReturnValue(of(new HttpResponse({ body: recipiesCollection })));
      const additionalRecipies = [recipies];
      const expectedCollection: IRecipies[] = [...additionalRecipies, ...recipiesCollection];
      jest.spyOn(recipiesService, 'addRecipiesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ meals });
      comp.ngOnInit();

      expect(recipiesService.query).toHaveBeenCalled();
      expect(recipiesService.addRecipiesToCollectionIfMissing).toHaveBeenCalledWith(
        recipiesCollection,
        ...additionalRecipies.map(expect.objectContaining)
      );
      expect(comp.recipiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const meals: IMeals = { id: 456 };
      const imagesUrls: IImagesUrl = { id: 60928 };
      meals.imagesUrls = [imagesUrls];
      const mealIngredients: IMealIngredients = { id: 61599 };
      meals.mealIngredients = [mealIngredients];
      const nutriens: INutriens = { id: 36207 };
      meals.nutriens = nutriens;
      const recipies: IRecipies = { id: 51723 };
      meals.recipies = recipies;

      activatedRoute.data = of({ meals });
      comp.ngOnInit();

      expect(comp.imagesUrlsSharedCollection).toContain(imagesUrls);
      expect(comp.mealIngredientsSharedCollection).toContain(mealIngredients);
      expect(comp.nutriensSharedCollection).toContain(nutriens);
      expect(comp.recipiesSharedCollection).toContain(recipies);
      expect(comp.meals).toEqual(meals);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMeals>>();
      const meals = { id: 123 };
      jest.spyOn(mealsFormService, 'getMeals').mockReturnValue(meals);
      jest.spyOn(mealsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ meals });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: meals }));
      saveSubject.complete();

      // THEN
      expect(mealsFormService.getMeals).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(mealsService.update).toHaveBeenCalledWith(expect.objectContaining(meals));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMeals>>();
      const meals = { id: 123 };
      jest.spyOn(mealsFormService, 'getMeals').mockReturnValue({ id: null });
      jest.spyOn(mealsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ meals: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: meals }));
      saveSubject.complete();

      // THEN
      expect(mealsFormService.getMeals).toHaveBeenCalled();
      expect(mealsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMeals>>();
      const meals = { id: 123 };
      jest.spyOn(mealsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ meals });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(mealsService.update).toHaveBeenCalled();
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

    describe('compareMealIngredients', () => {
      it('Should forward to mealIngredientsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(mealIngredientsService, 'compareMealIngredients');
        comp.compareMealIngredients(entity, entity2);
        expect(mealIngredientsService.compareMealIngredients).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareRecipies', () => {
      it('Should forward to recipiesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(recipiesService, 'compareRecipies');
        comp.compareRecipies(entity, entity2);
        expect(recipiesService.compareRecipies).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
