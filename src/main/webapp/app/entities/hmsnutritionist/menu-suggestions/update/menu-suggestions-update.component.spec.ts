import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MenuSuggestionsFormService } from './menu-suggestions-form.service';
import { MenuSuggestionsService } from '../service/menu-suggestions.service';
import { IMenuSuggestions } from '../menu-suggestions.model';

import { MenuSuggestionsUpdateComponent } from './menu-suggestions-update.component';

describe('MenuSuggestions Management Update Component', () => {
  let comp: MenuSuggestionsUpdateComponent;
  let fixture: ComponentFixture<MenuSuggestionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let menuSuggestionsFormService: MenuSuggestionsFormService;
  let menuSuggestionsService: MenuSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MenuSuggestionsUpdateComponent],
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
      .overrideTemplate(MenuSuggestionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MenuSuggestionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    menuSuggestionsFormService = TestBed.inject(MenuSuggestionsFormService);
    menuSuggestionsService = TestBed.inject(MenuSuggestionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const menuSuggestions: IMenuSuggestions = { id: 456 };

      activatedRoute.data = of({ menuSuggestions });
      comp.ngOnInit();

      expect(comp.menuSuggestions).toEqual(menuSuggestions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuSuggestions>>();
      const menuSuggestions = { id: 123 };
      jest.spyOn(menuSuggestionsFormService, 'getMenuSuggestions').mockReturnValue(menuSuggestions);
      jest.spyOn(menuSuggestionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuSuggestions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menuSuggestions }));
      saveSubject.complete();

      // THEN
      expect(menuSuggestionsFormService.getMenuSuggestions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(menuSuggestionsService.update).toHaveBeenCalledWith(expect.objectContaining(menuSuggestions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuSuggestions>>();
      const menuSuggestions = { id: 123 };
      jest.spyOn(menuSuggestionsFormService, 'getMenuSuggestions').mockReturnValue({ id: null });
      jest.spyOn(menuSuggestionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuSuggestions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menuSuggestions }));
      saveSubject.complete();

      // THEN
      expect(menuSuggestionsFormService.getMenuSuggestions).toHaveBeenCalled();
      expect(menuSuggestionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenuSuggestions>>();
      const menuSuggestions = { id: 123 };
      jest.spyOn(menuSuggestionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menuSuggestions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(menuSuggestionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
