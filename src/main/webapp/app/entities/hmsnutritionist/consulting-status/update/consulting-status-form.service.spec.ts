import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../consulting-status.test-samples';

import { ConsultingStatusFormService } from './consulting-status-form.service';

describe('ConsultingStatus Form Service', () => {
  let service: ConsultingStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultingStatusFormService);
  });

  describe('Service methods', () => {
    describe('createConsultingStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConsultingStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nutritionistId: expect.any(Object),
            lastStatus: expect.any(Object),
          })
        );
      });

      it('passing IConsultingStatus should create a new form with FormGroup', () => {
        const formGroup = service.createConsultingStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nutritionistId: expect.any(Object),
            lastStatus: expect.any(Object),
          })
        );
      });
    });

    describe('getConsultingStatus', () => {
      it('should return NewConsultingStatus for default ConsultingStatus initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createConsultingStatusFormGroup(sampleWithNewData);

        const consultingStatus = service.getConsultingStatus(formGroup) as any;

        expect(consultingStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewConsultingStatus for empty ConsultingStatus initial value', () => {
        const formGroup = service.createConsultingStatusFormGroup();

        const consultingStatus = service.getConsultingStatus(formGroup) as any;

        expect(consultingStatus).toMatchObject({});
      });

      it('should return IConsultingStatus', () => {
        const formGroup = service.createConsultingStatusFormGroup(sampleWithRequiredData);

        const consultingStatus = service.getConsultingStatus(formGroup) as any;

        expect(consultingStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConsultingStatus should not enable id FormControl', () => {
        const formGroup = service.createConsultingStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConsultingStatus should disable id FormControl', () => {
        const formGroup = service.createConsultingStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
