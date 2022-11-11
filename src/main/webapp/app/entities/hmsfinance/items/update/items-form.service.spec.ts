import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../items.test-samples';

import { ItemsFormService } from './items-form.service';

describe('Items Form Service', () => {
  let service: ItemsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsFormService);
  });

  describe('Service methods', () => {
    describe('createItemsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItemsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            itemId: expect.any(Object),
            itemCode: expect.any(Object),
            type: expect.any(Object),
            explain: expect.any(Object),
            cost: expect.any(Object),
            price: expect.any(Object),
            isActive: expect.any(Object),
            createdDate: expect.any(Object),
            templates: expect.any(Object),
          })
        );
      });

      it('passing IItems should create a new form with FormGroup', () => {
        const formGroup = service.createItemsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            itemId: expect.any(Object),
            itemCode: expect.any(Object),
            type: expect.any(Object),
            explain: expect.any(Object),
            cost: expect.any(Object),
            price: expect.any(Object),
            isActive: expect.any(Object),
            createdDate: expect.any(Object),
            templates: expect.any(Object),
          })
        );
      });
    });

    describe('getItems', () => {
      it('should return NewItems for default Items initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createItemsFormGroup(sampleWithNewData);

        const items = service.getItems(formGroup) as any;

        expect(items).toMatchObject(sampleWithNewData);
      });

      it('should return NewItems for empty Items initial value', () => {
        const formGroup = service.createItemsFormGroup();

        const items = service.getItems(formGroup) as any;

        expect(items).toMatchObject({});
      });

      it('should return IItems', () => {
        const formGroup = service.createItemsFormGroup(sampleWithRequiredData);

        const items = service.getItems(formGroup) as any;

        expect(items).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItems should not enable id FormControl', () => {
        const formGroup = service.createItemsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItems should disable id FormControl', () => {
        const formGroup = service.createItemsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
