import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DeliveryOrdersFormService } from './delivery-orders-form.service';
import { DeliveryOrdersService } from '../service/delivery-orders.service';
import { IDeliveryOrders } from '../delivery-orders.model';
import { IDeliveryTransactions } from 'app/entities/hmsdelivery/delivery-transactions/delivery-transactions.model';
import { DeliveryTransactionsService } from 'app/entities/hmsdelivery/delivery-transactions/service/delivery-transactions.service';

import { DeliveryOrdersUpdateComponent } from './delivery-orders-update.component';

describe('DeliveryOrders Management Update Component', () => {
  let comp: DeliveryOrdersUpdateComponent;
  let fixture: ComponentFixture<DeliveryOrdersUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let deliveryOrdersFormService: DeliveryOrdersFormService;
  let deliveryOrdersService: DeliveryOrdersService;
  let deliveryTransactionsService: DeliveryTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DeliveryOrdersUpdateComponent],
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
      .overrideTemplate(DeliveryOrdersUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrdersUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    deliveryOrdersFormService = TestBed.inject(DeliveryOrdersFormService);
    deliveryOrdersService = TestBed.inject(DeliveryOrdersService);
    deliveryTransactionsService = TestBed.inject(DeliveryTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DeliveryTransactions query and add missing value', () => {
      const deliveryOrders: IDeliveryOrders = { id: 456 };
      const deliveryTransactions: IDeliveryTransactions[] = [{ id: 98897 }];
      deliveryOrders.deliveryTransactions = deliveryTransactions;

      const deliveryTransactionsCollection: IDeliveryTransactions[] = [{ id: 10328 }];
      jest.spyOn(deliveryTransactionsService, 'query').mockReturnValue(of(new HttpResponse({ body: deliveryTransactionsCollection })));
      const additionalDeliveryTransactions = [...deliveryTransactions];
      const expectedCollection: IDeliveryTransactions[] = [...additionalDeliveryTransactions, ...deliveryTransactionsCollection];
      jest.spyOn(deliveryTransactionsService, 'addDeliveryTransactionsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ deliveryOrders });
      comp.ngOnInit();

      expect(deliveryTransactionsService.query).toHaveBeenCalled();
      expect(deliveryTransactionsService.addDeliveryTransactionsToCollectionIfMissing).toHaveBeenCalledWith(
        deliveryTransactionsCollection,
        ...additionalDeliveryTransactions.map(expect.objectContaining)
      );
      expect(comp.deliveryTransactionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const deliveryOrders: IDeliveryOrders = { id: 456 };
      const deliveryTransactions: IDeliveryTransactions = { id: 66145 };
      deliveryOrders.deliveryTransactions = [deliveryTransactions];

      activatedRoute.data = of({ deliveryOrders });
      comp.ngOnInit();

      expect(comp.deliveryTransactionsSharedCollection).toContain(deliveryTransactions);
      expect(comp.deliveryOrders).toEqual(deliveryOrders);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryOrders>>();
      const deliveryOrders = { id: 123 };
      jest.spyOn(deliveryOrdersFormService, 'getDeliveryOrders').mockReturnValue(deliveryOrders);
      jest.spyOn(deliveryOrdersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryOrders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryOrders }));
      saveSubject.complete();

      // THEN
      expect(deliveryOrdersFormService.getDeliveryOrders).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(deliveryOrdersService.update).toHaveBeenCalledWith(expect.objectContaining(deliveryOrders));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryOrders>>();
      const deliveryOrders = { id: 123 };
      jest.spyOn(deliveryOrdersFormService, 'getDeliveryOrders').mockReturnValue({ id: null });
      jest.spyOn(deliveryOrdersService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryOrders: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryOrders }));
      saveSubject.complete();

      // THEN
      expect(deliveryOrdersFormService.getDeliveryOrders).toHaveBeenCalled();
      expect(deliveryOrdersService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryOrders>>();
      const deliveryOrders = { id: 123 };
      jest.spyOn(deliveryOrdersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryOrders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(deliveryOrdersService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDeliveryTransactions', () => {
      it('Should forward to deliveryTransactionsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(deliveryTransactionsService, 'compareDeliveryTransactions');
        comp.compareDeliveryTransactions(entity, entity2);
        expect(deliveryTransactionsService.compareDeliveryTransactions).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
