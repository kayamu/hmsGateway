import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ingredients.test-samples';

import { IngredientsFormService } from './ingredients-form.service';

describe('Ingredients Form Service', () => {
  let service: IngredientsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsFormService);
  });

  describe('Service methods', () => {
    describe('createIngredientsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIngredientsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
            nutriens: expect.any(Object),
            menuGroups: expect.any(Object),
          })
        );
      });

      it('passing IIngredients should create a new form with FormGroup', () => {
        const formGroup = service.createIngredientsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
            nutriens: expect.any(Object),
            menuGroups: expect.any(Object),
          })
        );
      });
    });

    describe('getIngredients', () => {
      it('should return NewIngredients for default Ingredients initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIngredientsFormGroup(sampleWithNewData);

        const ingredients = service.getIngredients(formGroup) as any;

        expect(ingredients).toMatchObject(sampleWithNewData);
      });

      it('should return NewIngredients for empty Ingredients initial value', () => {
        const formGroup = service.createIngredientsFormGroup();

        const ingredients = service.getIngredients(formGroup) as any;

        expect(ingredients).toMatchObject({});
      });

      it('should return IIngredients', () => {
        const formGroup = service.createIngredientsFormGroup(sampleWithRequiredData);

        const ingredients = service.getIngredients(formGroup) as any;

        expect(ingredients).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIngredients should not enable id FormControl', () => {
        const formGroup = service.createIngredientsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIngredients should disable id FormControl', () => {
        const formGroup = service.createIngredientsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
