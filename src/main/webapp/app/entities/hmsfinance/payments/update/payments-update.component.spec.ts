import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PaymentsFormService } from './payments-form.service';
import { PaymentsService } from '../service/payments.service';
import { IPayments } from '../payments.model';
import { IInvoices } from 'app/entities/hmsfinance/invoices/invoices.model';
import { InvoicesService } from 'app/entities/hmsfinance/invoices/service/invoices.service';

import { PaymentsUpdateComponent } from './payments-update.component';

describe('Payments Management Update Component', () => {
  let comp: PaymentsUpdateComponent;
  let fixture: ComponentFixture<PaymentsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentsFormService: PaymentsFormService;
  let paymentsService: PaymentsService;
  let invoicesService: InvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentsUpdateComponent],
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
      .overrideTemplate(PaymentsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentsFormService = TestBed.inject(PaymentsFormService);
    paymentsService = TestBed.inject(PaymentsService);
    invoicesService = TestBed.inject(InvoicesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Invoices query and add missing value', () => {
      const payments: IPayments = { id: 456 };
      const invoices: IInvoices = { id: 66923 };
      payments.invoices = invoices;

      const invoicesCollection: IInvoices[] = [{ id: 17477 }];
      jest.spyOn(invoicesService, 'query').mockReturnValue(of(new HttpResponse({ body: invoicesCollection })));
      const additionalInvoices = [invoices];
      const expectedCollection: IInvoices[] = [...additionalInvoices, ...invoicesCollection];
      jest.spyOn(invoicesService, 'addInvoicesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ payments });
      comp.ngOnInit();

      expect(invoicesService.query).toHaveBeenCalled();
      expect(invoicesService.addInvoicesToCollectionIfMissing).toHaveBeenCalledWith(
        invoicesCollection,
        ...additionalInvoices.map(expect.objectContaining)
      );
      expect(comp.invoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const payments: IPayments = { id: 456 };
      const invoices: IInvoices = { id: 23838 };
      payments.invoices = invoices;

      activatedRoute.data = of({ payments });
      comp.ngOnInit();

      expect(comp.invoicesSharedCollection).toContain(invoices);
      expect(comp.payments).toEqual(payments);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPayments>>();
      const payments = { id: 123 };
      jest.spyOn(paymentsFormService, 'getPayments').mockReturnValue(payments);
      jest.spyOn(paymentsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payments });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: payments }));
      saveSubject.complete();

      // THEN
      expect(paymentsFormService.getPayments).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentsService.update).toHaveBeenCalledWith(expect.objectContaining(payments));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPayments>>();
      const payments = { id: 123 };
      jest.spyOn(paymentsFormService, 'getPayments').mockReturnValue({ id: null });
      jest.spyOn(paymentsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payments: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: payments }));
      saveSubject.complete();

      // THEN
      expect(paymentsFormService.getPayments).toHaveBeenCalled();
      expect(paymentsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPayments>>();
      const payments = { id: 123 };
      jest.spyOn(paymentsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payments });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInvoices', () => {
      it('Should forward to invoicesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(invoicesService, 'compareInvoices');
        comp.compareInvoices(entity, entity2);
        expect(invoicesService.compareInvoices).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
