import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AllergensFormService } from './allergens-form.service';
import { AllergensService } from '../service/allergens.service';
import { IAllergens } from '../allergens.model';

import { AllergensUpdateComponent } from './allergens-update.component';

describe('Allergens Management Update Component', () => {
  let comp: AllergensUpdateComponent;
  let fixture: ComponentFixture<AllergensUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let allergensFormService: AllergensFormService;
  let allergensService: AllergensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AllergensUpdateComponent],
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
      .overrideTemplate(AllergensUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AllergensUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    allergensFormService = TestBed.inject(AllergensFormService);
    allergensService = TestBed.inject(AllergensService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const allergens: IAllergens = { id: 456 };

      activatedRoute.data = of({ allergens });
      comp.ngOnInit();

      expect(comp.allergens).toEqual(allergens);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAllergens>>();
      const allergens = { id: 123 };
      jest.spyOn(allergensFormService, 'getAllergens').mockReturnValue(allergens);
      jest.spyOn(allergensService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ allergens });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: allergens }));
      saveSubject.complete();

      // THEN
      expect(allergensFormService.getAllergens).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(allergensService.update).toHaveBeenCalledWith(expect.objectContaining(allergens));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAllergens>>();
      const allergens = { id: 123 };
      jest.spyOn(allergensFormService, 'getAllergens').mockReturnValue({ id: null });
      jest.spyOn(allergensService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ allergens: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: allergens }));
      saveSubject.complete();

      // THEN
      expect(allergensFormService.getAllergens).toHaveBeenCalled();
      expect(allergensService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAllergens>>();
      const allergens = { id: 123 };
      jest.spyOn(allergensService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ allergens });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(allergensService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
