import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../template-items.test-samples';

import { TemplateItemsFormService } from './template-items-form.service';

describe('TemplateItems Form Service', () => {
  let service: TemplateItemsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateItemsFormService);
  });

  describe('Service methods', () => {
    describe('createTemplateItemsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTemplateItemsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            code: expect.any(Object),
            type: expect.any(Object),
            valueType: expect.any(Object),
            amount: expect.any(Object),
            explanation: expect.any(Object),
            startDate: expect.any(Object),
            dueDate: expect.any(Object),
            isOnce: expect.any(Object),
            createdDate: expect.any(Object),
            conditions: expect.any(Object),
            templates: expect.any(Object),
          })
        );
      });

      it('passing ITemplateItems should create a new form with FormGroup', () => {
        const formGroup = service.createTemplateItemsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            code: expect.any(Object),
            type: expect.any(Object),
            valueType: expect.any(Object),
            amount: expect.any(Object),
            explanation: expect.any(Object),
            startDate: expect.any(Object),
            dueDate: expect.any(Object),
            isOnce: expect.any(Object),
            createdDate: expect.any(Object),
            conditions: expect.any(Object),
            templates: expect.any(Object),
          })
        );
      });
    });

    describe('getTemplateItems', () => {
      it('should return NewTemplateItems for default TemplateItems initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTemplateItemsFormGroup(sampleWithNewData);

        const templateItems = service.getTemplateItems(formGroup) as any;

        expect(templateItems).toMatchObject(sampleWithNewData);
      });

      it('should return NewTemplateItems for empty TemplateItems initial value', () => {
        const formGroup = service.createTemplateItemsFormGroup();

        const templateItems = service.getTemplateItems(formGroup) as any;

        expect(templateItems).toMatchObject({});
      });

      it('should return ITemplateItems', () => {
        const formGroup = service.createTemplateItemsFormGroup(sampleWithRequiredData);

        const templateItems = service.getTemplateItems(formGroup) as any;

        expect(templateItems).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITemplateItems should not enable id FormControl', () => {
        const formGroup = service.createTemplateItemsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTemplateItems should disable id FormControl', () => {
        const formGroup = service.createTemplateItemsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
