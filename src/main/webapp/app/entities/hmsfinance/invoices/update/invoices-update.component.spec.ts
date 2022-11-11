import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InvoicesFormService } from './invoices-form.service';
import { InvoicesService } from '../service/invoices.service';
import { IInvoices } from '../invoices.model';
import { IInvoiceDetails } from 'app/entities/hmsfinance/invoice-details/invoice-details.model';
import { InvoiceDetailsService } from 'app/entities/hmsfinance/invoice-details/service/invoice-details.service';

import { InvoicesUpdateComponent } from './invoices-update.component';

describe('Invoices Management Update Component', () => {
  let comp: InvoicesUpdateComponent;
  let fixture: ComponentFixture<InvoicesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let invoicesFormService: InvoicesFormService;
  let invoicesService: InvoicesService;
  let invoiceDetailsService: InvoiceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InvoicesUpdateComponent],
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
      .overrideTemplate(InvoicesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InvoicesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    invoicesFormService = TestBed.inject(InvoicesFormService);
    invoicesService = TestBed.inject(InvoicesService);
    invoiceDetailsService = TestBed.inject(InvoiceDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InvoiceDetails query and add missing value', () => {
      const invoices: IInvoices = { id: 456 };
      const invoiceDetails: IInvoiceDetails[] = [{ id: 81023 }];
      invoices.invoiceDetails = invoiceDetails;

      const invoiceDetailsCollection: IInvoiceDetails[] = [{ id: 42610 }];
      jest.spyOn(invoiceDetailsService, 'query').mockReturnValue(of(new HttpResponse({ body: invoiceDetailsCollection })));
      const additionalInvoiceDetails = [...invoiceDetails];
      const expectedCollection: IInvoiceDetails[] = [...additionalInvoiceDetails, ...invoiceDetailsCollection];
      jest.spyOn(invoiceDetailsService, 'addInvoiceDetailsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ invoices });
      comp.ngOnInit();

      expect(invoiceDetailsService.query).toHaveBeenCalled();
      expect(invoiceDetailsService.addInvoiceDetailsToCollectionIfMissing).toHaveBeenCalledWith(
        invoiceDetailsCollection,
        ...additionalInvoiceDetails.map(expect.objectContaining)
      );
      expect(comp.invoiceDetailsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const invoices: IInvoices = { id: 456 };
      const invoiceDetails: IInvoiceDetails = { id: 43054 };
      invoices.invoiceDetails = [invoiceDetails];

      activatedRoute.data = of({ invoices });
      comp.ngOnInit();

      expect(comp.invoiceDetailsSharedCollection).toContain(invoiceDetails);
      expect(comp.invoices).toEqual(invoices);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoices>>();
      const invoices = { id: 123 };
      jest.spyOn(invoicesFormService, 'getInvoices').mockReturnValue(invoices);
      jest.spyOn(invoicesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoices });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: invoices }));
      saveSubject.complete();

      // THEN
      expect(invoicesFormService.getInvoices).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(invoicesService.update).toHaveBeenCalledWith(expect.objectContaining(invoices));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoices>>();
      const invoices = { id: 123 };
      jest.spyOn(invoicesFormService, 'getInvoices').mockReturnValue({ id: null });
      jest.spyOn(invoicesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoices: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: invoices }));
      saveSubject.complete();

      // THEN
      expect(invoicesFormService.getInvoices).toHaveBeenCalled();
      expect(invoicesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoices>>();
      const invoices = { id: 123 };
      jest.spyOn(invoicesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoices });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(invoicesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInvoiceDetails', () => {
      it('Should forward to invoiceDetailsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(invoiceDetailsService, 'compareInvoiceDetails');
        comp.compareInvoiceDetails(entity, entity2);
        expect(invoiceDetailsService.compareInvoiceDetails).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
