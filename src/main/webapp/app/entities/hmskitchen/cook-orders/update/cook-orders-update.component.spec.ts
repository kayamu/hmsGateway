import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CookOrdersFormService } from './cook-orders-form.service';
import { CookOrdersService } from '../service/cook-orders.service';
import { ICookOrders } from '../cook-orders.model';
import { ICookTransactions } from 'app/entities/hmskitchen/cook-transactions/cook-transactions.model';
import { CookTransactionsService } from 'app/entities/hmskitchen/cook-transactions/service/cook-transactions.service';

import { CookOrdersUpdateComponent } from './cook-orders-update.component';

describe('CookOrders Management Update Component', () => {
  let comp: CookOrdersUpdateComponent;
  let fixture: ComponentFixture<CookOrdersUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cookOrdersFormService: CookOrdersFormService;
  let cookOrdersService: CookOrdersService;
  let cookTransactionsService: CookTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CookOrdersUpdateComponent],
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
      .overrideTemplate(CookOrdersUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CookOrdersUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cookOrdersFormService = TestBed.inject(CookOrdersFormService);
    cookOrdersService = TestBed.inject(CookOrdersService);
    cookTransactionsService = TestBed.inject(CookTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CookTransactions query and add missing value', () => {
      const cookOrders: ICookOrders = { id: 456 };
      const cookTransactions: ICookTransactions[] = [{ id: 38280 }];
      cookOrders.cookTransactions = cookTransactions;

      const cookTransactionsCollection: ICookTransactions[] = [{ id: 76526 }];
      jest.spyOn(cookTransactionsService, 'query').mockReturnValue(of(new HttpResponse({ body: cookTransactionsCollection })));
      const additionalCookTransactions = [...cookTransactions];
      const expectedCollection: ICookTransactions[] = [...additionalCookTransactions, ...cookTransactionsCollection];
      jest.spyOn(cookTransactionsService, 'addCookTransactionsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cookOrders });
      comp.ngOnInit();

      expect(cookTransactionsService.query).toHaveBeenCalled();
      expect(cookTransactionsService.addCookTransactionsToCollectionIfMissing).toHaveBeenCalledWith(
        cookTransactionsCollection,
        ...additionalCookTransactions.map(expect.objectContaining)
      );
      expect(comp.cookTransactionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cookOrders: ICookOrders = { id: 456 };
      const cookTransactions: ICookTransactions = { id: 37581 };
      cookOrders.cookTransactions = [cookTransactions];

      activatedRoute.data = of({ cookOrders });
      comp.ngOnInit();

      expect(comp.cookTransactionsSharedCollection).toContain(cookTransactions);
      expect(comp.cookOrders).toEqual(cookOrders);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICookOrders>>();
      const cookOrders = { id: 123 };
      jest.spyOn(cookOrdersFormService, 'getCookOrders').mockReturnValue(cookOrders);
      jest.spyOn(cookOrdersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cookOrders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cookOrders }));
      saveSubject.complete();

      // THEN
      expect(cookOrdersFormService.getCookOrders).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cookOrdersService.update).toHaveBeenCalledWith(expect.objectContaining(cookOrders));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICookOrders>>();
      const cookOrders = { id: 123 };
      jest.spyOn(cookOrdersFormService, 'getCookOrders').mockReturnValue({ id: null });
      jest.spyOn(cookOrdersService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cookOrders: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cookOrders }));
      saveSubject.complete();

      // THEN
      expect(cookOrdersFormService.getCookOrders).toHaveBeenCalled();
      expect(cookOrdersService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICookOrders>>();
      const cookOrders = { id: 123 };
      jest.spyOn(cookOrdersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cookOrders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cookOrdersService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCookTransactions', () => {
      it('Should forward to cookTransactionsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cookTransactionsService, 'compareCookTransactions');
        comp.compareCookTransactions(entity, entity2);
        expect(cookTransactionsService.compareCookTransactions).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
