import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../delivery-transactions.test-samples';

import { DeliveryTransactionsFormService } from './delivery-transactions-form.service';

describe('DeliveryTransactions Form Service', () => {
  let service: DeliveryTransactionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryTransactionsFormService);
  });

  describe('Service methods', () => {
    describe('createDeliveryTransactionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDeliveryTransactionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusChangedDate: expect.any(Object),
            transactionDate: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            deliveryOrders: expect.any(Object),
          })
        );
      });

      it('passing IDeliveryTransactions should create a new form with FormGroup', () => {
        const formGroup = service.createDeliveryTransactionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            statusChangedDate: expect.any(Object),
            transactionDate: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            deliveryOrders: expect.any(Object),
          })
        );
      });
    });

    describe('getDeliveryTransactions', () => {
      it('should return NewDeliveryTransactions for default DeliveryTransactions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDeliveryTransactionsFormGroup(sampleWithNewData);

        const deliveryTransactions = service.getDeliveryTransactions(formGroup) as any;

        expect(deliveryTransactions).toMatchObject(sampleWithNewData);
      });

      it('should return NewDeliveryTransactions for empty DeliveryTransactions initial value', () => {
        const formGroup = service.createDeliveryTransactionsFormGroup();

        const deliveryTransactions = service.getDeliveryTransactions(formGroup) as any;

        expect(deliveryTransactions).toMatchObject({});
      });

      it('should return IDeliveryTransactions', () => {
        const formGroup = service.createDeliveryTransactionsFormGroup(sampleWithRequiredData);

        const deliveryTransactions = service.getDeliveryTransactions(formGroup) as any;

        expect(deliveryTransactions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDeliveryTransactions should not enable id FormControl', () => {
        const formGroup = service.createDeliveryTransactionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDeliveryTransactions should disable id FormControl', () => {
        const formGroup = service.createDeliveryTransactionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
