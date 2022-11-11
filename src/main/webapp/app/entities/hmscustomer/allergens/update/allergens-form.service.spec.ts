import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../allergens.test-samples';

import { AllergensFormService } from './allergens-form.service';

describe('Allergens Form Service', () => {
  let service: AllergensFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergensFormService);
  });

  describe('Service methods', () => {
    describe('createAllergensFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAllergensFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            contactId: expect.any(Object),
            ingradientId: expect.any(Object),
            active: expect.any(Object),
            detail: expect.any(Object),
            createdDate: expect.any(Object),
            customerHealths: expect.any(Object),
          })
        );
      });

      it('passing IAllergens should create a new form with FormGroup', () => {
        const formGroup = service.createAllergensFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            contactId: expect.any(Object),
            ingradientId: expect.any(Object),
            active: expect.any(Object),
            detail: expect.any(Object),
            createdDate: expect.any(Object),
            customerHealths: expect.any(Object),
          })
        );
      });
    });

    describe('getAllergens', () => {
      it('should return NewAllergens for default Allergens initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAllergensFormGroup(sampleWithNewData);

        const allergens = service.getAllergens(formGroup) as any;

        expect(allergens).toMatchObject(sampleWithNewData);
      });

      it('should return NewAllergens for empty Allergens initial value', () => {
        const formGroup = service.createAllergensFormGroup();

        const allergens = service.getAllergens(formGroup) as any;

        expect(allergens).toMatchObject({});
      });

      it('should return IAllergens', () => {
        const formGroup = service.createAllergensFormGroup(sampleWithRequiredData);

        const allergens = service.getAllergens(formGroup) as any;

        expect(allergens).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAllergens should not enable id FormControl', () => {
        const formGroup = service.createAllergensFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAllergens should disable id FormControl', () => {
        const formGroup = service.createAllergensFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
