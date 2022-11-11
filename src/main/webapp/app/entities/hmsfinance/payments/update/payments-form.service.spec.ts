import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../payments.test-samples';

import { PaymentsFormService } from './payments-form.service';

describe('Payments Form Service', () => {
  let service: PaymentsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            refNumber: expect.any(Object),
            paymentType: expect.any(Object),
            contactId: expect.any(Object),
            explanation: expect.any(Object),
            operationDate: expect.any(Object),
            amount: expect.any(Object),
            status: expect.any(Object),
            createdDate: expect.any(Object),
            invoices: expect.any(Object),
          })
        );
      });

      it('passing IPayments should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            refNumber: expect.any(Object),
            paymentType: expect.any(Object),
            contactId: expect.any(Object),
            explanation: expect.any(Object),
            operationDate: expect.any(Object),
            amount: expect.any(Object),
            status: expect.any(Object),
            createdDate: expect.any(Object),
            invoices: expect.any(Object),
          })
        );
      });
    });

    describe('getPayments', () => {
      it('should return NewPayments for default Payments initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentsFormGroup(sampleWithNewData);

        const payments = service.getPayments(formGroup) as any;

        expect(payments).toMatchObject(sampleWithNewData);
      });

      it('should return NewPayments for empty Payments initial value', () => {
        const formGroup = service.createPaymentsFormGroup();

        const payments = service.getPayments(formGroup) as any;

        expect(payments).toMatchObject({});
      });

      it('should return IPayments', () => {
        const formGroup = service.createPaymentsFormGroup(sampleWithRequiredData);

        const payments = service.getPayments(formGroup) as any;

        expect(payments).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPayments should not enable id FormControl', () => {
        const formGroup = service.createPaymentsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPayments should disable id FormControl', () => {
        const formGroup = service.createPaymentsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
