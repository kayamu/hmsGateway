import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../images-url.test-samples';

import { ImagesUrlFormService } from './images-url-form.service';

describe('ImagesUrl Form Service', () => {
  let service: ImagesUrlFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesUrlFormService);
  });

  describe('Service methods', () => {
    describe('createImagesUrlFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createImagesUrlFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            urlAddress: expect.any(Object),
            explanation: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            menuGroups: expect.any(Object),
            menus: expect.any(Object),
            meals: expect.any(Object),
            ingredients: expect.any(Object),
            recipes: expect.any(Object),
          })
        );
      });

      it('passing IImagesUrl should create a new form with FormGroup', () => {
        const formGroup = service.createImagesUrlFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            urlAddress: expect.any(Object),
            explanation: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            menuGroups: expect.any(Object),
            menus: expect.any(Object),
            meals: expect.any(Object),
            ingredients: expect.any(Object),
            recipes: expect.any(Object),
          })
        );
      });
    });

    describe('getImagesUrl', () => {
      it('should return NewImagesUrl for default ImagesUrl initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createImagesUrlFormGroup(sampleWithNewData);

        const imagesUrl = service.getImagesUrl(formGroup) as any;

        expect(imagesUrl).toMatchObject(sampleWithNewData);
      });

      it('should return NewImagesUrl for empty ImagesUrl initial value', () => {
        const formGroup = service.createImagesUrlFormGroup();

        const imagesUrl = service.getImagesUrl(formGroup) as any;

        expect(imagesUrl).toMatchObject({});
      });

      it('should return IImagesUrl', () => {
        const formGroup = service.createImagesUrlFormGroup(sampleWithRequiredData);

        const imagesUrl = service.getImagesUrl(formGroup) as any;

        expect(imagesUrl).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IImagesUrl should not enable id FormControl', () => {
        const formGroup = service.createImagesUrlFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewImagesUrl should disable id FormControl', () => {
        const formGroup = service.createImagesUrlFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
