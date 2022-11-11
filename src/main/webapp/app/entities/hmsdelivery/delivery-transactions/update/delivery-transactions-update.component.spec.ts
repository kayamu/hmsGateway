import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DeliveryTransactionsFormService } from './delivery-transactions-form.service';
import { DeliveryTransactionsService } from '../service/delivery-transactions.service';
import { IDeliveryTransactions } from '../delivery-transactions.model';

import { DeliveryTransactionsUpdateComponent } from './delivery-transactions-update.component';

describe('DeliveryTransactions Management Update Component', () => {
  let comp: DeliveryTransactionsUpdateComponent;
  let fixture: ComponentFixture<DeliveryTransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let deliveryTransactionsFormService: DeliveryTransactionsFormService;
  let deliveryTransactionsService: DeliveryTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DeliveryTransactionsUpdateComponent],
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
      .overrideTemplate(DeliveryTransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryTransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    deliveryTransactionsFormService = TestBed.inject(DeliveryTransactionsFormService);
    deliveryTransactionsService = TestBed.inject(DeliveryTransactionsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const deliveryTransactions: IDeliveryTransactions = { id: 456 };

      activatedRoute.data = of({ deliveryTransactions });
      comp.ngOnInit();

      expect(comp.deliveryTransactions).toEqual(deliveryTransactions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryTransactions>>();
      const deliveryTransactions = { id: 123 };
      jest.spyOn(deliveryTransactionsFormService, 'getDeliveryTransactions').mockReturnValue(deliveryTransactions);
      jest.spyOn(deliveryTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryTransactions }));
      saveSubject.complete();

      // THEN
      expect(deliveryTransactionsFormService.getDeliveryTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(deliveryTransactionsService.update).toHaveBeenCalledWith(expect.objectContaining(deliveryTransactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryTransactions>>();
      const deliveryTransactions = { id: 123 };
      jest.spyOn(deliveryTransactionsFormService, 'getDeliveryTransactions').mockReturnValue({ id: null });
      jest.spyOn(deliveryTransactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryTransactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryTransactions }));
      saveSubject.complete();

      // THEN
      expect(deliveryTransactionsFormService.getDeliveryTransactions).toHaveBeenCalled();
      expect(deliveryTransactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryTransactions>>();
      const deliveryTransactions = { id: 123 };
      jest.spyOn(deliveryTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(deliveryTransactionsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
