import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../invoice-details.test-samples';

import { InvoiceDetailsFormService } from './invoice-details-form.service';

describe('InvoiceDetails Form Service', () => {
  let service: InvoiceDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDetailsFormService);
  });

  describe('Service methods', () => {
    describe('createInvoiceDetailsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInvoiceDetailsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactId: expect.any(Object),
            cartId: expect.any(Object),
            itemId: expect.any(Object),
            itemName: expect.any(Object),
            itemCode: expect.any(Object),
            itemType: expect.any(Object),
            paymentType: expect.any(Object),
            subscriptionStartingDate: expect.any(Object),
            subscriptionDurationWeeks: expect.any(Object),
            detailAmount: expect.any(Object),
            lineNumber: expect.any(Object),
            nutritionistId: expect.any(Object),
            totalCost: expect.any(Object),
            totalProfit: expect.any(Object),
            nutritionistEarning: expect.any(Object),
            nutritionistPercentage: expect.any(Object),
            fedaralTaxesAmount: expect.any(Object),
            fedaralTaxesPercentage: expect.any(Object),
            provintionalTaxesAmount: expect.any(Object),
            provintionalTaxesPercentage: expect.any(Object),
            totalTaxesAmount: expect.any(Object),
            totalTaxesPercentage: expect.any(Object),
            discountAmount: expect.any(Object),
            discountPercentage: expect.any(Object),
            addOnCode: expect.any(Object),
            addOnAmount: expect.any(Object),
            addOnPercentage: expect.any(Object),
            totalAmount: expect.any(Object),
            createdDate: expect.any(Object),
            subItems: expect.any(Object),
            invoices: expect.any(Object),
          })
        );
      });

      it('passing IInvoiceDetails should create a new form with FormGroup', () => {
        const formGroup = service.createInvoiceDetailsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactId: expect.any(Object),
            cartId: expect.any(Object),
            itemId: expect.any(Object),
            itemName: expect.any(Object),
            itemCode: expect.any(Object),
            itemType: expect.any(Object),
            paymentType: expect.any(Object),
            subscriptionStartingDate: expect.any(Object),
            subscriptionDurationWeeks: expect.any(Object),
            detailAmount: expect.any(Object),
            lineNumber: expect.any(Object),
            nutritionistId: expect.any(Object),
            totalCost: expect.any(Object),
            totalProfit: expect.any(Object),
            nutritionistEarning: expect.any(Object),
            nutritionistPercentage: expect.any(Object),
            fedaralTaxesAmount: expect.any(Object),
            fedaralTaxesPercentage: expect.any(Object),
            provintionalTaxesAmount: expect.any(Object),
            provintionalTaxesPercentage: expect.any(Object),
            totalTaxesAmount: expect.any(Object),
            totalTaxesPercentage: expect.any(Object),
            discountAmount: expect.any(Object),
            discountPercentage: expect.any(Object),
            addOnCode: expect.any(Object),
            addOnAmount: expect.any(Object),
            addOnPercentage: expect.any(Object),
            totalAmount: expect.any(Object),
            createdDate: expect.any(Object),
            subItems: expect.any(Object),
            invoices: expect.any(Object),
          })
        );
      });
    });

    describe('getInvoiceDetails', () => {
      it('should return NewInvoiceDetails for default InvoiceDetails initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInvoiceDetailsFormGroup(sampleWithNewData);

        const invoiceDetails = service.getInvoiceDetails(formGroup) as any;

        expect(invoiceDetails).toMatchObject(sampleWithNewData);
      });

      it('should return NewInvoiceDetails for empty InvoiceDetails initial value', () => {
        const formGroup = service.createInvoiceDetailsFormGroup();

        const invoiceDetails = service.getInvoiceDetails(formGroup) as any;

        expect(invoiceDetails).toMatchObject({});
      });

      it('should return IInvoiceDetails', () => {
        const formGroup = service.createInvoiceDetailsFormGroup(sampleWithRequiredData);

        const invoiceDetails = service.getInvoiceDetails(formGroup) as any;

        expect(invoiceDetails).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInvoiceDetails should not enable id FormControl', () => {
        const formGroup = service.createInvoiceDetailsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInvoiceDetails should disable id FormControl', () => {
        const formGroup = service.createInvoiceDetailsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
