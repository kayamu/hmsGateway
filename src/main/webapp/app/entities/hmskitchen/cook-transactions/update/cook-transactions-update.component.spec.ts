import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CookTransactionsFormService } from './cook-transactions-form.service';
import { CookTransactionsService } from '../service/cook-transactions.service';
import { ICookTransactions } from '../cook-transactions.model';

import { CookTransactionsUpdateComponent } from './cook-transactions-update.component';

describe('CookTransactions Management Update Component', () => {
  let comp: CookTransactionsUpdateComponent;
  let fixture: ComponentFixture<CookTransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cookTransactionsFormService: CookTransactionsFormService;
  let cookTransactionsService: CookTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CookTransactionsUpdateComponent],
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
      .overrideTemplate(CookTransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CookTransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cookTransactionsFormService = TestBed.inject(CookTransactionsFormService);
    cookTransactionsService = TestBed.inject(CookTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cookTransactions: ICookTransactions = { id: 456 };

      activatedRoute.data = of({ cookTransactions });
      comp.ngOnInit();

      expect(comp.cookTransactions).toEqual(cookTransactions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICookTransactions>>();
      const cookTransactions = { id: 123 };
      jest.spyOn(cookTransactionsFormService, 'getCookTransactions').mockReturnValue(cookTransactions);
      jest.spyOn(cookTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cookTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cookTransactions }));
      saveSubject.complete();

      // THEN
      expect(cookTransactionsFormService.getCookTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cookTransactionsService.update).toHaveBeenCalledWith(expect.objectContaining(cookTransactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICookTransactions>>();
      const cookTransactions = { id: 123 };
      jest.spyOn(cookTransactionsFormService, 'getCookTransactions').mockReturnValue({ id: null });
      jest.spyOn(cookTransactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cookTransactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cookTransactions }));
      saveSubject.complete();

      // THEN
      expect(cookTransactionsFormService.getCookTransactions).toHaveBeenCalled();
      expect(cookTransactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICookTransactions>>();
      const cookTransactions = { id: 123 };
      jest.spyOn(cookTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cookTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cookTransactionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
