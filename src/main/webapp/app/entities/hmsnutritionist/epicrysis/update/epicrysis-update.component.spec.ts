import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EpicrysisFormService } from './epicrysis-form.service';
import { EpicrysisService } from '../service/epicrysis.service';
import { IEpicrysis } from '../epicrysis.model';

import { EpicrysisUpdateComponent } from './epicrysis-update.component';

describe('Epicrysis Management Update Component', () => {
  let comp: EpicrysisUpdateComponent;
  let fixture: ComponentFixture<EpicrysisUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let epicrysisFormService: EpicrysisFormService;
  let epicrysisService: EpicrysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EpicrysisUpdateComponent],
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
      .overrideTemplate(EpicrysisUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EpicrysisUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    epicrysisFormService = TestBed.inject(EpicrysisFormService);
    epicrysisService = TestBed.inject(EpicrysisService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const epicrysis: IEpicrysis = { id: 456 };

      activatedRoute.data = of({ epicrysis });
      comp.ngOnInit();

      expect(comp.epicrysis).toEqual(epicrysis);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEpicrysis>>();
      const epicrysis = { id: 123 };
      jest.spyOn(epicrysisFormService, 'getEpicrysis').mockReturnValue(epicrysis);
      jest.spyOn(epicrysisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ epicrysis });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: epicrysis }));
      saveSubject.complete();

      // THEN
      expect(epicrysisFormService.getEpicrysis).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(epicrysisService.update).toHaveBeenCalledWith(expect.objectContaining(epicrysis));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEpicrysis>>();
      const epicrysis = { id: 123 };
      jest.spyOn(epicrysisFormService, 'getEpicrysis').mockReturnValue({ id: null });
      jest.spyOn(epicrysisService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ epicrysis: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: epicrysis }));
      saveSubject.complete();

      // THEN
      expect(epicrysisFormService.getEpicrysis).toHaveBeenCalled();
      expect(epicrysisService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEpicrysis>>();
      const epicrysis = { id: 123 };
      jest.spyOn(epicrysisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ epicrysis });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(epicrysisService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
