import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../invoices.test-samples';

import { InvoicesFormService } from './invoices-form.service';

describe('Invoices Form Service', () => {
  let service: InvoicesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicesFormService);
  });

  describe('Service methods', () => {
    describe('createInvoicesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInvoicesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            invoiceNumber: expect.any(Object),
            contactId: expect.any(Object),
            contactAddressId: expect.any(Object),
            contactBillingAdrId: expect.any(Object),
            cartId: expect.any(Object),
            type: expect.any(Object),
            requestDate: expect.any(Object),
            contactName: expect.any(Object),
            invoiceDate: expect.any(Object),
            lastTranactionId: expect.any(Object),
            totalCost: expect.any(Object),
            totalProfit: expect.any(Object),
            totalAmount: expect.any(Object),
            totalTaxes: expect.any(Object),
            fedaralTaxesAmount: expect.any(Object),
            provintionalTaxesAmount: expect.any(Object),
            discountsAmount: expect.any(Object),
            addOnAmount: expect.any(Object),
            message: expect.any(Object),
            createdDate: expect.any(Object),
            invoiceDetails: expect.any(Object),
          })
        );
      });

      it('passing IInvoices should create a new form with FormGroup', () => {
        const formGroup = service.createInvoicesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            invoiceNumber: expect.any(Object),
            contactId: expect.any(Object),
            contactAddressId: expect.any(Object),
            contactBillingAdrId: expect.any(Object),
            cartId: expect.any(Object),
            type: expect.any(Object),
            requestDate: expect.any(Object),
            contactName: expect.any(Object),
            invoiceDate: expect.any(Object),
            lastTranactionId: expect.any(Object),
            totalCost: expect.any(Object),
            totalProfit: expect.any(Object),
            totalAmount: expect.any(Object),
            totalTaxes: expect.any(Object),
            fedaralTaxesAmount: expect.any(Object),
            provintionalTaxesAmount: expect.any(Object),
            discountsAmount: expect.any(Object),
            addOnAmount: expect.any(Object),
            message: expect.any(Object),
            createdDate: expect.any(Object),
            invoiceDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getInvoices', () => {
      it('should return NewInvoices for default Invoices initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInvoicesFormGroup(sampleWithNewData);

        const invoices = service.getInvoices(formGroup) as any;

        expect(invoices).toMatchObject(sampleWithNewData);
      });

      it('should return NewInvoices for empty Invoices initial value', () => {
        const formGroup = service.createInvoicesFormGroup();

        const invoices = service.getInvoices(formGroup) as any;

        expect(invoices).toMatchObject({});
      });

      it('should return IInvoices', () => {
        const formGroup = service.createInvoicesFormGroup(sampleWithRequiredData);

        const invoices = service.getInvoices(formGroup) as any;

        expect(invoices).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInvoices should not enable id FormControl', () => {
        const formGroup = service.createInvoicesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInvoices should disable id FormControl', () => {
        const formGroup = service.createInvoicesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
