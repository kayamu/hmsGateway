import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IngredientsFormService } from './ingredients-form.service';
import { IngredientsService } from '../service/ingredients.service';
import { IIngredients } from '../ingredients.model';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';
import { INutriens } from 'app/entities/hmsmenu/nutriens/nutriens.model';
import { NutriensService } from 'app/entities/hmsmenu/nutriens/service/nutriens.service';

import { IngredientsUpdateComponent } from './ingredients-update.component';

describe('Ingredients Management Update Component', () => {
  let comp: IngredientsUpdateComponent;
  let fixture: ComponentFixture<IngredientsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ingredientsFormService: IngredientsFormService;
  let ingredientsService: IngredientsService;
  let imagesUrlService: ImagesUrlService;
  let nutriensService: NutriensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IngredientsUpdateComponent],
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
      .overrideTemplate(IngredientsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IngredientsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ingredientsFormService = TestBed.inject(IngredientsFormService);
    ingredientsService = TestBed.inject(IngredientsService);
    imagesUrlService = TestBed.inject(ImagesUrlService);
    nutriensService = TestBed.inject(NutriensService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ImagesUrl query and add missing value', () => {
      const ingredients: IIngredients = { id: 456 };
      const imagesUrls: IImagesUrl[] = [{ id: 71098 }];
      ingredients.imagesUrls = imagesUrls;

      const imagesUrlCollection: IImagesUrl[] = [{ id: 49803 }];
      jest.spyOn(imagesUrlService, 'query').mockReturnValue(of(new HttpResponse({ body: imagesUrlCollection })));
      const additionalImagesUrls = [...imagesUrls];
      const expectedCollection: IImagesUrl[] = [...additionalImagesUrls, ...imagesUrlCollection];
      jest.spyOn(imagesUrlService, 'addImagesUrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ingredients });
      comp.ngOnInit();

      expect(imagesUrlService.query).toHaveBeenCalled();
      expect(imagesUrlService.addImagesUrlToCollectionIfMissing).toHaveBeenCalledWith(
        imagesUrlCollection,
        ...additionalImagesUrls.map(expect.objectContaining)
      );
      expect(comp.imagesUrlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Nutriens query and add missing value', () => {
      const ingredients: IIngredients = { id: 456 };
      const nutriens: INutriens = { id: 51364 };
      ingredients.nutriens = nutriens;

      const nutriensCollection: INutriens[] = [{ id: 78597 }];
      jest.spyOn(nutriensService, 'query').mockReturnValue(of(new HttpResponse({ body: nutriensCollection })));
      const additionalNutriens = [nutriens];
      const expectedCollection: INutriens[] = [...additionalNutriens, ...nutriensCollection];
      jest.spyOn(nutriensService, 'addNutriensToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ingredients });
      comp.ngOnInit();

      expect(nutriensService.query).toHaveBeenCalled();
      expect(nutriensService.addNutriensToCollectionIfMissing).toHaveBeenCalledWith(
        nutriensCollection,
        ...additionalNutriens.map(expect.objectContaining)
      );
      expect(comp.nutriensSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ingredients: IIngredients = { id: 456 };
      const imagesUrls: IImagesUrl = { id: 24595 };
      ingredients.imagesUrls = [imagesUrls];
      const nutriens: INutriens = { id: 73705 };
      ingredients.nutriens = nutriens;

      activatedRoute.data = of({ ingredients });
      comp.ngOnInit();

      expect(comp.imagesUrlsSharedCollection).toContain(imagesUrls);
      expect(comp.nutriensSharedCollection).toContain(nutriens);
      expect(comp.ingredients).toEqual(ingredients);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIngredients>>();
      const ingredients = { id: 123 };
      jest.spyOn(ingredientsFormService, 'getIngredients').mockReturnValue(ingredients);
      jest.spyOn(ingredientsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ingredients });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ingredients }));
      saveSubject.complete();

      // THEN
      expect(ingredientsFormService.getIngredients).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ingredientsService.update).toHaveBeenCalledWith(expect.objectContaining(ingredients));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIngredients>>();
      const ingredients = { id: 123 };
      jest.spyOn(ingredientsFormService, 'getIngredients').mockReturnValue({ id: null });
      jest.spyOn(ingredientsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ingredients: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ingredients }));
      saveSubject.complete();

      // THEN
      expect(ingredientsFormService.getIngredients).toHaveBeenCalled();
      expect(ingredientsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIngredients>>();
      const ingredients = { id: 123 };
      jest.spyOn(ingredientsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ingredients });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ingredientsService.update).toHaveBeenCalled();
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
