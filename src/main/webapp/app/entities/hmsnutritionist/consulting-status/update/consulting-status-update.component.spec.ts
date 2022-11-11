import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConsultingStatusFormService } from './consulting-status-form.service';
import { ConsultingStatusService } from '../service/consulting-status.service';
import { IConsultingStatus } from '../consulting-status.model';

import { ConsultingStatusUpdateComponent } from './consulting-status-update.component';

describe('ConsultingStatus Management Update Component', () => {
  let comp: ConsultingStatusUpdateComponent;
  let fixture: ComponentFixture<ConsultingStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let consultingStatusFormService: ConsultingStatusFormService;
  let consultingStatusService: ConsultingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConsultingStatusUpdateComponent],
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
      .overrideTemplate(ConsultingStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsultingStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    consultingStatusFormService = TestBed.inject(ConsultingStatusFormService);
    consultingStatusService = TestBed.inject(ConsultingStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const consultingStatus: IConsultingStatus = { id: 456 };

      activatedRoute.data = of({ consultingStatus });
      comp.ngOnInit();

      expect(comp.consultingStatus).toEqual(consultingStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsultingStatus>>();
      const consultingStatus = { id: 123 };
      jest.spyOn(consultingStatusFormService, 'getConsultingStatus').mockReturnValue(consultingStatus);
      jest.spyOn(consultingStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consultingStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consultingStatus }));
      saveSubject.complete();

      // THEN
      expect(consultingStatusFormService.getConsultingStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(consultingStatusService.update).toHaveBeenCalledWith(expect.objectContaining(consultingStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsultingStatus>>();
      const consultingStatus = { id: 123 };
      jest.spyOn(consultingStatusFormService, 'getConsultingStatus').mockReturnValue({ id: null });
      jest.spyOn(consultingStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consultingStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: consultingStatus }));
      saveSubject.complete();

      // THEN
      expect(consultingStatusFormService.getConsultingStatus).toHaveBeenCalled();
      expect(consultingStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConsultingStatus>>();
      const consultingStatus = { id: 123 };
      jest.spyOn(consultingStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ consultingStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(consultingStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
