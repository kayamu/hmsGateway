import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TemplateItemsFormService } from './template-items-form.service';
import { TemplateItemsService } from '../service/template-items.service';
import { ITemplateItems } from '../template-items.model';
import { IConditions } from 'app/entities/hmsfinance/conditions/conditions.model';
import { ConditionsService } from 'app/entities/hmsfinance/conditions/service/conditions.service';

import { TemplateItemsUpdateComponent } from './template-items-update.component';

describe('TemplateItems Management Update Component', () => {
  let comp: TemplateItemsUpdateComponent;
  let fixture: ComponentFixture<TemplateItemsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let templateItemsFormService: TemplateItemsFormService;
  let templateItemsService: TemplateItemsService;
  let conditionsService: ConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TemplateItemsUpdateComponent],
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
      .overrideTemplate(TemplateItemsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TemplateItemsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    templateItemsFormService = TestBed.inject(TemplateItemsFormService);
    templateItemsService = TestBed.inject(TemplateItemsService);
    conditionsService = TestBed.inject(ConditionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Conditions query and add missing value', () => {
      const templateItems: ITemplateItems = { id: 456 };
      const conditions: IConditions = { id: 17285 };
      templateItems.conditions = conditions;

      const conditionsCollection: IConditions[] = [{ id: 4579 }];
      jest.spyOn(conditionsService, 'query').mockReturnValue(of(new HttpResponse({ body: conditionsCollection })));
      const additionalConditions = [conditions];
      const expectedCollection: IConditions[] = [...additionalConditions, ...conditionsCollection];
      jest.spyOn(conditionsService, 'addConditionsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ templateItems });
      comp.ngOnInit();

      expect(conditionsService.query).toHaveBeenCalled();
      expect(conditionsService.addConditionsToCollectionIfMissing).toHaveBeenCalledWith(
        conditionsCollection,
        ...additionalConditions.map(expect.objectContaining)
      );
      expect(comp.conditionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const templateItems: ITemplateItems = { id: 456 };
      const conditions: IConditions = { id: 30193 };
      templateItems.conditions = conditions;

      activatedRoute.data = of({ templateItems });
      comp.ngOnInit();

      expect(comp.conditionsSharedCollection).toContain(conditions);
      expect(comp.templateItems).toEqual(templateItems);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateItems>>();
      const templateItems = { id: 123 };
      jest.spyOn(templateItemsFormService, 'getTemplateItems').mockReturnValue(templateItems);
      jest.spyOn(templateItemsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateItems });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templateItems }));
      saveSubject.complete();

      // THEN
      expect(templateItemsFormService.getTemplateItems).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(templateItemsService.update).toHaveBeenCalledWith(expect.objectContaining(templateItems));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateItems>>();
      const templateItems = { id: 123 };
      jest.spyOn(templateItemsFormService, 'getTemplateItems').mockReturnValue({ id: null });
      jest.spyOn(templateItemsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateItems: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templateItems }));
      saveSubject.complete();

      // THEN
      expect(templateItemsFormService.getTemplateItems).toHaveBeenCalled();
      expect(templateItemsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplateItems>>();
      const templateItems = { id: 123 };
      jest.spyOn(templateItemsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templateItems });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(templateItemsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareConditions', () => {
      it('Should forward to conditionsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(conditionsService, 'compareConditions');
        comp.compareConditions(entity, entity2);
        expect(conditionsService.compareConditions).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
