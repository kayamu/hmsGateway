import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ItemsFormService } from './items-form.service';
import { ItemsService } from '../service/items.service';
import { IItems } from '../items.model';
import { ITemplates } from 'app/entities/hmsfinance/templates/templates.model';
import { TemplatesService } from 'app/entities/hmsfinance/templates/service/templates.service';

import { ItemsUpdateComponent } from './items-update.component';

describe('Items Management Update Component', () => {
  let comp: ItemsUpdateComponent;
  let fixture: ComponentFixture<ItemsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemsFormService: ItemsFormService;
  let itemsService: ItemsService;
  let templatesService: TemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ItemsUpdateComponent],
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
      .overrideTemplate(ItemsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemsFormService = TestBed.inject(ItemsFormService);
    itemsService = TestBed.inject(ItemsService);
    templatesService = TestBed.inject(TemplatesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Templates query and add missing value', () => {
      const items: IItems = { id: 456 };
      const templates: ITemplates = { id: 62489 };
      items.templates = templates;

      const templatesCollection: ITemplates[] = [{ id: 94820 }];
      jest.spyOn(templatesService, 'query').mockReturnValue(of(new HttpResponse({ body: templatesCollection })));
      const additionalTemplates = [templates];
      const expectedCollection: ITemplates[] = [...additionalTemplates, ...templatesCollection];
      jest.spyOn(templatesService, 'addTemplatesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ items });
      comp.ngOnInit();

      expect(templatesService.query).toHaveBeenCalled();
      expect(templatesService.addTemplatesToCollectionIfMissing).toHaveBeenCalledWith(
        templatesCollection,
        ...additionalTemplates.map(expect.objectContaining)
      );
      expect(comp.templatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const items: IItems = { id: 456 };
      const templates: ITemplates = { id: 37146 };
      items.templates = templates;

      activatedRoute.data = of({ items });
      comp.ngOnInit();

      expect(comp.templatesSharedCollection).toContain(templates);
      expect(comp.items).toEqual(items);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItems>>();
      const items = { id: 123 };
      jest.spyOn(itemsFormService, 'getItems').mockReturnValue(items);
      jest.spyOn(itemsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ items });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: items }));
      saveSubject.complete();

      // THEN
      expect(itemsFormService.getItems).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemsService.update).toHaveBeenCalledWith(expect.objectContaining(items));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItems>>();
      const items = { id: 123 };
      jest.spyOn(itemsFormService, 'getItems').mockReturnValue({ id: null });
      jest.spyOn(itemsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ items: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: items }));
      saveSubject.complete();

      // THEN
      expect(itemsFormService.getItems).toHaveBeenCalled();
      expect(itemsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItems>>();
      const items = { id: 123 };
      jest.spyOn(itemsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ items });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTemplates', () => {
      it('Should forward to templatesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(templatesService, 'compareTemplates');
        comp.compareTemplates(entity, entity2);
        expect(templatesService.compareTemplates).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
