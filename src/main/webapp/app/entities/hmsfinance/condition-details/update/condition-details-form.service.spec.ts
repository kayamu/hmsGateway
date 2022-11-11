import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../condition-details.test-samples';

import { ConditionDetailsFormService } from './condition-details-form.service';

describe('ConditionDetails Form Service', () => {
  let service: ConditionDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionDetailsFormService);
  });

  describe('Service methods', () => {
    describe('createConditionDetailsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConditionDetailsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            explanation: expect.any(Object),
            compareField: expect.any(Object),
            operator: expect.any(Object),
            groupIndex: expect.any(Object),
            compareValue: expect.any(Object),
            createdDate: expect.any(Object),
            lineLogicType: expect.any(Object),
            groupLogicType: expect.any(Object),
            nextCondition: expect.any(Object),
            conditions: expect.any(Object),
          })
        );
      });

      it('passing IConditionDetails should create a new form with FormGroup', () => {
        const formGroup = service.createConditionDetailsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            explanation: expect.any(Object),
            compareField: expect.any(Object),
            operator: expect.any(Object),
            groupIndex: expect.any(Object),
            compareValue: expect.any(Object),
            createdDate: expect.any(Object),
            lineLogicType: expect.any(Object),
            groupLogicType: expect.any(Object),
            nextCondition: expect.any(Object),
            conditions: expect.any(Object),
          })
        );
      });
    });

    describe('getConditionDetails', () => {
      it('should return NewConditionDetails for default ConditionDetails initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createConditionDetailsFormGroup(sampleWithNewData);

        const conditionDetails = service.getConditionDetails(formGroup) as any;

        expect(conditionDetails).toMatchObject(sampleWithNewData);
      });

      it('should return NewConditionDetails for empty ConditionDetails initial value', () => {
        const formGroup = service.createConditionDetailsFormGroup();

        const conditionDetails = service.getConditionDetails(formGroup) as any;

        expect(conditionDetails).toMatchObject({});
      });

      it('should return IConditionDetails', () => {
        const formGroup = service.createConditionDetailsFormGroup(sampleWithRequiredData);

        const conditionDetails = service.getConditionDetails(formGroup) as any;

        expect(conditionDetails).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConditionDetails should not enable id FormControl', () => {
        const formGroup = service.createConditionDetailsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConditionDetails should disable id FormControl', () => {
        const formGroup = service.createConditionDetailsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
