import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../delivery-orders.test-samples';

import { DeliveryOrdersFormService } from './delivery-orders-form.service';

describe('DeliveryOrders Form Service', () => {
  let service: DeliveryOrdersFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryOrdersFormService);
  });

  describe('Service methods', () => {
    describe('createDeliveryOrdersFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDeliveryOrdersFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            deliveryId: expect.any(Object),
            invoiceNumber: expect.any(Object),
            contactId: expect.any(Object),
            contactName: expect.any(Object),
            contactAddressId: expect.any(Object),
            contactCartId: expect.any(Object),
            deliveryDate: expect.any(Object),
            requestDate: expect.any(Object),
            menuItemId: expect.any(Object),
            menuItemName: expect.any(Object),
            menuItemCode: expect.any(Object),
            lineNumber: expect.any(Object),
            detail: expect.any(Object),
            message: expect.any(Object),
            createdDate: expect.any(Object),
            deliveryTransactions: expect.any(Object),
          })
        );
      });

      it('passing IDeliveryOrders should create a new form with FormGroup', () => {
        const formGroup = service.createDeliveryOrdersFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            deliveryId: expect.any(Object),
            invoiceNumber: expect.any(Object),
            contactId: expect.any(Object),
            contactName: expect.any(Object),
            contactAddressId: expect.any(Object),
            contactCartId: expect.any(Object),
            deliveryDate: expect.any(Object),
            requestDate: expect.any(Object),
            menuItemId: expect.any(Object),
            menuItemName: expect.any(Object),
            menuItemCode: expect.any(Object),
            lineNumber: expect.any(Object),
            detail: expect.any(Object),
            message: expect.any(Object),
            createdDate: expect.any(Object),
            deliveryTransactions: expect.any(Object),
          })
        );
      });
    });

    describe('getDeliveryOrders', () => {
      it('should return NewDeliveryOrders for default DeliveryOrders initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDeliveryOrdersFormGroup(sampleWithNewData);

        const deliveryOrders = service.getDeliveryOrders(formGroup) as any;

        expect(deliveryOrders).toMatchObject(sampleWithNewData);
      });

      it('should return NewDeliveryOrders for empty DeliveryOrders initial value', () => {
        const formGroup = service.createDeliveryOrdersFormGroup();

        const deliveryOrders = service.getDeliveryOrders(formGroup) as any;

        expect(deliveryOrders).toMatchObject({});
      });

      it('should return IDeliveryOrders', () => {
        const formGroup = service.createDeliveryOrdersFormGroup(sampleWithRequiredData);

        const deliveryOrders = service.getDeliveryOrders(formGroup) as any;

        expect(deliveryOrders).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDeliveryOrders should not enable id FormControl', () => {
        const formGroup = service.createDeliveryOrdersFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDeliveryOrders should disable id FormControl', () => {
        const formGroup = service.createDeliveryOrdersFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
