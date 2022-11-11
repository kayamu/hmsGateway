import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../invoice-transactions.test-samples';

import { InvoiceTransactionsFormService } from './invoice-transactions-form.service';

describe('InvoiceTransactions Form Service', () => {
  let service: InvoiceTransactionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceTransactionsFormService);
  });

  describe('Service methods', () => {
    describe('createInvoiceTransactionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInvoiceTransactionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusChangedDate: expect.any(Object),
            transactionDate: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            invoices: expect.any(Object),
          })
        );
      });

      it('passing IInvoiceTransactions should create a new form with FormGroup', () => {
        const formGroup = service.createInvoiceTransactionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusChangedDate: expect.any(Object),
            transactionDate: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            invoices: expect.any(Object),
          })
        );
      });
    });

    describe('getInvoiceTransactions', () => {
      it('should return NewInvoiceTransactions for default InvoiceTransactions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInvoiceTransactionsFormGroup(sampleWithNewData);

        const invoiceTransactions = service.getInvoiceTransactions(formGroup) as any;

        expect(invoiceTransactions).toMatchObject(sampleWithNewData);
      });

      it('should return NewInvoiceTransactions for empty InvoiceTransactions initial value', () => {
        const formGroup = service.createInvoiceTransactionsFormGroup();

        const invoiceTransactions = service.getInvoiceTransactions(formGroup) as any;

        expect(invoiceTransactions).toMatchObject({});
      });

      it('should return IInvoiceTransactions', () => {
        const formGroup = service.createInvoiceTransactionsFormGroup(sampleWithRequiredData);

        const invoiceTransactions = service.getInvoiceTransactions(formGroup) as any;

        expect(invoiceTransactions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInvoiceTransactions should not enable id FormControl', () => {
        const formGroup = service.createInvoiceTransactionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInvoiceTransactions should disable id FormControl', () => {
        const formGroup = service.createInvoiceTransactionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
