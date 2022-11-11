import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cook-orders.test-samples';

import { CookOrdersFormService } from './cook-orders-form.service';

describe('CookOrders Form Service', () => {
  let service: CookOrdersFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookOrdersFormService);
  });

  describe('Service methods', () => {
    describe('createCookOrdersFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCookOrdersFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            kitchenId: expect.any(Object),
            customerId: expect.any(Object),
            customerCartId: expect.any(Object),
            menuItemId: expect.any(Object),
            menuItemName: expect.any(Object),
            menuItemCode: expect.any(Object),
            mealId: expect.any(Object),
            lineNumber: expect.any(Object),
            requestDate: expect.any(Object),
            message: expect.any(Object),
            createdDate: expect.any(Object),
            cookTransactions: expect.any(Object),
          })
        );
      });

      it('passing ICookOrders should create a new form with FormGroup', () => {
        const formGroup = service.createCookOrdersFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            kitchenId: expect.any(Object),
            customerId: expect.any(Object),
            customerCartId: expect.any(Object),
            menuItemId: expect.any(Object),
            menuItemName: expect.any(Object),
            menuItemCode: expect.any(Object),
            mealId: expect.any(Object),
            lineNumber: expect.any(Object),
            requestDate: expect.any(Object),
            message: expect.any(Object),
            createdDate: expect.any(Object),
            cookTransactions: expect.any(Object),
          })
        );
      });
    });

    describe('getCookOrders', () => {
      it('should return NewCookOrders for default CookOrders initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCookOrdersFormGroup(sampleWithNewData);

        const cookOrders = service.getCookOrders(formGroup) as any;

        expect(cookOrders).toMatchObject(sampleWithNewData);
      });

      it('should return NewCookOrders for empty CookOrders initial value', () => {
        const formGroup = service.createCookOrdersFormGroup();

        const cookOrders = service.getCookOrders(formGroup) as any;

        expect(cookOrders).toMatchObject({});
      });

      it('should return ICookOrders', () => {
        const formGroup = service.createCookOrdersFormGroup(sampleWithRequiredData);

        const cookOrders = service.getCookOrders(formGroup) as any;

        expect(cookOrders).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICookOrders should not enable id FormControl', () => {
        const formGroup = service.createCookOrdersFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCookOrders should disable id FormControl', () => {
        const formGroup = service.createCookOrdersFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
