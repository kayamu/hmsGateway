import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConditionDetailsFormService } from './condition-details-form.service';
import { ConditionDetailsService } from '../service/condition-details.service';
import { IConditionDetails } from '../condition-details.model';

import { ConditionDetailsUpdateComponent } from './condition-details-update.component';

describe('ConditionDetails Management Update Component', () => {
  let comp: ConditionDetailsUpdateComponent;
  let fixture: ComponentFixture<ConditionDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conditionDetailsFormService: ConditionDetailsFormService;
  let conditionDetailsService: ConditionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConditionDetailsUpdateComponent],
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
      .overrideTemplate(ConditionDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConditionDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conditionDetailsFormService = TestBed.inject(ConditionDetailsFormService);
    conditionDetailsService = TestBed.inject(ConditionDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const conditionDetails: IConditionDetails = { id: 456 };

      activatedRoute.data = of({ conditionDetails });
      comp.ngOnInit();

      expect(comp.conditionDetails).toEqual(conditionDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditionDetails>>();
      const conditionDetails = { id: 123 };
      jest.spyOn(conditionDetailsFormService, 'getConditionDetails').mockReturnValue(conditionDetails);
      jest.spyOn(conditionDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditionDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conditionDetails }));
      saveSubject.complete();

      // THEN
      expect(conditionDetailsFormService.getConditionDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(conditionDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(conditionDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditionDetails>>();
      const conditionDetails = { id: 123 };
      jest.spyOn(conditionDetailsFormService, 'getConditionDetails').mockReturnValue({ id: null });
      jest.spyOn(conditionDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditionDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conditionDetails }));
      saveSubject.complete();

      // THEN
      expect(conditionDetailsFormService.getConditionDetails).toHaveBeenCalled();
      expect(conditionDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditionDetails>>();
      const conditionDetails = { id: 123 };
      jest.spyOn(conditionDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditionDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conditionDetailsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
