import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../templates.test-samples';

import { TemplatesFormService } from './templates-form.service';

describe('Templates Form Service', () => {
  let service: TemplatesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesFormService);
  });

  describe('Service methods', () => {
    describe('createTemplatesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTemplatesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            explanation: expect.any(Object),
            isActive: expect.any(Object),
            createdDate: expect.any(Object),
            templateItems: expect.any(Object),
          })
        );
      });

      it('passing ITemplates should create a new form with FormGroup', () => {
        const formGroup = service.createTemplatesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            explanation: expect.any(Object),
            isActive: expect.any(Object),
            createdDate: expect.any(Object),
            templateItems: expect.any(Object),
          })
        );
      });
    });

    describe('getTemplates', () => {
      it('should return NewTemplates for default Templates initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTemplatesFormGroup(sampleWithNewData);

        const templates = service.getTemplates(formGroup) as any;

        expect(templates).toMatchObject(sampleWithNewData);
      });

      it('should return NewTemplates for empty Templates initial value', () => {
        const formGroup = service.createTemplatesFormGroup();

        const templates = service.getTemplates(formGroup) as any;

        expect(templates).toMatchObject({});
      });

      it('should return ITemplates', () => {
        const formGroup = service.createTemplatesFormGroup(sampleWithRequiredData);

        const templates = service.getTemplates(formGroup) as any;

        expect(templates).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITemplates should not enable id FormControl', () => {
        const formGroup = service.createTemplatesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTemplates should disable id FormControl', () => {
        const formGroup = service.createTemplatesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
