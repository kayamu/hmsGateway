import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../meals.test-samples';

import { MealsFormService } from './meals-form.service';

describe('Meals Form Service', () => {
  let service: MealsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealsFormService);
  });

  describe('Service methods', () => {
    describe('createMealsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMealsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
            mealIngredients: expect.any(Object),
            nutriens: expect.any(Object),
            recipies: expect.any(Object),
            menus: expect.any(Object),
          })
        );
      });

      it('passing IMeals should create a new form with FormGroup', () => {
        const formGroup = service.createMealsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
            mealIngredients: expect.any(Object),
            nutriens: expect.any(Object),
            recipies: expect.any(Object),
            menus: expect.any(Object),
          })
        );
      });
    });

    describe('getMeals', () => {
      it('should return NewMeals for default Meals initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMealsFormGroup(sampleWithNewData);

        const meals = service.getMeals(formGroup) as any;

        expect(meals).toMatchObject(sampleWithNewData);
      });

      it('should return NewMeals for empty Meals initial value', () => {
        const formGroup = service.createMealsFormGroup();

        const meals = service.getMeals(formGroup) as any;

        expect(meals).toMatchObject({});
      });

      it('should return IMeals', () => {
        const formGroup = service.createMealsFormGroup(sampleWithRequiredData);

        const meals = service.getMeals(formGroup) as any;

        expect(meals).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMeals should not enable id FormControl', () => {
        const formGroup = service.createMealsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMeals should disable id FormControl', () => {
        const formGroup = service.createMealsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
