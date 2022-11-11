import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../consultings.test-samples';

import { ConsultingsFormService } from './consultings-form.service';

describe('Consultings Form Service', () => {
  let service: ConsultingsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultingsFormService);
  });

  describe('Service methods', () => {
    describe('createConsultingsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConsultingsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerId: expect.any(Object),
            custmerName: expect.any(Object),
            nutritionistId: expect.any(Object),
            nutritionistName: expect.any(Object),
            nutritionistNotes: expect.any(Object),
            lastStatus: expect.any(Object),
            createdDate: expect.any(Object),
            epicryses: expect.any(Object),
            menuSuggestions: expect.any(Object),
            consultingStatus: expect.any(Object),
          })
        );
      });

      it('passing IConsultings should create a new form with FormGroup', () => {
        const formGroup = service.createConsultingsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            customerId: expect.any(Object),
            custmerName: expect.any(Object),
            nutritionistId: expect.any(Object),
            nutritionistName: expect.any(Object),
            nutritionistNotes: expect.any(Object),
            lastStatus: expect.any(Object),
            createdDate: expect.any(Object),
            epicryses: expect.any(Object),
            menuSuggestions: expect.any(Object),
            consultingStatus: expect.any(Object),
          })
        );
      });
    });

    describe('getConsultings', () => {
      it('should return NewConsultings for default Consultings initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createConsultingsFormGroup(sampleWithNewData);

        const consultings = service.getConsultings(formGroup) as any;

        expect(consultings).toMatchObject(sampleWithNewData);
      });

      it('should return NewConsultings for empty Consultings initial value', () => {
        const formGroup = service.createConsultingsFormGroup();

        const consultings = service.getConsultings(formGroup) as any;

        expect(consultings).toMatchObject({});
      });

      it('should return IConsultings', () => {
        const formGroup = service.createConsultingsFormGroup(sampleWithRequiredData);

        const consultings = service.getConsultings(formGroup) as any;

        expect(consultings).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConsultings should not enable id FormControl', () => {
        const formGroup = service.createConsultingsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConsultings should disable id FormControl', () => {
        const formGroup = service.createConsultingsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
