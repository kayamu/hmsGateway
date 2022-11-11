import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InvoiceTransactionsFormService } from './invoice-transactions-form.service';
import { InvoiceTransactionsService } from '../service/invoice-transactions.service';
import { IInvoiceTransactions } from '../invoice-transactions.model';
import { IInvoices } from 'app/entities/hmsfinance/invoices/invoices.model';
import { InvoicesService } from 'app/entities/hmsfinance/invoices/service/invoices.service';

import { InvoiceTransactionsUpdateComponent } from './invoice-transactions-update.component';

describe('InvoiceTransactions Management Update Component', () => {
  let comp: InvoiceTransactionsUpdateComponent;
  let fixture: ComponentFixture<InvoiceTransactionsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let invoiceTransactionsFormService: InvoiceTransactionsFormService;
  let invoiceTransactionsService: InvoiceTransactionsService;
  let invoicesService: InvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InvoiceTransactionsUpdateComponent],
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
      .overrideTemplate(InvoiceTransactionsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InvoiceTransactionsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    invoiceTransactionsFormService = TestBed.inject(InvoiceTransactionsFormService);
    invoiceTransactionsService = TestBed.inject(InvoiceTransactionsService);
    invoicesService = TestBed.inject(InvoicesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Invoices query and add missing value', () => {
      const invoiceTransactions: IInvoiceTransactions = { id: 456 };
      const invoices: IInvoices = { id: 32482 };
      invoiceTransactions.invoices = invoices;

      const invoicesCollection: IInvoices[] = [{ id: 14150 }];
      jest.spyOn(invoicesService, 'query').mockReturnValue(of(new HttpResponse({ body: invoicesCollection })));
      const additionalInvoices = [invoices];
      const expectedCollection: IInvoices[] = [...additionalInvoices, ...invoicesCollection];
      jest.spyOn(invoicesService, 'addInvoicesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ invoiceTransactions });
      comp.ngOnInit();

      expect(invoicesService.query).toHaveBeenCalled();
      expect(invoicesService.addInvoicesToCollectionIfMissing).toHaveBeenCalledWith(
        invoicesCollection,
        ...additionalInvoices.map(expect.objectContaining)
      );
      expect(comp.invoicesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const invoiceTransactions: IInvoiceTransactions = { id: 456 };
      const invoices: IInvoices = { id: 58252 };
      invoiceTransactions.invoices = invoices;

      activatedRoute.data = of({ invoiceTransactions });
      comp.ngOnInit();

      expect(comp.invoicesSharedCollection).toContain(invoices);
      expect(comp.invoiceTransactions).toEqual(invoiceTransactions);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoiceTransactions>>();
      const invoiceTransactions = { id: 123 };
      jest.spyOn(invoiceTransactionsFormService, 'getInvoiceTransactions').mockReturnValue(invoiceTransactions);
      jest.spyOn(invoiceTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoiceTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: invoiceTransactions }));
      saveSubject.complete();

      // THEN
      expect(invoiceTransactionsFormService.getInvoiceTransactions).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(invoiceTransactionsService.update).toHaveBeenCalledWith(expect.objectContaining(invoiceTransactions));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoiceTransactions>>();
      const invoiceTransactions = { id: 123 };
      jest.spyOn(invoiceTransactionsFormService, 'getInvoiceTransactions').mockReturnValue({ id: null });
      jest.spyOn(invoiceTransactionsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoiceTransactions: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: invoiceTransactions }));
      saveSubject.complete();

      // THEN
      expect(invoiceTransactionsFormService.getInvoiceTransactions).toHaveBeenCalled();
      expect(invoiceTransactionsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoiceTransactions>>();
      const invoiceTransactions = { id: 123 };
      jest.spyOn(invoiceTransactionsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoiceTransactions });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(invoiceTransactionsService.update).toHaveBeenCalled();
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
