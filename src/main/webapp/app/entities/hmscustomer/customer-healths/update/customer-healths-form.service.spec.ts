import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../customer-healths.test-samples';

import { CustomerHealthsFormService } from './customer-healths-form.service';

describe('CustomerHealths Form Service', () => {
  let service: CustomerHealthsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerHealthsFormService);
  });

  describe('Service methods', () => {
    describe('createCustomerHealthsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCustomerHealthsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            contactId: expect.any(Object),
            currentWeight: expect.any(Object),
            currentHeight: expect.any(Object),
            measureUnit: expect.any(Object),
            activityLevel: expect.any(Object),
            targetWeight: expect.any(Object),
            targerCalorie: expect.any(Object),
            targetBodyFat: expect.any(Object),
            goal: expect.any(Object),
            active: expect.any(Object),
            detail: expect.any(Object),
            createdDate: expect.any(Object),
            allergens: expect.any(Object),
          })
        );
      });

      it('passing ICustomerHealths should create a new form with FormGroup', () => {
        const formGroup = service.createCustomerHealthsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            contactId: expect.any(Object),
            currentWeight: expect.any(Object),
            currentHeight: expect.any(Object),
            measureUnit: expect.any(Object),
            activityLevel: expect.any(Object),
            targetWeight: expect.any(Object),
            targerCalorie: expect.any(Object),
            targetBodyFat: expect.any(Object),
            goal: expect.any(Object),
            active: expect.any(Object),
            detail: expect.any(Object),
            createdDate: expect.any(Object),
            allergens: expect.any(Object),
          })
        );
      });
    });

    describe('getCustomerHealths', () => {
      it('should return NewCustomerHealths for default CustomerHealths initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCustomerHealthsFormGroup(sampleWithNewData);

        const customerHealths = service.getCustomerHealths(formGroup) as any;

        expect(customerHealths).toMatchObject(sampleWithNewData);
      });

      it('should return NewCustomerHealths for empty CustomerHealths initial value', () => {
        const formGroup = service.createCustomerHealthsFormGroup();

        const customerHealths = service.getCustomerHealths(formGroup) as any;

        expect(customerHealths).toMatchObject({});
      });

      it('should return ICustomerHealths', () => {
        const formGroup = service.createCustomerHealthsFormGroup(sampleWithRequiredData);

        const customerHealths = service.getCustomerHealths(formGroup) as any;

        expect(customerHealths).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICustomerHealths should not enable id FormControl', () => {
        const formGroup = service.createCustomerHealthsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCustomerHealths should disable id FormControl', () => {
        const formGroup = service.createCustomerHealthsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
