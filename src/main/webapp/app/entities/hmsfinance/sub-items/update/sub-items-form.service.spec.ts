import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sub-items.test-samples';

import { SubItemsFormService } from './sub-items-form.service';

describe('SubItems Form Service', () => {
  let service: SubItemsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubItemsFormService);
  });

  describe('Service methods', () => {
    describe('createSubItemsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSubItemsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            actualValue: expect.any(Object),
            percentage: expect.any(Object),
            baseValue: expect.any(Object),
            type: expect.any(Object),
            valueType: expect.any(Object),
            calculatedValue: expect.any(Object),
            templateItemId: expect.any(Object),
            createdDate: expect.any(Object),
            invoiceDetails: expect.any(Object),
          })
        );
      });

      it('passing ISubItems should create a new form with FormGroup', () => {
        const formGroup = service.createSubItemsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            actualValue: expect.any(Object),
            percentage: expect.any(Object),
            baseValue: expect.any(Object),
            type: expect.any(Object),
            valueType: expect.any(Object),
            calculatedValue: expect.any(Object),
            templateItemId: expect.any(Object),
            createdDate: expect.any(Object),
            invoiceDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getSubItems', () => {
      it('should return NewSubItems for default SubItems initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSubItemsFormGroup(sampleWithNewData);

        const subItems = service.getSubItems(formGroup) as any;

        expect(subItems).toMatchObject(sampleWithNewData);
      });

      it('should return NewSubItems for empty SubItems initial value', () => {
        const formGroup = service.createSubItemsFormGroup();

        const subItems = service.getSubItems(formGroup) as any;

        expect(subItems).toMatchObject({});
      });

      it('should return ISubItems', () => {
        const formGroup = service.createSubItemsFormGroup(sampleWithRequiredData);

        const subItems = service.getSubItems(formGroup) as any;

        expect(subItems).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISubItems should not enable id FormControl', () => {
        const formGroup = service.createSubItemsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSubItems should disable id FormControl', () => {
        const formGroup = service.createSubItemsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
