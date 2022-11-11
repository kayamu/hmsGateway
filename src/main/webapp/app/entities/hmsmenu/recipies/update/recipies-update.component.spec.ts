import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RecipiesFormService } from './recipies-form.service';
import { RecipiesService } from '../service/recipies.service';
import { IRecipies } from '../recipies.model';
import { IImagesUrl } from 'app/entities/hmsmenu/images-url/images-url.model';
import { ImagesUrlService } from 'app/entities/hmsmenu/images-url/service/images-url.service';

import { RecipiesUpdateComponent } from './recipies-update.component';

describe('Recipies Management Update Component', () => {
  let comp: RecipiesUpdateComponent;
  let fixture: ComponentFixture<RecipiesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let recipiesFormService: RecipiesFormService;
  let recipiesService: RecipiesService;
  let imagesUrlService: ImagesUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RecipiesUpdateComponent],
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
      .overrideTemplate(RecipiesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RecipiesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    recipiesFormService = TestBed.inject(RecipiesFormService);
    recipiesService = TestBed.inject(RecipiesService);
    imagesUrlService = TestBed.inject(ImagesUrlService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ImagesUrl query and add missing value', () => {
      const recipies: IRecipies = { id: 456 };
      const imagesUrls: IImagesUrl[] = [{ id: 34899 }];
      recipies.imagesUrls = imagesUrls;

      const imagesUrlCollection: IImagesUrl[] = [{ id: 18947 }];
      jest.spyOn(imagesUrlService, 'query').mockReturnValue(of(new HttpResponse({ body: imagesUrlCollection })));
      const additionalImagesUrls = [...imagesUrls];
      const expectedCollection: IImagesUrl[] = [...additionalImagesUrls, ...imagesUrlCollection];
      jest.spyOn(imagesUrlService, 'addImagesUrlToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ recipies });
      comp.ngOnInit();

      expect(imagesUrlService.query).toHaveBeenCalled();
      expect(imagesUrlService.addImagesUrlToCollectionIfMissing).toHaveBeenCalledWith(
        imagesUrlCollection,
        ...additionalImagesUrls.map(expect.objectContaining)
      );
      expect(comp.imagesUrlsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const recipies: IRecipies = { id: 456 };
      const imagesUrls: IImagesUrl = { id: 63927 };
      recipies.imagesUrls = [imagesUrls];

      activatedRoute.data = of({ recipies });
      comp.ngOnInit();

      expect(comp.imagesUrlsSharedCollection).toContain(imagesUrls);
      expect(comp.recipies).toEqual(recipies);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRecipies>>();
      const recipies = { id: 123 };
      jest.spyOn(recipiesFormService, 'getRecipies').mockReturnValue(recipies);
      jest.spyOn(recipiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recipies });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recipies }));
      saveSubject.complete();

      // THEN
      expect(recipiesFormService.getRecipies).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(recipiesService.update).toHaveBeenCalledWith(expect.objectContaining(recipies));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRecipies>>();
      const recipies = { id: 123 };
      jest.spyOn(recipiesFormService, 'getRecipies').mockReturnValue({ id: null });
      jest.spyOn(recipiesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recipies: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: recipies }));
      saveSubject.complete();

      // THEN
      expect(recipiesFormService.getRecipies).toHaveBeenCalled();
      expect(recipiesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRecipies>>();
      const recipies = { id: 123 };
      jest.spyOn(recipiesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ recipies });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(recipiesService.update).toHaveBeenCalled();
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
  });
});
