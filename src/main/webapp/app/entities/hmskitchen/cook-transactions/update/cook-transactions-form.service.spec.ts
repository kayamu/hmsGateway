import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cook-transactions.test-samples';

import { CookTransactionsFormService } from './cook-transactions-form.service';

describe('CookTransactions Form Service', () => {
  let service: CookTransactionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookTransactionsFormService);
  });

  describe('Service methods', () => {
    describe('createCookTransactionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCookTransactionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            kitchenId: expect.any(Object),
            statusChangedDate: expect.any(Object),
            transactionDate: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            cookOrders: expect.any(Object),
          })
        );
      });

      it('passing ICookTransactions should create a new form with FormGroup', () => {
        const formGroup = service.createCookTransactionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            kitchenId: expect.any(Object),
            statusChangedDate: expect.any(Object),
            transactionDate: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            cookOrders: expect.any(Object),
          })
        );
      });
    });

    describe('getCookTransactions', () => {
      it('should return NewCookTransactions for default CookTransactions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCookTransactionsFormGroup(sampleWithNewData);

        const cookTransactions = service.getCookTransactions(formGroup) as any;

        expect(cookTransactions).toMatchObject(sampleWithNewData);
      });

      it('should return NewCookTransactions for empty CookTransactions initial value', () => {
        const formGroup = service.createCookTransactionsFormGroup();

        const cookTransactions = service.getCookTransactions(formGroup) as any;

        expect(cookTransactions).toMatchObject({});
      });

      it('should return ICookTransactions', () => {
        const formGroup = service.createCookTransactionsFormGroup(sampleWithRequiredData);

        const cookTransactions = service.getCookTransactions(formGroup) as any;

        expect(cookTransactions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICookTransactions should not enable id FormControl', () => {
        const formGroup = service.createCookTransactionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCookTransactions should disable id FormControl', () => {
        const formGroup = service.createCookTransactionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
