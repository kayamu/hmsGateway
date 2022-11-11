import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../conditions.test-samples';

import { ConditionsFormService } from './conditions-form.service';

describe('Conditions Form Service', () => {
  let service: ConditionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionsFormService);
  });

  describe('Service methods', () => {
    describe('createConditionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConditionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            conditionDetails: expect.any(Object),
          })
        );
      });

      it('passing IConditions should create a new form with FormGroup', () => {
        const formGroup = service.createConditionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            createdDate: expect.any(Object),
            conditionDetails: expect.any(Object),
          })
        );
      });
    });

    describe('getConditions', () => {
      it('should return NewConditions for default Conditions initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createConditionsFormGroup(sampleWithNewData);

        const conditions = service.getConditions(formGroup) as any;

        expect(conditions).toMatchObject(sampleWithNewData);
      });

      it('should return NewConditions for empty Conditions initial value', () => {
        const formGroup = service.createConditionsFormGroup();

        const conditions = service.getConditions(formGroup) as any;

        expect(conditions).toMatchObject({});
      });

      it('should return IConditions', () => {
        const formGroup = service.createConditionsFormGroup(sampleWithRequiredData);

        const conditions = service.getConditions(formGroup) as any;

        expect(conditions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConditions should not enable id FormControl', () => {
        const formGroup = service.createConditionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConditions should disable id FormControl', () => {
        const formGroup = service.createConditionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
