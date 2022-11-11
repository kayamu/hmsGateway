import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../meal-ingredients.test-samples';

import { MealIngredientsFormService } from './meal-ingredients-form.service';

describe('MealIngredients Form Service', () => {
  let service: MealIngredientsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealIngredientsFormService);
  });

  describe('Service methods', () => {
    describe('createMealIngredientsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMealIngredientsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            amount: expect.any(Object),
            unit: expect.any(Object),
            createdDate: expect.any(Object),
            nutriens: expect.any(Object),
            ingradients: expect.any(Object),
            meals: expect.any(Object),
          })
        );
      });

      it('passing IMealIngredients should create a new form with FormGroup', () => {
        const formGroup = service.createMealIngredientsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            amount: expect.any(Object),
            unit: expect.any(Object),
            createdDate: expect.any(Object),
            nutriens: expect.any(Object),
            ingradients: expect.any(Object),
            meals: expect.any(Object),
          })
        );
      });
    });

    describe('getMealIngredients', () => {
      it('should return NewMealIngredients for default MealIngredients initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMealIngredientsFormGroup(sampleWithNewData);

        const mealIngredients = service.getMealIngredients(formGroup) as any;

        expect(mealIngredients).toMatchObject(sampleWithNewData);
      });

      it('should return NewMealIngredients for empty MealIngredients initial value', () => {
        const formGroup = service.createMealIngredientsFormGroup();

        const mealIngredients = service.getMealIngredients(formGroup) as any;

        expect(mealIngredients).toMatchObject({});
      });

      it('should return IMealIngredients', () => {
        const formGroup = service.createMealIngredientsFormGroup(sampleWithRequiredData);

        const mealIngredients = service.getMealIngredients(formGroup) as any;

        expect(mealIngredients).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMealIngredients should not enable id FormControl', () => {
        const formGroup = service.createMealIngredientsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMealIngredients should disable id FormControl', () => {
        const formGroup = service.createMealIngredientsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
