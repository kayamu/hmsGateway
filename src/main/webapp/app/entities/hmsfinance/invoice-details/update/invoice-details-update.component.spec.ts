import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InvoiceDetailsFormService } from './invoice-details-form.service';
import { InvoiceDetailsService } from '../service/invoice-details.service';
import { IInvoiceDetails } from '../invoice-details.model';
import { ISubItems } from 'app/entities/hmsfinance/sub-items/sub-items.model';
import { SubItemsService } from 'app/entities/hmsfinance/sub-items/service/sub-items.service';

import { InvoiceDetailsUpdateComponent } from './invoice-details-update.component';

describe('InvoiceDetails Management Update Component', () => {
  let comp: InvoiceDetailsUpdateComponent;
  let fixture: ComponentFixture<InvoiceDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let invoiceDetailsFormService: InvoiceDetailsFormService;
  let invoiceDetailsService: InvoiceDetailsService;
  let subItemsService: SubItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InvoiceDetailsUpdateComponent],
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
      .overrideTemplate(InvoiceDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    invoiceDetailsFormService = TestBed.inject(InvoiceDetailsFormService);
    invoiceDetailsService = TestBed.inject(InvoiceDetailsService);
    subItemsService = TestBed.inject(SubItemsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SubItems query and add missing value', () => {
      const invoiceDetails: IInvoiceDetails = { id: 456 };
      const subItems: ISubItems[] = [{ id: 71681 }];
      invoiceDetails.subItems = subItems;

      const subItemsCollection: ISubItems[] = [{ id: 97555 }];
      jest.spyOn(subItemsService, 'query').mockReturnValue(of(new HttpResponse({ body: subItemsCollection })));
      const additionalSubItems = [...subItems];
      const expectedCollection: ISubItems[] = [...additionalSubItems, ...subItemsCollection];
      jest.spyOn(subItemsService, 'addSubItemsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ invoiceDetails });
      comp.ngOnInit();

      expect(subItemsService.query).toHaveBeenCalled();
      expect(subItemsService.addSubItemsToCollectionIfMissing).toHaveBeenCalledWith(
        subItemsCollection,
        ...additionalSubItems.map(expect.objectContaining)
      );
      expect(comp.subItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const invoiceDetails: IInvoiceDetails = { id: 456 };
      const subItems: ISubItems = { id: 87224 };
      invoiceDetails.subItems = [subItems];

      activatedRoute.data = of({ invoiceDetails });
      comp.ngOnInit();

      expect(comp.subItemsSharedCollection).toContain(subItems);
      expect(comp.invoiceDetails).toEqual(invoiceDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoiceDetails>>();
      const invoiceDetails = { id: 123 };
      jest.spyOn(invoiceDetailsFormService, 'getInvoiceDetails').mockReturnValue(invoiceDetails);
      jest.spyOn(invoiceDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoiceDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: invoiceDetails }));
      saveSubject.complete();

      // THEN
      expect(invoiceDetailsFormService.getInvoiceDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(invoiceDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(invoiceDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoiceDetails>>();
      const invoiceDetails = { id: 123 };
      jest.spyOn(invoiceDetailsFormService, 'getInvoiceDetails').mockReturnValue({ id: null });
      jest.spyOn(invoiceDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoiceDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: invoiceDetails }));
      saveSubject.complete();

      // THEN
      expect(invoiceDetailsFormService.getInvoiceDetails).toHaveBeenCalled();
      expect(invoiceDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoiceDetails>>();
      const invoiceDetails = { id: 123 };
      jest.spyOn(invoiceDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ invoiceDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(invoiceDetailsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSubItems', () => {
      it('Should forward to subItemsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(subItemsService, 'compareSubItems');
        comp.compareSubItems(entity, entity2);
        expect(subItemsService.compareSubItems).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
