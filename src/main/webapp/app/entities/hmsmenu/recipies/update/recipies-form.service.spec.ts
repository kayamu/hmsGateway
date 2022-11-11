import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../recipies.test-samples';

import { RecipiesFormService } from './recipies-form.service';

describe('Recipies Form Service', () => {
  let service: RecipiesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipiesFormService);
  });

  describe('Service methods', () => {
    describe('createRecipiesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRecipiesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            recipe: expect.any(Object),
            explanation: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
          })
        );
      });

      it('passing IRecipies should create a new form with FormGroup', () => {
        const formGroup = service.createRecipiesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            recipe: expect.any(Object),
            explanation: expect.any(Object),
            createdDate: expect.any(Object),
            imagesUrls: expect.any(Object),
          })
        );
      });
    });

    describe('getRecipies', () => {
      it('should return NewRecipies for default Recipies initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRecipiesFormGroup(sampleWithNewData);

        const recipies = service.getRecipies(formGroup) as any;

        expect(recipies).toMatchObject(sampleWithNewData);
      });

      it('should return NewRecipies for empty Recipies initial value', () => {
        const formGroup = service.createRecipiesFormGroup();

        const recipies = service.getRecipies(formGroup) as any;

        expect(recipies).toMatchObject({});
      });

      it('should return IRecipies', () => {
        const formGroup = service.createRecipiesFormGroup(sampleWithRequiredData);

        const recipies = service.getRecipies(formGroup) as any;

        expect(recipies).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRecipies should not enable id FormControl', () => {
        const formGroup = service.createRecipiesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRecipies should disable id FormControl', () => {
        const formGroup = service.createRecipiesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
