import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nutriens.test-samples';

import { NutriensFormService } from './nutriens-form.service';

describe('Nutriens Form Service', () => {
  let service: NutriensFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutriensFormService);
  });

  describe('Service methods', () => {
    describe('createNutriensFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNutriensFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            protein: expect.any(Object),
            carb: expect.any(Object),
            fat: expect.any(Object),
            kcal: expect.any(Object),
            createdDate: expect.any(Object),
          })
        );
      });

      it('passing INutriens should create a new form with FormGroup', () => {
        const formGroup = service.createNutriensFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            protein: expect.any(Object),
            carb: expect.any(Object),
            fat: expect.any(Object),
            kcal: expect.any(Object),
            createdDate: expect.any(Object),
          })
        );
      });
    });

    describe('getNutriens', () => {
      it('should return NewNutriens for default Nutriens initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNutriensFormGroup(sampleWithNewData);

        const nutriens = service.getNutriens(formGroup) as any;

        expect(nutriens).toMatchObject(sampleWithNewData);
      });

      it('should return NewNutriens for empty Nutriens initial value', () => {
        const formGroup = service.createNutriensFormGroup();

        const nutriens = service.getNutriens(formGroup) as any;

        expect(nutriens).toMatchObject({});
      });

      it('should return INutriens', () => {
        const formGroup = service.createNutriensFormGroup(sampleWithRequiredData);

        const nutriens = service.getNutriens(formGroup) as any;

        expect(nutriens).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INutriens should not enable id FormControl', () => {
        const formGroup = service.createNutriensFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNutriens should disable id FormControl', () => {
        const formGroup = service.createNutriensFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
