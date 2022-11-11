import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NutriensFormService } from './nutriens-form.service';
import { NutriensService } from '../service/nutriens.service';
import { INutriens } from '../nutriens.model';

import { NutriensUpdateComponent } from './nutriens-update.component';

describe('Nutriens Management Update Component', () => {
  let comp: NutriensUpdateComponent;
  let fixture: ComponentFixture<NutriensUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nutriensFormService: NutriensFormService;
  let nutriensService: NutriensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NutriensUpdateComponent],
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
      .overrideTemplate(NutriensUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NutriensUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nutriensFormService = TestBed.inject(NutriensFormService);
    nutriensService = TestBed.inject(NutriensService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nutriens: INutriens = { id: 456 };

      activatedRoute.data = of({ nutriens });
      comp.ngOnInit();

      expect(comp.nutriens).toEqual(nutriens);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutriens>>();
      const nutriens = { id: 123 };
      jest.spyOn(nutriensFormService, 'getNutriens').mockReturnValue(nutriens);
      jest.spyOn(nutriensService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutriens });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nutriens }));
      saveSubject.complete();

      // THEN
      expect(nutriensFormService.getNutriens).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(nutriensService.update).toHaveBeenCalledWith(expect.objectContaining(nutriens));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutriens>>();
      const nutriens = { id: 123 };
      jest.spyOn(nutriensFormService, 'getNutriens').mockReturnValue({ id: null });
      jest.spyOn(nutriensService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutriens: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nutriens }));
      saveSubject.complete();

      // THEN
      expect(nutriensFormService.getNutriens).toHaveBeenCalled();
      expect(nutriensService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutriens>>();
      const nutriens = { id: 123 };
      jest.spyOn(nutriensService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutriens });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nutriensService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
