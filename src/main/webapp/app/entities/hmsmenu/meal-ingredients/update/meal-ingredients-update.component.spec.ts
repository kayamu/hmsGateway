import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MealIngredientsFormService } from './meal-ingredients-form.service';
import { MealIngredientsService } from '../service/meal-ingredients.service';
import { IMealIngredients } from '../meal-ingredients.model';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';
import { IIngredients } from 'app/entities/hmsmenu/ingredients/ingredients.model';
import { IngredientsService } from 'app/entities/hmsmenu/ingredients/service/ingredients.service';

import { MealIngredientsUpdateComponent } from './meal-ingredients-update.component';

describe('MealIngredients Management Update Component', () => {
  let comp: MealIngredientsUpdateComponent;
  let fixture: ComponentFixture<MealIngredientsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let mealIngredientsFormService: MealIngredientsFormService;
  let mealIngredientsService: MealIngredientsService;
  let nutriensService: NutriensService;
  let ingredientsService: IngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MealIngredientsUpdateComponent],
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
      .overrideTemplate(MealIngredientsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MealIngredientsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mealIngredientsFormService = TestBed.inject(MealIngredientsFormService);
    mealIngredientsService = TestBed.inject(MealIngredientsService);
    nutriensService = TestBed.inject(NutriensService);
    ingredientsService = TestBed.inject(IngredientsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Nutriens query and add missing value', () => {
      const mealIngredients: IMealIngredients = { id: 456 };
      const nutriens: INutriens = { id: 41290 };
      mealIngredients.nutriens = nutriens;

      const nutriensCollection: INutriens[] = [{ id: 96492 }];
      jest.spyOn(nutriensService, 'query').mockReturnValue(of(new HttpResponse({ body: nutriensCollection })));
      const additionalNutriens = [nutriens];
      const expectedCollection: INutriens[] = [...additionalNutriens, ...nutriensCollection];
      jest.spyOn(nutriensService, 'addNutriensToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ mealIngredients });
      comp.ngOnInit();

      expect(nutriensService.query).toHaveBeenCalled();
      expect(nutriensService.addNutriensToCollectionIfMissing).toHaveBeenCalledWith(
        nutriensCollection,
        ...additionalNutriens.map(expect.objectContaining)
      );
      expect(comp.nutriensSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Ingredients query and add missing value', () => {
      const mealIngredients: IMealIngredients = { id: 456 };
      const ingradients: IIngredients = { id: 93166 };
      mealIngredients.ingradients = ingradients;

      const ingredientsCollection: IIngredients[] = [{ id: 68037 }];
      jest.spyOn(ingredientsService, 'query').mockReturnValue(of(new HttpResponse({ body: ingredientsCollection })));
      const additionalIngredients = [ingradients];
      const expectedCollection: IIngredients[] = [...additionalIngredients, ...ingredientsCollection];
      jest.spyOn(ingredientsService, 'addIngredientsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ mealIngredients });
      comp.ngOnInit();

      expect(ingredientsService.query).toHaveBeenCalled();
      expect(ingredientsService.addIngredientsToCollectionIfMissing).toHaveBeenCalledWith(
        ingredientsCollection,
        ...additionalIngredients.map(expect.objectContaining)
      );
      expect(comp.ingredientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const mealIngredients: IMealIngredients = { id: 456 };
      const nutriens: INutriens = { id: 48287 };
      mealIngredients.nutriens = nutriens;
      const ingradients: IIngredients = { id: 54602 };
      mealIngredients.ingradients = ingradients;

      activatedRoute.data = of({ mealIngredients });
      comp.ngOnInit();

      expect(comp.nutriensSharedCollection).toContain(nutriens);
      expect(comp.ingredientsSharedCollection).toContain(ingradients);
      expect(comp.mealIngredients).toEqual(mealIngredients);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMealIngredients>>();
      const mealIngredients = { id: 123 };
      jest.spyOn(mealIngredientsFormService, 'getMealIngredients').mockReturnValue(mealIngredients);
      jest.spyOn(mealIngredientsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mealIngredients });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mealIngredients }));
      saveSubject.complete();

      // THEN
      expect(mealIngredientsFormService.getMealIngredients).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(mealIngredientsService.update).toHaveBeenCalledWith(expect.objectContaining(mealIngredients));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMealIngredients>>();
      const mealIngredients = { id: 123 };
      jest.spyOn(mealIngredientsFormService, 'getMealIngredients').mockReturnValue({ id: null });
      jest.spyOn(mealIngredientsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mealIngredients: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mealIngredients }));
      saveSubject.complete();

      // THEN
      expect(mealIngredientsFormService.getMealIngredients).toHaveBeenCalled();
      expect(mealIngredientsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMealIngredients>>();
      const mealIngredients = { id: 123 };
      jest.spyOn(mealIngredientsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mealIngredients });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(mealIngredientsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareNutriens', () => {
      it('Should forward to nutriensService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(nutriensService, 'compareNutriens');
        comp.compareNutriens(entity, entity2);
        expect(nutriensService.compareNutriens).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareIngredients', () => {
      it('Should forward to ingredientsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ingredientsService, 'compareIngredients');
        comp.compareIngredients(entity, entity2);
        expect(ingredientsService.compareIngredients).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
