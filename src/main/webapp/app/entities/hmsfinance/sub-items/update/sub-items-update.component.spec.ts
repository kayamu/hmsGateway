import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SubItemsFormService } from './sub-items-form.service';
import { SubItemsService } from '../service/sub-items.service';
import { ISubItems } from '../sub-items.model';

import { SubItemsUpdateComponent } from './sub-items-update.component';

describe('SubItems Management Update Component', () => {
  let comp: SubItemsUpdateComponent;
  let fixture: ComponentFixture<SubItemsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let subItemsFormService: SubItemsFormService;
  let subItemsService: SubItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SubItemsUpdateComponent],
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
      .overrideTemplate(SubItemsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubItemsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    subItemsFormService = TestBed.inject(SubItemsFormService);
    subItemsService = TestBed.inject(SubItemsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const subItems: ISubItems = { id: 456 };

      activatedRoute.data = of({ subItems });
      comp.ngOnInit();

      expect(comp.subItems).toEqual(subItems);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubItems>>();
      const subItems = { id: 123 };
      jest.spyOn(subItemsFormService, 'getSubItems').mockReturnValue(subItems);
      jest.spyOn(subItemsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subItems });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subItems }));
      saveSubject.complete();

      // THEN
      expect(subItemsFormService.getSubItems).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(subItemsService.update).toHaveBeenCalledWith(expect.objectContaining(subItems));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubItems>>();
      const subItems = { id: 123 };
      jest.spyOn(subItemsFormService, 'getSubItems').mockReturnValue({ id: null });
      jest.spyOn(subItemsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subItems: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subItems }));
      saveSubject.complete();

      // THEN
      expect(subItemsFormService.getSubItems).toHaveBeenCalled();
      expect(subItemsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubItems>>();
      const subItems = { id: 123 };
      jest.spyOn(subItemsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subItems });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(subItemsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
