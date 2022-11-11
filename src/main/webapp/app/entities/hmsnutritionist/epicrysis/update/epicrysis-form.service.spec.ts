import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../epicrysis.test-samples';

import { EpicrysisFormService } from './epicrysis-form.service';

describe('Epicrysis Form Service', () => {
  let service: EpicrysisFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicrysisFormService);
  });

  describe('Service methods', () => {
    describe('createEpicrysisFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEpicrysisFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nutritionistId: expect.any(Object),
            customerId: expect.any(Object),
            customerName: expect.any(Object),
            nutritionistNotes: expect.any(Object),
            createdDate: expect.any(Object),
            consultings: expect.any(Object),
          })
        );
      });

      it('passing IEpicrysis should create a new form with FormGroup', () => {
        const formGroup = service.createEpicrysisFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nutritionistId: expect.any(Object),
            customerId: expect.any(Object),
            customerName: expect.any(Object),
            nutritionistNotes: expect.any(Object),
            createdDate: expect.any(Object),
            consultings: expect.any(Object),
          })
        );
      });
    });

    describe('getEpicrysis', () => {
      it('should return NewEpicrysis for default Epicrysis initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEpicrysisFormGroup(sampleWithNewData);

        const epicrysis = service.getEpicrysis(formGroup) as any;

        expect(epicrysis).toMatchObject(sampleWithNewData);
      });

      it('should return NewEpicrysis for empty Epicrysis initial value', () => {
        const formGroup = service.createEpicrysisFormGroup();

        const epicrysis = service.getEpicrysis(formGroup) as any;

        expect(epicrysis).toMatchObject({});
      });

      it('should return IEpicrysis', () => {
        const formGroup = service.createEpicrysisFormGroup(sampleWithRequiredData);

        const epicrysis = service.getEpicrysis(formGroup) as any;

        expect(epicrysis).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEpicrysis should not enable id FormControl', () => {
        const formGroup = service.createEpicrysisFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEpicrysis should disable id FormControl', () => {
        const formGroup = service.createEpicrysisFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
