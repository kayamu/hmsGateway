import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TemplatesFormService } from './templates-form.service';
import { TemplatesService } from '../service/templates.service';
import { ITemplates } from '../templates.model';
import { ITemplateItems } from 'app/entities/hmsfinance/template-items/template-items.model';
import { TemplateItemsService } from 'app/entities/hmsfinance/template-items/service/template-items.service';

import { TemplatesUpdateComponent } from './templates-update.component';

describe('Templates Management Update Component', () => {
  let comp: TemplatesUpdateComponent;
  let fixture: ComponentFixture<TemplatesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let templatesFormService: TemplatesFormService;
  let templatesService: TemplatesService;
  let templateItemsService: TemplateItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TemplatesUpdateComponent],
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
      .overrideTemplate(TemplatesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TemplatesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    templatesFormService = TestBed.inject(TemplatesFormService);
    templatesService = TestBed.inject(TemplatesService);
    templateItemsService = TestBed.inject(TemplateItemsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TemplateItems query and add missing value', () => {
      const templates: ITemplates = { id: 456 };
      const templateItems: ITemplateItems[] = [{ id: 71787 }];
      templates.templateItems = templateItems;

      const templateItemsCollection: ITemplateItems[] = [{ id: 72187 }];
      jest.spyOn(templateItemsService, 'query').mockReturnValue(of(new HttpResponse({ body: templateItemsCollection })));
      const additionalTemplateItems = [...templateItems];
      const expectedCollection: ITemplateItems[] = [...additionalTemplateItems, ...templateItemsCollection];
      jest.spyOn(templateItemsService, 'addTemplateItemsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ templates });
      comp.ngOnInit();

      expect(templateItemsService.query).toHaveBeenCalled();
      expect(templateItemsService.addTemplateItemsToCollectionIfMissing).toHaveBeenCalledWith(
        templateItemsCollection,
        ...additionalTemplateItems.map(expect.objectContaining)
      );
      expect(comp.templateItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const templates: ITemplates = { id: 456 };
      const templateItems: ITemplateItems = { id: 42809 };
      templates.templateItems = [templateItems];

      activatedRoute.data = of({ templates });
      comp.ngOnInit();

      expect(comp.templateItemsSharedCollection).toContain(templateItems);
      expect(comp.templates).toEqual(templates);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplates>>();
      const templates = { id: 123 };
      jest.spyOn(templatesFormService, 'getTemplates').mockReturnValue(templates);
      jest.spyOn(templatesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templates });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templates }));
      saveSubject.complete();

      // THEN
      expect(templatesFormService.getTemplates).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(templatesService.update).toHaveBeenCalledWith(expect.objectContaining(templates));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplates>>();
      const templates = { id: 123 };
      jest.spyOn(templatesFormService, 'getTemplates').mockReturnValue({ id: null });
      jest.spyOn(templatesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templates: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: templates }));
      saveSubject.complete();

      // THEN
      expect(templatesFormService.getTemplates).toHaveBeenCalled();
      expect(templatesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITemplates>>();
      const templates = { id: 123 };
      jest.spyOn(templatesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ templates });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(templatesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTemplateItems', () => {
      it('Should forward to templateItemsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(templateItemsService, 'compareTemplateItems');
        comp.compareTemplateItems(entity, entity2);
        expect(templateItemsService.compareTemplateItems).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
