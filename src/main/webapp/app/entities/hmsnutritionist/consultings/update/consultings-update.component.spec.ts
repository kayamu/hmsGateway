import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConsultingsFormService } from './consultings-form.service';
import { ConsultingsService } from '../service/consultings.service';
import { IConsultings } from '../consultings.model';
import { IEpicrysis } from 'app/entities/hmsnutritionist/epicrysis/epicrysis.model';
import { EpicrysisService } from 'app/entities/hmsnutritionist/epicrysis/service/epicrysis.service';
import { IMenuSuggestions } from 'app/entities/hmsnutritionist/menu-suggestions/menu-suggestions.model';
import { MenuSuggestionsService } from 'app/entities/hmsnutritionist/menu-suggestions/service/menu-suggestions.service';
import { IConsultingStatus } from 'app/entities/hmsnutritionist/consulting-status/consulting-status.model';
import { ConsultingStatusService } from 'app/entities/hmsnutritionist/consulting-status/service/consulting-status.service';

import { ConsultingsUpdateComponent } from './consultings-update.component';

describe('Consultings Management Update Component', () => {
  let comp: ConsultingsUpdateComponent;
  let fixture: ComponentFixture<ConsultingsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consultingsFormService: ConsultingsFormService;
  let consultingsService: ConsultingsService;
  let epicrysisService: EpicrysisService;
  let menuSuggestionsService: MenuSuggestionsService;
  let consultingStatusService: ConsultingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConsultingsUpdateComponent],
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
      .overrideTemplate(ConsultingsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsultingsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consultingsFormService = TestBed.inject(ConsultingsFormService);
    consultingsService = TestBed.inject(ConsultingsService);
    epicrysisService = TestBed.inject(EpicrysisService);
    menuSuggestionsService = TestBed.inject(MenuSuggestionsService);
    consultingStatusService = TestBed.inject(ConsultingStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Epicrysis query and add missing value', () => {
      const consultings: IConsultings = { id: 456 };
      const epicryses: IEpicrysis[] = [{ id: 33645 }];
      consultings.epicryses = epicryses;

      const epicrysisCollection: IEpicrysis[] = [{ id: 43788 }];
      jest.spyOn(epicrysisService, 'query').mockReturnValue(of(new HttpResponse({ body: epicrysisCollection })));
      const additionalEpicryses = [...epicryses];
      const expectedCollection: IEpicrysis[] = [...additionalEpicryses, ...epicrysisCollection];
      jest.spyOn(epicrysisService, 'addEpicrysisToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consultings });
      comp.ngOnInit();

      expect(epicrysisService.query).toHaveBeenCalled();
      expect(epicrysisService.addEpicrysisToCollectionIfMissing).toHaveBeenCalledWith(
        epicrysisCollection,
        ...additionalEpicryses.map(expect.objectContaining)
      );
      expect(comp.epicrysesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call MenuSuggestions query and add missing value', () => {
      const consultings: IConsultings = { id: 456 };
      const menuSuggestions: IMenuSuggestions[] = [{ id: 74043 }];
      consultings.menuSuggestions = menuSuggestions;

      const menuSuggestionsCollection: IMenuSuggestions[] = [{ id: 23924 }];
      jest.spyOn(menuSuggestionsService, 'query').mockReturnValue(of(new HttpResponse({ body: menuSuggestionsCollection })));
      const additionalMenuSuggestions = [...menuSuggestions];
      const expectedCollection: IMenuSuggestions[] = [...additionalMenuSuggestions, ...menuSuggestionsCollection];
      jest.spyOn(menuSuggestionsService, 'addMenuSuggestionsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consultings });
      comp.ngOnInit();

      expect(menuSuggestionsService.query).toHaveBeenCalled();
      expect(menuSuggestionsService.addMenuSuggestionsToCollectionIfMissing).toHaveBeenCalledWith(
        menuSuggestionsCollection,
        ...additionalMenuSuggestions.map(expect.objectContaining)
      );
      expect(comp.menuSuggestionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ConsultingStatus query and add missing value', () => {
      const consultings: IConsultings = { id: 456 };
      const consultingStatus: IConsultingStatus = { id: 47881 };
      consultings.consultingStatus = consultingStatus;

      const consultingStatusCollection: IConsultingStatus[] = [{ id: 10303 }];
      jest.spyOn(consultingStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: consultingStatusCollection })));
      const additionalConsultingStatuses = [consultingStatus];
      const expectedCollection: IConsultingStatus[] = [...additionalConsultingStatuses, ...consultingStatusCollection];
      jest.spyOn(consultingStatusService, 'addConsultingStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ consultings });
      comp.ngOnInit();

      expect(consultingStatusService.query).toHaveBeenCalled();
      expect(consultingStatusService.addConsultingStatusToCollectionIfMissing).toHaveBeenCalledWith(
        consultingStatusCollection,
        ...additionalConsultingStatuses.map(expect.objectContaining)
      );
      expect(comp.consultingStatusesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const consultings: IConsultings = { id: 456 };
      const epicrysis: IEpicrysis = { id: 22072 };
      consultings.epicryses = [epicrysis];
      const menuSuggestions: IMenuSuggestions = { id: 12530 };
      consultings.menuSuggestions = [menuSuggestions];
      const consultingStatus: IConsultingStatus = { id: 49194 };
      consultings.consultingStatus = consultingStatus;

      activatedRoute.data = of({ consultings });
      comp.ngOnInit();

      expect(comp.epicrysesSharedCollection).toContain(epicrysis);
      expect(comp.menuSuggestionsSharedCollection).toContain(menuSuggestions);
      expect(comp.consultingStatusesSharedCollection).toContain(consultingStatus);
      expect(comp.consultings).toEqual(consultings);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsultings>>();
      const consultings = { id: 123 };
      jest.spyOn(consultingsFormService, 'getConsultings').mockReturnValue(consultings);
      jest.spyOn(consultingsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consultings });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consultings }));
      saveSubject.complete();

      // THEN
      expect(consultingsFormService.getConsultings).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(consultingsService.update).toHaveBeenCalledWith(expect.objectContaining(consultings));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsultings>>();
      const consultings = { id: 123 };
      jest.spyOn(consultingsFormService, 'getConsultings').mockReturnValue({ id: null });
      jest.spyOn(consultingsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consultings: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consultings }));
      saveSubject.complete();

      // THEN
      expect(consultingsFormService.getConsultings).toHaveBeenCalled();
      expect(consultingsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsultings>>();
      const consultings = { id: 123 };
      jest.spyOn(consultingsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consultings });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(consultingsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEpicrysis', () => {
      it('Should forward to epicrysisService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(epicrysisService, 'compareEpicrysis');
        comp.compareEpicrysis(entity, entity2);
        expect(epicrysisService.compareEpicrysis).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMenuSuggestions', () => {
      it('Should forward to menuSuggestionsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(menuSuggestionsService, 'compareMenuSuggestions');
        comp.compareMenuSuggestions(entity, entity2);
        expect(menuSuggestionsService.compareMenuSuggestions).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareConsultingStatus', () => {
      it('Should forward to consultingStatusService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(consultingStatusService, 'compareConsultingStatus');
        comp.compareConsultingStatus(entity, entity2);
        expect(consultingStatusService.compareConsultingStatus).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
