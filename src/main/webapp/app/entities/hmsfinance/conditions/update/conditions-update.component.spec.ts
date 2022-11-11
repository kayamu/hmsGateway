import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConditionsFormService } from './conditions-form.service';
import { ConditionsService } from '../service/conditions.service';
import { IConditions } from '../conditions.model';
import { IConditionDetails } from 'app/entities/hmsfinance/condition-details/condition-details.model';
import { ConditionDetailsService } from 'app/entities/hmsfinance/condition-details/service/condition-details.service';

import { ConditionsUpdateComponent } from './conditions-update.component';

describe('Conditions Management Update Component', () => {
  let comp: ConditionsUpdateComponent;
  let fixture: ComponentFixture<ConditionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conditionsFormService: ConditionsFormService;
  let conditionsService: ConditionsService;
  let conditionDetailsService: ConditionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConditionsUpdateComponent],
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
      .overrideTemplate(ConditionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConditionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conditionsFormService = TestBed.inject(ConditionsFormService);
    conditionsService = TestBed.inject(ConditionsService);
    conditionDetailsService = TestBed.inject(ConditionDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ConditionDetails query and add missing value', () => {
      const conditions: IConditions = { id: 456 };
      const conditionDetails: IConditionDetails[] = [{ id: 82389 }];
      conditions.conditionDetails = conditionDetails;

      const conditionDetailsCollection: IConditionDetails[] = [{ id: 65128 }];
      jest.spyOn(conditionDetailsService, 'query').mockReturnValue(of(new HttpResponse({ body: conditionDetailsCollection })));
      const additionalConditionDetails = [...conditionDetails];
      const expectedCollection: IConditionDetails[] = [...additionalConditionDetails, ...conditionDetailsCollection];
      jest.spyOn(conditionDetailsService, 'addConditionDetailsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ conditions });
      comp.ngOnInit();

      expect(conditionDetailsService.query).toHaveBeenCalled();
      expect(conditionDetailsService.addConditionDetailsToCollectionIfMissing).toHaveBeenCalledWith(
        conditionDetailsCollection,
        ...additionalConditionDetails.map(expect.objectContaining)
      );
      expect(comp.conditionDetailsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const conditions: IConditions = { id: 456 };
      const conditionDetails: IConditionDetails = { id: 50307 };
      conditions.conditionDetails = [conditionDetails];

      activatedRoute.data = of({ conditions });
      comp.ngOnInit();

      expect(comp.conditionDetailsSharedCollection).toContain(conditionDetails);
      expect(comp.conditions).toEqual(conditions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditions>>();
      const conditions = { id: 123 };
      jest.spyOn(conditionsFormService, 'getConditions').mockReturnValue(conditions);
      jest.spyOn(conditionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conditions }));
      saveSubject.complete();

      // THEN
      expect(conditionsFormService.getConditions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(conditionsService.update).toHaveBeenCalledWith(expect.objectContaining(conditions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditions>>();
      const conditions = { id: 123 };
      jest.spyOn(conditionsFormService, 'getConditions').mockReturnValue({ id: null });
      jest.spyOn(conditionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conditions }));
      saveSubject.complete();

      // THEN
      expect(conditionsFormService.getConditions).toHaveBeenCalled();
      expect(conditionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConditions>>();
      const conditions = { id: 123 };
      jest.spyOn(conditionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conditions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conditionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareConditionDetails', () => {
      it('Should forward to conditionDetailsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(conditionDetailsService, 'compareConditionDetails');
        comp.compareConditionDetails(entity, entity2);
        expect(conditionDetailsService.compareConditionDetails).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
